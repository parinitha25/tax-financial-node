var mongoose = require('mongoose'),
UserData = mongoose.model('UserInfo');
var bcrypt = require('bcryptjs');
var fs = require("fs");

//get all users
exports.getAllUsers = function(req, res) {
 console.log(req.body);
  UserData.find({}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
    console.log(data);
  });
};


exports.getUser = function(req, res){

  console.log(req.params.emailId);    
  UserData.find({email: req.params.emailId},
    function(err, data){
      if (err)
        res.send(err);
      res.json(data);
      console.log(data);
    });
};


exports.userSignup = function(req, res){
  console.log("hi signup")
  const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  const reg_mob=/^[0]?[789]\d{9}$/;
  const reg_pwd=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if(!reg_pwd.test(req.body.Password)){
    res.send('password is invalid');
  }
  if(!reg_mob.test(req.body.Phone)){
    res.send('Mobile number is invalid');
  }
  if(reg_email.test(req.body.Email)){
    console.log(req.body);
    UserData.find({Email: req.body.Email},function(err, data){
      if(data != null && data != ''){
        res.send('User already exists');
      }
      else
      {
        var userData = new UserData(req.body);
        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(userData.Password, salt, function(err, hash) {
            userData.Password = hash;
            userData.save(function(err, data){
              if(err)
                res.send(err.message);
              res.json(data);
              res.json("user succesfully created");
            })
          })
        })
      }
    });
  }
  else {
    res.send('Email is invalid');
  }
};

exports.userSignin = function(req,res){
  UserData.find({Email: req.body.Email}, function(err, data){
    if(data!= null && data != ''){
      bcrypt.compare(req.body.Password, data[0].Password, function( err, isMatch) {
        if(isMatch == true){
          res.send("User succesfully signIn");
        }
      });
    } 
    else{
      res.send("User does not exists");
    }
  });
};

exports.updateUser = function(req, res) {
  UserData.findOneAndUpdate({_id: req.body.userId}, 
    req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};










