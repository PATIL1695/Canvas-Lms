const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const bcrypt = require('bcrypt');
var ExtractJwt = require('passport-jwt').ExtractJwt;


var UserModel = require('./models/user');
var config = require('./main');




module.exports = function (passport) {
  console.log('i am here++++++++');

  var opts = {
    jwtFromRequest: ExtractJwt.fromBodyField('token') ,

    
      secretOrKey: 'secret_my'
  };
  passport.use('jwt',new JwtStrategy(opts, function (jwt_payload, callback) {
    

    console.log('i am here kanapa++++++++?????',jwt_payload.email);


      UserModel.findOne({ 
          'email': jwt_payload.email 
      }, (err, res) => {

              if (res) {
                  var user = res;
                  delete user.password;
                  callback(null, user.email);
              }
              else {
                  callback(err, false);
              }
          });
  }));

  var opts1 = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization') ,

      secretOrKey: 'secret_my'
  };
  passport.use('local',new JwtStrategy(opts1, function (jwt_payload, callback) {
    

    console.log('i am here kanapa++++++++?????',jwt_payload.email);


      UserModel.findOne({ 
          'email': jwt_payload.email 
      }, (err, res) => {

              if (res) {
                  var user = res;
                  delete user.password;
                  callback(null, user.email);
              }
              else {
                  callback(err, false);
              }
          });
  }));
};