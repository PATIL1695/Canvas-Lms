const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const bcrypt = require('bcrypt');
var ExtractJwt = require('passport-jwt').ExtractJwt;


var UserModel = require('./models/user');
var config = require('./main');


module.exports = function (passport) {
  var opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret
  };
  passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
      console.log('i am here kanapa++++++++/////////');

      UserModel.Userdetails.findOne({ 
          'Username': jwt_payload.Username 
      }, (err, res) => {

              if (res) {
                  var user = res;
                  delete user.Password;
                  callback(null, user);
              }
              else {
                  callback(err, false);
              }
          });
  }));
};