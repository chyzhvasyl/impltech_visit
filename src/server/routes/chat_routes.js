let express = require('express');
let router = express.Router();
let Pusher = require('pusher');


router.post('/pusher/auth', auth);
const pusher = new Pusher({
  app_id: '612610',
  key: '0814d1ea2b72859d690b',
  secret: '60f48930f54ac650f3c5',
  cluster: "eu"
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



module.exports = router;
