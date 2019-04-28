const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
var UserModule = require('../models/user');
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
    console.log("i am here@@@@@@@@@",msg);
        UserModule.findOne({'email': msg.email},function(err,result){  
            if(err){
                console.log(err); 
                callback(null, {
                    status  : 400,
                    message : "Failed while fetching student details"
                })
                throw err;
    
            }else{

                //console.log("After fetching",result.Student_id);
                var  enrollment = new EnrollModule({
                    _id             : new mongoose.Types.ObjectId(),
                    course_id       : msg.course_id,
                    course_name     : msg.course_name,
                    Student_id      : result.Student_id, 
                    email           : result.email,
                    grade           : 'ungraded',
                    firstName       : result.firstName,
                    lastName        : result.lastName

                })
                EnrollModule.findOne({'course_id':enrollment.course_id,'Student_id':enrollment.Student_id,'email':enrollment.email},function(err,result){
                    if(err){
                        console.log("error while fetching");
                        throw err;

                    }
                    if(!result){
                        enrollment.save(function(err,result){
                            if(err){
                                console.log(err);
                                console.log('new enrollment not added!');
        
                            }else{
                                console.log('added sucessfully',result);
                               
                            }
        
                        callback(null, result)
            
                    })
                    }else{
                        console.log("record already exsists")
                        callback(null, null)

                    }
                })

                
        }
        
            
        })
    
        console.log('in create course kafka backend', msg)
        
    }
        
   
    
    
    exports.handle_request = handle_request;