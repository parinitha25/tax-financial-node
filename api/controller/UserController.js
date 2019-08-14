var mongoose = require('mongoose');
UserData = mongoose.model('UserInfo');
var bcrypt = require('bcryptjs');
var fs = require("fs");
var jwt=require('jsonwebtoken');
UserAppointment =mongoose.model('appointment');
UserContact=mongoose.model('contact');
UserSchedule=mongoose.model('schedule');
var isAuth=require('../Midleware/isAuth');
var nodemailer = require ('nodemailer');

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
    })
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
const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  if(reg_email.test(req.body.email)){
    var userAppointment = new UserAppointment(req.body);
    console.log("appointment is confirm");
    userAppointment.save(function(err, data){
      if(err)
        res.send(err.message);
        res.json(data);
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'parinithajyothi@gmail.com',
          pass: 'pari@253'
        }
      });
      var mailOptions = {
        from: 'parinithajyothi@gmail.com',
        to: data.email,
        subject: 'Acknowledge for getting appointment',
        text: `Hii your appointment with Tax expert compnay is confirmed`+data.date,      
      };
      console.log(data)
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
          return console.log(error.message);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    })
  }
  else {
    res.send('Email is invalid');
  }
};


exports.getAllAppointment = (function(req, res) {
  console.log("appointment")
  UserAppointment.find( function(err, data) {
    if (err)
      res.send(err);
      res.json(data); 
  });
});

 exports.getAllContact = function(req,res){ 
  const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  if(reg_email.test(req.body.cemail)){
    var Contact = new UserContact(req.body);
    console.log("appointment confirm");
    Contact.save(function(err, data){
      if(err)
        res.send(err.message);
        res.json(data);
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'parinithajyothi@gmail.com',
          pass: 'pari@253'
        }
    });
    var mailOptions = {
        from: 'parinithajyothi@gmail.com',
        to: data.cemail,
        subject: 'Acknowledge for getting appointment',
        text: `Hii your appointment with Tax expert compnay is confirmed`      
    };
      console.log(data)
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
          return console.log(error.message);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    })
  }
  else {
    res.send('Email is invalid');
  }
};


exports.createProduct = function(req, res) {
  var schedule_date = new UserSchedule(req.body);
  console.log("deletes");
  schedule_date.save(function(err, data) {
  if (err)
  res.send(err);
  res.json(data);
  });
  };

exports.delete=(req, res)=> {
  console.log("hiiii")
  debugger;
  UserAppointment.remove({ _id: req.params.id }, (error, data) => {
      if (error) { res.json(error) }
      res.json(data)
  })
}

exports.update=(req, res)=>{
  console.log("update")
  UserAppointment.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error, data) => {
      if (error) { res.json(error) }
      res.json(data)
  })
}







 