let express = require('express');
let router = express.Router();
let user = require('../schems/user');
let message = require('../schems/message');

//let Pusher = require('pusher');

router.get('/auth', get);
router.post('/auth', auth);


router.get('/', (req, res) => {
  res.send('all good');
});


/*
const pusher = new Pusher({
  appId: '613333',
  key: '5a85cf001047fc2673d6',
  secret: '38222ae17d1f102aabf0',
  cluster: 'mt1',
  encrypted: true
});
router.get('/', (req, res) => {
  res.send('all good');
});
let messages = [];
function auth (req, res){
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
}
*/
function auth(req, res) {
  let userData = req.body;
  user.findOne({mail: userData.mail}, (err, user) => {
    if (err) {
    res.send(err);
    res.json(err);

    } else {
      if (!user) {
        user.save(user);
        res.status(200).send(user);
      }
       else {
        res.status(200).send('все гуд');
      }
    }
  })

}


function get( req, res) {
  res.send('all good');
}

module.exports = router;
