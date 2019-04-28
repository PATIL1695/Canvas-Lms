var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var coursesSchema = Schema({
    
    course_id: {
        type : String
    },
    Announce_description: {
        type : String
    },
    Announce_topic:{
        type :String
    },
    professor:{
        type :String
    }
    
});


module.exports= mongoose.model('Announcement', coursesSchema,'Announcement');


