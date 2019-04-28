var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AssignmentSchema = Schema({
    
    course_id: {
        type : String
    },
    User: {
        type : String
    },
    Url:{
        type :String
    },
    Assignement_topic:{
        type :String
    },
    Extension:{
        type :String
    },
    Assign_grade:{
        type: String
    }

    
});


module.exports= mongoose.model('Assignments', AssignmentSchema,'Assignments');