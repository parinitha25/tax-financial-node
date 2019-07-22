import mongoose from 'mongoose'
import downloadSchema from '../Model/Usermodel'
const Cryptr = require('cryptr');
const bcrypt = require('bcrypt'); 
const cryptr = new Cryptr('myTotalySecretKey');
const Download = mongoose.model('Download', downloadSchema)
var validator = require("email-validator");

// get single download based on the id
exports.Login=(req, res)=> {
    console.log("hi")
    Download.find({Email:req.body.Email},(error, download) => {
        console.log(req.body.Password)
        if(download != null && download != ''){
           const pass= cryptr.decrypt(download[0].Password);
        //    console.log("dcrypt"+pass)
           console.log(pass,download[0].Password)
                if(pass == req.body.Password){
                  res.json("Login Successful");
                  console.log("hello")
                }
                else{
                  res.send("Password does not matched");
                }
            } else{
              res.send("User does not exists");
            }
          });
        }
exports.userSignup = (req, res)=>{
    console.log("hii sign up");
    Download.find({Email: req.body.Email},function(err, data){
        if(data != null && data != ''){
        res.send('User already exists');
        }
        else
        {
            const reg= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/;
            if(reg.test(req.body.Password))
            {
              console.log("hi");
                req.body.Password = cryptr.encrypt(req.body.Password);
                var userData = new Download(req.body);
                userData.save(function(err, data){
                if(err)
                res.json(data);
                res.send(err.message);
            })
            res.json(data);
          
            }
        }
    });
    };