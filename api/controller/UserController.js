var mongoose = require('mongoose'),
UserData = mongoose.model('UserInfo');
var bcrypt = require('bcryptjs');
var fs = require("fs");
UserAppointment =mongoose.model('appointment');

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

exports.userSignin = function(req,res){
  console.log("hi signin")
  UserData.find({Email: req.body.Email}, function(err, data){
    if(data!= null && data != ''){
      // if(err){
      res.send("User succesfully signIn");
      // res.json(data);
    // }
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


exports.Appointments = function(req, res){
 console.log("hi signup")
 var userAppointment = new UserAppointment(req.body);
 userAppointment.save(function(err, data){
    if(err)
      res.send(err.message);
      res.json(data);
 })
}

exports.getAllAppointment = function(req, res) {
  console.log("hello")
  UserAppointment.find( function(err, data) {
     if (err)
       res.send(err);
     res.json(data);
    
   });
 };

 exports.getAllAppointmentedit=function(req,res){
   console.log("edit")
   var userAppointment = new UserAppointment(req.body);
   userAppointment.find(req.body,function(err,data){
      if(err) 
      // throw error;
      // res.send(JSON.stringify(results));
      res.send(err);
     res.json(data);
   });
  };

//  router.get('/edit', function(req, res, next) {
//   res.locals.connection.query('update members set name = ''+req.body.name+'', email = ''+req.body.email+'' where id = ''+req.body.id+''', function (error, results, fields) {
//       if(error) throw error;
//       res.send(JSON.stringify(results));
//   });
// });








