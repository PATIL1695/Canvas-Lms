var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var kafka = require('./kafka/client');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
var cookieParser = require('cookie-parser');
var UserModule = require('./models/user');
//var PropertyModule = require('./models/property');
//var BookingModule = require('./models/booking');
var mongoose = require('mongoose');
var config = require('./main');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path=require('path');
const secret = "secret";
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');    
const crypto = require('crypto');
var Assignments = require('./models/assignments')
var CourseModule = require('./models/courses');  

app.use(cookieParser(config.secret))  

//var mongo=require('mongodb');
var assert=require('assert');
//var url='mongodb://localhost:27017'

//with /images url i should be directed to the images folder
app.use('/images', express.static(__dirname+'/uploads'));

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(passport.initialize());

//Bringing in passport strategy that we just defined
require('./passport')(passport);
//require('../Kafka_Frontend/config/passport')(passport);

var requireAuth = passport.authenticate('jwt', {session: false});

// need cookieParser middleware before we can do anything with cookies

 mongoose.connect(config.database,()=>{
    console.log("Connected to mongoose")
 });

//Allow Access Control
 app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
  
  app.use(bodyParser.json());


const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');


const fileUpload = require('express-fileupload')
app.use(fileUpload());

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: '',
  secretAccessKey: ''
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();


// Define POST route
app.post('/upload',passport.authenticate('local', {session: false}), (req, res) => {
    console.log(req.headers) 
    console.log(req.user)
    
    


    console.log(`file lastModified: ${req.files.file.lastModified}`);
    console.log('file name:' ,req.files.file.name);
    console.log(`file ID: ${req.body.ID}`);
    var extension = path.extname(req.files.file.name);
    extn = extension.split('.').join("");

    console.log(extn)


    const params = {
		Bucket: "canvas-patil",
		Key: `${req.body.ID}-${req.files.file.name}`,
		Body: req.files.file.data
    };
    
    s3.upload(params, function(error, data) {
		if(error) {
			console.log(`File upload failed`);
			res.status(500).json({error: error});
		} else {
			console.log(`File upload successful`,data.Location)
            res.status(200).json({ ID: req.body.ID, NAME: req.files.file.name, URL: data.Location });
            
            var newAssignment = new Assignments({
                _id             : new mongoose.Types.ObjectId(),
                User            :req.user,
                course_id        : req.headers.course_id,
                Url              : data.Location,
                Assignement_topic: req.headers.assignment_topic,
                Extension: extn,
                Assign_grade: ''
            
            }) 

            newAssignment.save(function(err,result){
                if(err){
                    console.log(err)

                    throw err;
                }
                else{
                    console.log('sucess')
                }
            })

		}
    });

    



});
  
app.post('/get-files',function(req,res){

    console.log('inside view all assignments for professor',req.body);
    Assignments.find({'course_id': req.body.course_id},function(err,result){
        if(err){
            console.log(err);
            throw err;
        }else{
            console.log(result);
            res.send({
                status: 200,
                result:result
            })
        }
    })
          
        
      
      
})

 app.post('/student/register', function (req, res) {
    console.log("Inside signup using MONGODB");
    console.log("Req Body : ",req.body);
    if(!req.body.email || !req.body.password) {
        res.json({ 
            status: 400, 
            message: 'Please enter email and password.' 
        });
    }else {
            console.log("inside main signup mongo")
            UserModule.findOne({email:req.body.email} ,function(err, user) {
                console.log("Found user ?",user," Error?",err)
                if (err) {
                    console.log("There was an error while finding user",err);
                    throw err;
                }
                if (!user) {
                    console.log("No such user, create now !")
                    var newUser = new UserModule({
                        _id             : new mongoose.Types.ObjectId(),
                        firstName       : req.body.first_name,
                        lastName        : req.body.last_name,
                        email           : req.body.email,
                        password        : req.body.password,
                        typeOfPerson    : "student",
                        About      : '',
                        citycountry : '',
                        Student_id : '',
                        school    :'',
                        language   :'',
                        gender    :'',
                        phone     :''
                    });
                    newUser.save(function(err) {
                        if (err) {
                        console.log("Error while saving the new user:",err)
                        }
                        console.log("saved user sucessfully")
                        res.send({ 
                            status  : 200, 
                            message : 'Successfully created new user.' 
                        });
                    });
                } else {
                    console.log("Email address already exisits.....")
                    return res.send({ 
                        status  : 400, 
                        message : 'Email address already exists.',
                        user: user
                    });
                }
            })
    }
 });




