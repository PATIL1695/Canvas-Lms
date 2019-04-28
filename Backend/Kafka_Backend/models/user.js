var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var Schema = mongoose.Schema;


//Person schema
var personsSchema = Schema({
    _id: Schema.Types.ObjectId,
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    About: {
        type: String
    },
    citycountry: {
        type: String
    },
    
    Student_id: {
        type: String
    },
    school: {
        type: String
    },
    hometown: {
        type: String
    },
    language: {
        type: String
    },
    gender: {
        type: String
    },
    phone: {
        type: Number
    },
    typeOfPerson: {
        type: String
    }

});



//save the users hashed password, signup request or password change request
personsSchema.pre('save',function(next){
    console.log("Hashing is called")
    var user=this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
              console.log("Error......1",err)
              return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) {
                console.log("Error......2",err)
                return next(err);
              }
              console.log("No error.....")
              user.password = hash;
              next();
            });
        });
    } else {
        return next();
    }
})

/*
//method to compare passowrd,login request
personsSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
};

*/
  
module.exports=mongoose.model('User', personsSchema,'Users');

// module.exports={
//     Persons,
//     Property,
//     Booking
// }


