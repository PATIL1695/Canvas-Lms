var Model = require('../models/user');
var bcrypt = require('bcrypt-nodejs');


function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Login');
    console.log('Message', msg);

    Model.findOne({
        'email': msg.email
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);
        }
        else {

            if(user){
                console.log("User details ", user);
                if (!bcrypt.compareSync(msg.password, user.password)) {                
                    console.log('Invalid Credentials!');
                    callback(null, null);                
                }
                else {
                console.log("i am here")
                    callback(null, user);
                }
            }
            else{
                callback(null, user);
            }
            

        }

    });
}

exports.handle_request = handle_request;