app.post('/prof/register', function (req, res) {
            console.log("Inside Sign Up Request Handler");
            console.log("request:", req.body);
            if(!req.body.email || !req.body.password){
                res.json({
                    status: 400,
                    message: "enter email and password" 
                })
            }
                else{
                    console.log("going right insert now!");
                    UserModule.findOne({email:req.body.email} ,function(err,result){
                        if(err){
                            console.log("error in finding user");
                        }if(!result){
                        console.log("no such user found inserting into DB");
                        var newProf =  new UserModule({
                            _id             : new mongoose.Types.ObjectId(),
                            firstName       : req.body.first_name,
                            lastName        : req.body.last_name,
                            email           : req.body.email,
                            password        : req.body.password,
                            typeOfPerson    : "professor"
                        });
                        newProf.save(function(err){
                            if(err){
                                console.log('new professor not saved !');

                            }else{
                                console.log('professor added sucessfully');
                                res.send({
                                    status:200,
                                    message:"added sucessfully into DB"
                                })
                            }

                            
                        })
                    }else{
                        console.log("user already there try a differnt email_id");
                        return res.send({ 
                            status  : 400, 
                            message : 'Email address already exists.',
                            user: result
                        });

                    }

                        
                    }
                    )
                }
            
        })
 app.post('/student/login', function (req, res,next) {  

    console.log("inside login post request");
        console.log("Inside owner Login Post Request mongo");
        console.log("Req Body : ",req.body);
        if(!req.body.email || !req.body.password) { 
            res.json({ success: false, message: 'Please enter email and password.' });
        }
        else{
            UserModule.findOne({email:req.body.email, typeOfPerson: 'student'},function(err,result){
                if(err){
                    console.log('erorr while fetching result');

                    throw err;

                }
                if(!result){
                    console.log('No such user found, try creating an account');
                    res.send({status:400,message:'no user found'})

                }
                if(result){
                    console.log('user found...pls check with the password');
                    bcrypt.compare(req.body.password, result.password, function(err, passwordsMatch){
                        if(err){
                            console.log('error while checking for password ');
                            throw err;
                        }
                        if(!passwordsMatch){
                            console.log('incorrect password..pls try again');
                            res.send({status:401})
                        }
                        if(passwordsMatch){
                            console.log('password is matching...proceed further with token genration'); 
                            const payload = {
                                email: result.email,
                                firstName: result.firstName
                            }
                            var token = jwt.sign(payload, 'secret_my',{expiresIn: 10080});
                            console.log('++++++token',token)

                            res.send({
                                status: 200,
                                token: token,
                                message: 'token generated..login'

                            })


                        }

                    })
                }
            })
        }
    });

    app.post('/prof/login', function (req, res,next) {  

        console.log("inside login post request");
            console.log("Inside owner Login Post Request mongo");
            console.log("Req Body : ",req.body);
            if(!req.body.email || !req.body.password) { 
                res.json({ success: false, message: 'Please enter email and password.' });
            }
            else{
                UserModule.findOne({email:req.body.email, typeOfPerson: 'professor'},function(err,result){
                    if(err){
                        console.log('erorr while fetching result');
    
                        throw err;
    
                    }
                    if(!result){
                        console.log('No such user found, try creating an account');
                        res.send({status:400,message:'no user found'})
    
                    }
                    if(result){
                        console.log('user found...pls check with the password');
                        bcrypt.compare(req.body.password, result.password, function(err, passwordsMatch){
                            if(err){
                                console.log('error while checking for password ');
                                throw err;
                            }
                            if(!passwordsMatch){
                                console.log('incorrect password..pls try again');
                                res.send({status:401})
                            }
                            if(passwordsMatch){
                                console.log('password is matching...proceed further with token genration'); 
                                const payload = {
                                    email: result.email,
                                    firstName: result.firstName
                                }
                                var token = jwt.sign(payload, 'secret_my',{expiresIn: 10080});
                                console.log('++++++token',token)
    
                                res.send({
                                    status: 200,
                                    token: token,
                                    message: 'token generated..login'
    
                                })
    
    
                            }
    
                        })
                    }
                })
            }
        });
    

 
                    







 
        

