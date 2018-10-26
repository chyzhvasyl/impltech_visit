let express = require('express');
let router = express.Router();
let user = require('../schems/user');
let message = require('../schems/message');
let _ =  require('lodash');
let passport = require('passport');
let jwt =  require('jsonwebtoken');
let {Strategy, ExtractJwt }=  require('passport-jwt');
let {jwt1} = require('../config/config.js');


//router.get('/auth', get);
router.get('/history:/id',  check_auth, get_history);
router.post('/auth',   auth);
router.post('/logout',   logout);


router.get('/', (req, res) => {
  res.send('all good');
});


passport.use(new Strategy(jwt1, function(jwt_payload, done){
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

function create_token(body) {
  return jwt.sign(
    body,
    jwt1.secretOrKey,
    {expiresIn: jwt1.expiresIn}
  );

}

function  auth(req, res) {
  let userData = req.body;
  user.findOne({mail: {$regex: _.escapeRegExp(userData.mail), $options: 'i'}}).exec(function (error, user_data) {
    if (error)
    {
      res.send(error);
    }
    else {
      if (user_data == void(0)){
       let new_user = new user(userData);
        new_user.save(function (error, userdata) {
           if (error) {
             res.sendStatus(400).send(error);
           }
           else
             {
                let token =  create_token({id: userdata._id, username: userdata.username});
                res.cookie('token', token, {
                httpOnly: true
          });
                res.send(userdata);
           }
         });
      }
      else {
        let token =  create_token({id: user_data._id, username: user_data.username});
        res.cookie('token', token, {
          httpOnly: true
        });
        res.send(user_data);
        res.status(200).send({user_id: user_data._id, message: 'user loggedIn'} );
      }
    }
  })
}

function logout(req, res) {
  res.clearCookie('token');
  res.status(200).send({message: 'logged out successfully'});
}


function get_history(req, res) {

}

module.exports = router;
