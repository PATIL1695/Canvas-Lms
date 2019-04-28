const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
var UserModule = require('../models/user');
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
//var passport = require('../config/passport');

// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser(config.secret))

mongoose.connect(config.database,()=>{
    console.log("Connected to mongoose")
});

var course = []; 
function handle_request(msg, callback){

    console.log('in create course kafka backend', msg.courses.course_id)
    CourseModule.findOne({course_id:msg.courses.course_id}, function(err,result){
if(err){
    console.log("error while fetching courses")
    throw err;

}
else{
    console.log("enter course details into Db++++++++++++");
    var newCourse = new CourseModule({

        _id: new mongoose.Types.ObjectId(),
        course_id: msg.courses.course_id,
        course_name:msg.courses.course_name,
        course_dept:msg.courses.course_dept,
        course_desc:msg.courses.course_desc,
        course_room:msg.courses.course_room,
        course_cap:msg.courses.course_cap,
        waitlist:msg.courses.waitlist, 
        term: msg.courses.term,
        professor : msg.users

    });
    newCourse.save(function(err,res){
        if(err){
            callback(null, { 
                status  : 400,
                message : "Failed while entering"
            })
            console.log("error while adding to db")
        }else{
            callback(null, { 
                status          : 200,
                //fetchedProperty : res,
                message         : "added course"
            })
            
        }
    })
}
})
    
// console.log("Inside book kafka backend");
//     console.log(msg);

//     course.push(msg);
//     callback(null, course);
//     console.log("after callback");

}

exports.handle_request = handle_request;