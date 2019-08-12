var mongoose = require('mongoose');
UserData = mongoose.model('UserInfo');
var bcrypt = require('bcryptjs');
var fs = require("fs");
var jwt=require('jsonwebtoken');
UserAppointment =mongoose.model('appointment');
var isAuth=require('../Midleware/isAuth');

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
  const reg_pwd=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if(!reg_pwd.test(req.body.Password)){
    res.send('password is invalid');
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

exports.userSignin = (req,res,next) =>{
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  UserData.findOne({Email: email})
  .then(user =>{
    console.log(user);
    if(!user){
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId:loadedUser._id.toString()
      },'secret')
      return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email})
      // res.json({
        // success: true,
        // token: token
    // });
    // })
    // return bcrypt.compare(password,user.password);
  })
  // .then(isEqual =>{
    // if(!isEqual){
    //   const error = new Error('wrong password.');
    //   error.statusCode = 401;
    //   throw error;
    // }

  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }); 
}

  exports.getAllSignin = (isAuth,function(req, res) {
    console.log("hello  signin")
     UserData.find({userId:req.decodedToken}, function(err, data) {
       if (err)
         res.send(err);
       res.json(data); 
     });
   });
   
exports.updateUser = function(req, res) {
  UserData.findOneAndUpdate({_id: req.body.userId}, 
    req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};


exports.Appointments = function(req, res){

 var userAppointment = new UserAppointment(req.body);
 console.log(req.body)
 userAppointment.save(function(err, data){
    if(err)
      res.send(err.message);
      res.json(data);
 })
}

exports.getAllAppointment = (function(req, res) {
  console.log("hello appointment")
  UserAppointment.find( function(err, data) {
     if (err)
       res.send(err);
     res.json(data);
    
   });
 });

 exports.getAllSchedule = (function(req, res) {
  console.log("hello appointment")
  UserAppointment.find( function(err, data) {
     if (err)
       res.send(err);
     res.json(data);
    
   });
 });










 