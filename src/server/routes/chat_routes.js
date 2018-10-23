let express = require('express');
let router = express.Router();
let user = require('../schems/user');
let message = require('../schems/message');

let passport = require('passport');
let {Strategy, ExtractJwt }=  require('passport-jwt');



//router.get('/auth', get);
router.get('/history:/id',  check_auth, get_history);
router.post('/auth',   auth);


router.get('/', (req, res) => {
  res.send('all good');
});

var opts = {

  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:'YhZu-x#Nf2sT'

};
passport.use(new Strategy(opts, function(jwt_payload, done){
  if (jwt_payload !== void (0)){
    return done (false, jwt_payload);
  }
  done();
}));



function check_auth(req, res, next) {
passport.authenticate('jwt', {session: false}, (error, decryptToken, jwtError) => {
if (jwtError !== void(0) || error !== void(0)) {
  console.log(jwtError);
  return res.status(401).send('unauthorized ! ', error, jwtError)
}
  req.body = decryptToken;
  next()
})(req, res, next)
}
function get_history(req, res) {

}

function auth(req, res) {
  let userData = req.body;
  user.findOne({mail: userData.mail}, (err, user) => {
    if (err)
    {
      res.send(err);
      res.json(err);

  } else {
    if (!user ) {
      user.save(user);
      res.status(200).send(user);
    }
    else {
      res.status(200).send(user._id);
    }
  }})

}


function get( req, res) {
  // треба якось стянути підтчгування повідомленнь з сокєта через рест апі
  res.send('all good');
}

module.exports = router;
