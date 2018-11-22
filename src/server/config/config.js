'use strict';

function ExtractJwt (req) {
  let token = null;
  if(req.cookies && req.cookies.token != void(0)) token = req.cookies['token'];
  return token;
}
module.exports = {
jwt1:{
  jwtFromRequest: ExtractJwt,
  secretOrKey:'YhZu-x#Nf2sT',
  expiresIn: '1day'

}
,
  authGmail: {
    user: "vasyachyzh1996@gmail.com",
    pass: "471034pop"
  }
};
