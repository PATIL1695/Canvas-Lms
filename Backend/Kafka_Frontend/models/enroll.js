var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var enrollSchema = Schema({
    _id: Schema.Types.ObjectId,

    course_id: {
        type : String
    },
    course_name: {
        type : String
    },
    Student_id:{
        type :Number
    },
    email:{
        type :String
    },
    grade: {
        type :String
    }   ,
    
    firstName: {
        type :String
    },
    lastName: {
        type :String
    }   

});


module.exports= mongoose.model('enroll', enrollSchema,'enroll');
