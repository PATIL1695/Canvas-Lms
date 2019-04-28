const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
//var Module = require('../models/user');
//var PropertyModule = require('../models/property');
var CourseModule = require('../models/courses');
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

//var course = [];
function handle_request(msg, callback){
console.log("i am here");
    CourseModule.find(function(err,results){
        if(err){
            console.log(err);
            callback(null, {
                status  : 400,
                message : "Failed while fetching courses" 
            }) 
            throw err;

        }else{
            console.log("After fetching++++++++++",results); 
            callback(null, results)

        }
    
        
    })

    console.log('in create course kafka backend', msg) 
    
}
    
// console.log("Inside book kafka backend");
//     console.log(msg);

//     course.push(msg);
//     callback(null, course);
//     console.log("after callback");



exports.handle_request = handle_request;