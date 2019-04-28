var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var coursesSchema = Schema({
    
    course_id: {
        type : String
    },
    Assignment_description: {
        type : String
    },
    Assignment_topic:{
        type :String
    },
    professor:{
        type :String
    },
    total:{
        type:String
    }
    
});


module.exports= mongoose.model('Assignment-create', coursesSchema,'Assignment-create');