app.post('/logout', function (req, res) {
    console.log('POST LOgout!');
    //res.clearCookie('cookie');
    //req.session.user = undefined;
    res.writeHead(200, {
        'Content-type': 'text/plain'
    });
    res.end('Back to login!');

 });

 app.post('/create/course',requireAuth,function (req, res) {


         console.log("inside create course post handler",req.body);
 const kafkaData ={
    courses : req.body,
    users : req.user 
 }
          
        
         kafka.make_request('course_create',kafkaData, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                    res.json({
                        status: results.status,
                        message: results.message
                    }); 
    
                    res.end();
                }
            
        });
    });
    

         
 app.post('/all/courses' ,requireAuth,function(req, res){

            console.log("inside available courses handler",req.user);
            //console.log(req.token);

            // kafka.make_request('course_available', '',function(err,result){ 
            //     console.log('in result');  
            // console.log(result);

            // if (err){
            //     console.log("Inside err");
            //     res.send({
            //         status:"error",
            //         msg:"System Error, Try Again."
            //     })
            // }else{
            //     console.log("Inside else");
            //         // res.send({
            //         //     status: result.status,
            //         //     message: result.message,
            //         //     courses: result
            //         // }); 
    
            //     }
            //     res.end(JSON.stringify(result));
            // })


            CourseModule.find(function(err,results){
                if(err){
                    console.log(err);
                    res.send( {
                        status  : 400,
                        message : "Failed while fetching courses"
                    })
                    throw err;
        
                }else{
                    console.log("After fetching++++++++++",results); 
                    res.end(JSON.stringify(results))
        
                }
            
                
            })
        });
        
        app.post('/search',requireAuth, function(req, res){ 

            console.log("inside available courses handler");
            kafka.make_request('course_available', '',function(err,results){
                console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.send({
                    status:"error",
                    msg:"System Error, Try Again."   
                })
            }else{
                var searchResult = results.filter((result)=>{   
                    
                    id = result.course_id.indexOf(req.body.search) > -1;
                                   
                                   return id;

                                });
                                    res.writeHead(200,{
                                        'Content-Type' : 'application/json'
                                    });
                                    console.log("Search result : ",JSON.stringify(searchResult));
                                    res.end(JSON.stringify(searchResult));
                                }
                            })
    })          

    app.post('/search1',requireAuth, function(req, res){

        console.log("inside available courses handler");
        kafka.make_request('course_available', '',function(err,result){
            console.log('in result');
        console.log(result);
        if (err){
            console.log("Inside err");
            res.send({
                status:"error", 
                msg:"System Error, Try Again."
            })
        }else{
            var searchResult = result.filter((result)=>{
                
                id2 = result.course_name.indexOf(req.body.search) > -1;
                               
                               return id;

                            });
                                res.writeHead(200,{
                                    'Content-Type' : 'application/json'
                                });
                                console.log("Search result : ",JSON.stringify(searchResult));
                                res.end(JSON.stringify(searchResult));
                            }
                        })
})          
 app.post('/updateProfile',  passport.authenticate('jwt', {session: false}),function(req, res) {
             console.log("inside update profile handler");
             kafka.make_request('update_profile',req.body,function(err,result){
                 if(err){
                     console.log("error occured while updating")
                 }else{
                     console.log("updated sucessfully");
                     res.send({
                         status: 200,
                         message: 'user added sucessfully'
                     })
                 }
             })
         })

 app.post('/show',requireAuth, function(req, res){

    console.log("inside show profile handler");
    kafka.make_request('show_profile',req.user, function(err,result){
        if(err){
            console.log("error while displaying data");
        }else{
            console.log("displaying sucessfully",JSON.stringify(result));
            res.send({
                status: 200,
                result
            })

        }
    })
                       
 });
 



