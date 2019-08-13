var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  FirstName:{
    type:String,
    required:'please Enter valid name'
  },
  LastName:{
    type:String,
    required:'please Enter valid name'
  },
  Email: {
    type: String,
    required: 'Please Enter valid emailId'
  },
  Password: {
    type: String,
    required: 'Please Enter the current password'
  },
  Phone: {
    type: Number,
    required: 'Please Enter mobile number'
  }, 
  Created_date: {
    type: Date,
    default:Date.now()
  }
});

module.exports = mongoose.model('UserInfo', UserSchema);

var appointmentSchema=new Schema({
  name:{
    type:String,
    required: 'name required'
  },
  email:{
    type:String,
    required: 'email required'
  },
  date:{
    type:Date,
    required: 'date required'
  },
  time:{
    type:String,
    required: 'time required'
  }
  

})
module.exports = mongoose.model('appointment',appointmentSchema);

var contactSchema =new Schema({
  cname: {
    type:String
  },
  cemail: {
    type:String
  },
  message:{
    type:String
  },
  confirmm:{
    type:String
  }
})
module.exports = mongoose.model('contact',contactSchema)
