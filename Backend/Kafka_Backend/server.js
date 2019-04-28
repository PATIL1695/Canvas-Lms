//Below are the list of topics files
//var signin = require('./services/signin.js');
var connection =  new require('./kafka/connection');
var CourseCreate = require('./services/courses_k');
var CourseAvailable = require('./services/available-course');
var updateprofile = require('./services/create-profile');
var login = require('./services/login');
var showProfile = require('./services/display-profile');
var enroll = require('./services/enroll');
var subjectsdashboard = require('./services/all-subjects')
var deleteSubject = require('./services/delete-subjects')
var ProfDashboard = require('./services/prof-dsahboard')

var Prof_delete_subject = require('./services/prof_delete-sub')
var createAssignment = require('./services/create-assignment')
var allAssignments = require('./services/all-assignments')
var people = require('./services/people'); 
var deleteStudent = require('./services/delete-student');
var Announcements = require('./services/announcements');
var AnnouncementsShow = require('./services/show-announcement');

//var SampleTopic = require('./services/sampleTopic.js')

function handleTopicRequest(topic_name,fname){
    console.log("Hitting kafka backedn. Topic_name",topic_name);
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log(message.value);
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        console.log(data)
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(err)
                console.log(data);
            });
            return;
        });
        
    });
}

// Add your TOPICs here
// first argument is topic name
// second argument is a function that will handle this topic request
handleTopicRequest("course_create",CourseCreate)
handleTopicRequest("course_available",CourseAvailable)
handleTopicRequest("update_profile",updateprofile)
handleTopicRequest("login",login) 
handleTopicRequest("show_profile",showProfile)
handleTopicRequest("enroll",enroll)
handleTopicRequest("all_subjects_dashboard",subjectsdashboard)
handleTopicRequest("delete_subject",deleteSubject)
handleTopicRequest("Prof_Dashboard",ProfDashboard)
handleTopicRequest("prof_delete_subject",Prof_delete_subject)
handleTopicRequest("create_assignment",createAssignment)
handleTopicRequest("all_assignments",allAssignments)
handleTopicRequest("people",people)
handleTopicRequest("delete_student",deleteStudent)
handleTopicRequest("Announcements",Announcements)
handleTopicRequest("announcements_show",AnnouncementsShow) 
















//Below is just the smaple topic which i created to tets initial AWS connection
//handleTopicRequest("sampleTopic",SampleTopic)






















