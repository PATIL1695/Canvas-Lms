const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
//var Module = require('../models/user');
//var PropertyModule = require('../models/property');
var UserModule = require('../models/user');
var config = require('../config/main');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var express = require('express');
var app = express();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const multer=require('multer')

//Bringing in passport strategy that we just defined
//require('../config/passport')(passport);

// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser(config.secret))

mongoose.connect(config.database,()=>{
    console.log("Connected to mongoose")
});

var course = [];
function handle_request(msg, callback){
    console.log("++++++++++@@@@@@@",msg)

    UserModule.findOne({
        'email': msg.email
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);
        }
        else {
            console.log('Userdetails', user);

            user.firstName = msg.firstName;
            user.lastName = msg.lastName;
            //user.Email = message.body.Email;
            user.About = msg.About;
            //user.Country = msg.Country;
            user.citycountry = msg.citycountry;
            user.gender = msg.gender;
            //user.Hometown = msg.Hometown;
            user.school = msg.school;
            user.Company = msg.Company;
            user.language = msg.anguage;
            user.phone = msg.phone;
            user.Student_id = msg.Student_id;


            //user.ProfileImage = message.body.ProfileImage;

            user.save().then((doc) => {

                console.log("User details saved successfully.", doc);
                callback(null, doc);

            }, (err) => {
                console.log("Unable to save user details.", err);
                callback(err, null);
            });
        }
    });
}


exports.handle_request = handle_request;