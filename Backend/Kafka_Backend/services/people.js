const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
//var Module = require('../models/user');
//var PropertyModule = require('../models/property');
var EnrollModule = require('../models/enroll');
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

function handle_request(msg, callback){
    console.log("i am here");
        EnrollModule.find({course_id: msg},function(err,result){
            if(err){
                console.log(err);
                callback(null, {
                    status  : 400,
                    message : "Failed while fetching courses"
                })
                throw err;
    
            }else{
                console.log("After fetching",result);
                callback(null, result)
    
            }
        
            
        })
    
        console.log('in create course kafka backend', msg)
        
    }
        
   
    
    
    exports.handle_request = handle_request;