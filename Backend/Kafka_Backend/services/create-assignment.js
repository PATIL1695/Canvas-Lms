const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
//var Module = require('../models/user');
//var PropertyModule = require('../models/property');
var AssignmentModule = require('../models/assignments-create');
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
    console.log("i am here++++++++++++++++++",msg);
    var newCourse = new AssignmentModule({

        _id: new mongoose.Types.ObjectId(),
        course_id: msg.course_id,
        Assignment_description:msg.assignment_descp,
        Assignment_topic:msg.assignment_topic,
        professor : msg.professor,
        total: msg.total

    });
    newCourse.save(function(err,res){
        if(err){
            callback(null, { 
                status  : 400,
                message : "Failed while entering"
            })
        }
        if(res){
        console.log('in create course kafka backend', msg)
        callback(null, { 
            status  : 200,
            message : "assignment added sucessully"
        })
    }
        
})
}
    
    
    exports.handle_request = handle_request;