app.post('/enroll',requireAuth, function(req,res){
        console.log(req.body.data.course_id) 
        console.log(req.body.data.course_name)
        console.log(req.user)

        console.log("inside enrollment handler");
        const Data = {
            course_id:req.body.data.course_id,
            course_name:req.body.data.course_name, 
            email: req.user    
        }

        kafka.make_request('enroll',Data,function(err,result){
            if(err){
                console.log("error while enrolling");
            }else{
                console.log("enrollment done sucessfully");
                res.end();
            }
        })
});
app.post('/all/subjects' ,passport.authenticate('jwt', {session: false}),function (req,res) {
        console.log("inside all subjects handler",req.user);
        kafka.make_request('all_subjects_dashboard',req.user,function(err,result){
            if(err){
                console.log('error while fetching');
            }else{
                console.log('displaying subjects ')
                res.send({
                    status : 200,
                    dataToDisp : result 

                })
            }
        })

});


app.post("/delete_sub",requireAuth, function (req,res) {
    console.log("+++++++++++++++++++++++",req.body.data)
const data= {
    course_id: req.body.data,
    email: req.user
}
    kafka.make_request('delete_subject',data,function(err,result){
        if(err){
            console.log("error while deleting subjects")
            throw err;
        }else{
            console.log("deleted sucessfully",result)
            res.send({
                status : 200,
                dataToDisp : result 

            })
        }
    }) 
    
    
});   


app.post("/prof/dashboard",passport.authenticate('jwt', {session: false}), function (req,res) {


  console.log('inside showing courses handler+++++++');
  kafka.make_request('Prof_Dashboard',req.user,function(err,result){
    if(err){
        console.log("error while displaying all professor subjects");
    }else{
        console.log('displaying sucessfully');
        console.log("course list:", JSON.stringify(result));
             res.send({
                 dataToDisp: result,
                 status: 200 
             })

    }

  })

});

app.post("/prof_delete_sub",requireAuth, function (req,res) {
    console.log('+++++++++++++++??????????',req.body.data)
    const data= {
        course_id: req.body.data,
        email: req.user
    }

    kafka.make_request('prof_delete_subject',data,function(err,result){
        if(err){
            console.log("error while deleting subjects")
            throw err;
        }else{
            console.log("deleted sucessfully")
            res.send();
        }
    })
    
    
});

// app.post("/assign_upload",upload.single('file'), function(req,res,next){
// if (req.file){
//     console.log('Uploading file...');
//         var filename = req.file.filename;
//         var uploadStatus = 'File Uploaded Successfully';
//         console.log(filename);
//     } else {
//         console.log('No File Uploaded');
//         var filename = 'FILE NOT UPLOADED';
//         var uploadStatus = 'File Upload Failed';
//     }
    
//     /* ===== Add the function to save filename to database ===== */

// });


// app.get('/show_assign', function (req, res) {
//     var filePath = "./uploads/vishwanath_patil_resume_1.pdf";

//     fs.readFile(__dirname + filePath , function (err,data){
//         res.contentType("application/pdf");
//         res.send(data);
//     });
// });

 app.post('/add_assign', requireAuth, function (req,res) { 


     console.log("inside adding assignments handler");

     const KafkaData = {
         assignment_descp: req.body.Assign_descp,
         assignment_topic: req.body.Assign_topic,
         course_id: req.body.course_id,
         professor: req.user,
         total: req.body.total

     }
     kafka.make_request('create_assignment',KafkaData,function(err,result){
         if(err){
             console.log("error while creating assignemt")
         }else{
             console.log('assignment added sucessfully',result)
             res.end();


         }
     })


 });

 app.post('/show_assign1',requireAuth, function(req,res){
     console.log('inside display all assignments handler*************',req.body.course_id);


 kafka.make_request('all_assignments',req.body.course_id,function(err,result){
    if(err){
        console.log("error while creating assignemt")
    }else{
        console.log('assignment added sucessfully',result)

        res.send({
                            status: 200,
                             dataToDisp: result
                         })
        res.end(); 


    }
 })


 });

// app.post('/add_quiz', function (req,res) {
//     console.log("inside adding assignments handler");

//     //var question = req.body.;
//     //var assign_topic = req.body.Assign_topic;


