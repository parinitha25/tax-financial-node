var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  Name: {
    type: String,
    required: 'Please Enter the firstname'
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
    type: String,
    required: 'Please Enter mobile number'
  }, 
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserInfo', UserSchema);