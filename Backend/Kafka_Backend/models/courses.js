var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var coursesSchema = Schema({
    _id: Schema.Types.ObjectId,

    course_id: {
        type : String
    },
    course_name: {
        type : String
    },
    course_dept:{
        type :String
    },
    course_desc:{
        type :String
    },
    course_room: {
        type :Number
    }   ,
    course_cap: {
        type :Number
    }   ,
    waitlist: {
        type :Number
    }   ,
    term: {
        type :String
    } ,
    professor: {
        type :String
    }    

});


module.exports= mongoose.model('courses', coursesSchema,'courses');