//     //console.log(assign_descp,assign_topic);

//     pool.getConnection(function (err, conn) {
//         if (err) {
//             console.log('Error in creating connection!');
//             res.writeHead(400, {
//                 'Content-type': 'text/plain'
//             });
//             res.end('Error in creating connection!');
//         }
//         else {
// var sql = "INSERT INTO quiz(course_id,question,option1,option2,option3,option4) VALUES ( " +
// mysql.escape("CMPE 273") + " , " 
// + mysql.escape(req.body.question) + " , " +mysql.escape(req.body.option1) + " , " +mysql.escape(req.body.option2)
//  + " , " +mysql.escape(req.body.option3) 
// + " , " +mysql.escape(req.body.option4) +  ")" ;

// conn.query(sql,function(err,result){
//     if (err){
//         throw err;

//     }else{
//         console.log("assignment added sucessfully");
//         console.log(result);
//     }
// })
//         }
//     })
    
// }); 


// app.get('/show_quiz', function(req,res){
//     console.log("showings assignments");
//     pool.getConnection(function (err, conn) {
//         if (err) {
//             console.log('Error in creating connection!');
//             res.writeHead(400, {
//                 'Content-type': 'text/plain'
//             });
//             res.end('Error in creating connection!');
//         }
//         else {
//     conn.query("SELECT * FROM quiz WHERE course_id="+mysql.escape("CMPE 273"),function(err,results){
//         if(err){
//         throw err;
//         }else{
//             res.send({
//                 status: 200,
//                 dataToDisp: results
//             })
//             console.log("showing assignments");
//             console.log(results);

//         }
//     }) 
// }
//     })  


 app.post('/People_student',requireAuth, function(req,res) {
     console.log('inside people request handler',req.body.course_id);
     kafka.make_request('people',req.body.course_id,function(err,result){
         if(err){
             throw err;

         }else{
             console.log('showing people from db sucessfully')
             res.send({ 
                             status: 200,
                             dataToDisp: result
                         }) 

         }
     })

 });
        
 app.post("/delete_student",requireAuth, function (req,res) {
    console.log('inside delete student request handler');
    const KafkaData = {
        course: req.body.course_id,
        Student_id: req.body.S_id
    }
    kafka.make_request('delete_student',KafkaData,function(err,result){
        if(err){
            console.log('error while delteting student')
            throw err;
        }else{
            console.log("deleted student sucessfully")
            res.end();
            
        }
    })


    
 });
        
    
 app.post('/add_announce',requireAuth, function (req,res) {
    const KafkaData = {
        announce_descp: req.body.Announce_descp,
        announce_topic: req.body.Announce_topic,
        course_id: req.body.course_id,
        professor: req.user
        
        

    }
    kafka.make_request('Announcements',KafkaData,function(err,result){
        if(err){
            console.log('error while delteting student')
            throw err;
        }else{
            console.log("deleted student sucessfully")
            res.end();
            
        }
    })


 });

 app.post('/show_announce',requireAuth, function(req,res){


     console.log("showing announce|||||||||||||||||||||||");
     kafka.make_request('announcements_show',req.body.course_id,function(err,result){
        if(err){
            console.log('error while delteting student')
            throw err;
        }else{
            console.log("deleted student sucessfully")
            res.send({
                status: 200,
                 dataToDisp: result
            });
            
        }
     })


 });  

 app.post('/assignment/grade',requireAuth, function(req,res){     
     console.log('@@@@@@@@',req.body);
     Assignments.findOne({'course_id': req.body.course_id, 'Assignment_topic': req.body.Assignement_topic
                              ,"User": req.body.User,'Url':req.body.Assignment_Url},function(err,result){

                                if(err){
                                    console.log(err);

                                }else{
                                    console.log('!!!!!',result)

                                    result.course_id = result.course_id,
                                    result.User = result.User, 
                                    result.Url = result.Url,
                                    result.Assignement_topic = result.Assignement_topic
                                    result.Extension = result.Extension,
                                    result.Assign_grade = req.body.Assign_grade

                                    result.save()

                                }
                                console.log('!!!!!',result)

                              })


 })

        
        
        
    
                             
                
            



        
       
    


    
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

