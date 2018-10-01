var express = require('express');
var router = express.Router();
let path       = require('path');
let bodyParser = require('body-parser');
let Chatkit    = require('pusher-chatkit-server');


const chatkit = new Chatkit.default(require({
  instanceLocator: "PUSHER_CHATKIT_INSTANCE_LOCATOR",
  key: "PUSHER_CHATKIT_KEY"
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname + '/views'})
});


app.post('/session/auth', (req, res) => {
  res.json(chatkit.authenticate(req.body, req.query.user_id))
});

app.post('/session/load', (req, res, next) => {
  // Attempt to create a new user with the email serving as the ID of the user.
  // If there is no user matching the ID, we create one but if there is one we skip
  // creating and go straight into fetching the chat room for that user
  chatkit.createUser(req.body.email, req.body.name)
    .then(() => getUserRoom(req, res, next))
    .catch(err => {
      (err.error_type === 'services/chatkit/user/user_already_exists')
        ? getUserRoom(req, res, next)
        : next(err)
    });

  function getUserRoom(req, res, next) {
    const name  = req.body.name;
    const email = req.body.email;

    // Get the list of rooms the user belongs to. Check within that room
    // list for one whos name matches the users ID. If we find one, we
    // return that as the response, else we create the room and return
    // it as the response.
    chatkit.apiRequest({method: 'GET', 'path': `/users/${email}/rooms`})
      .then(rooms => {
        let clientRoom = false;

        // Loop through user rooms to see if there is already a room for
        // the client
        rooms.forEach(room => {
          return room.name === email ? (clientRoom = room) : false
        });

        if (clientRoom && clientRoom.id) {
          return res.json(clientRoom)
        }

        const createRoomRequest = {
          method: 'POST',
          path: '/rooms',
          jwt: chatkit.generateAccessToken({userId: email}).token,
          body: { name: email, private: false, user_ids: ['adminuser'] },
        };

        // Since we can't find a client room, we will create one and return
        // that.
        chatkit.apiRequest(createRoomRequest)
          .then(room => res.json(room))
          .catch(err => next(
            new Error(`${err.error_type} - ${err.error_description}`)
          ))
      })
      .catch(err => next(
        new Error(`${err.error_type} - ${err.error_description}`)
      ))
  }
});
module.exports = router;