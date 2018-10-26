let {Strategy, ExtractJwt }=  require('passport-jwt');

module.exports = {
jwt1:{
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:'YhZu-x#Nf2sT',
  expiresIn: '1day'

}


};
