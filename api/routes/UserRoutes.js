module.exports = function(app) {
var userData = require('../controller/UserController');
var UserAppointment=require('../controller/UserController');
var UserContact=require('../controller/UserController');
var UserSchedule=require('../controller/UserController');
var isauth=require('../Midleware/isAuth');

// Signup 
 app.route('/signup')
 .post(userData.userSignup);


 //user detail
 app.route('/getUser/:emailId')
 .get(userData.getUser);


 //update 
 app.route('/updateUser')
 .put(userData.updateUser);

 //Sign
 app.route('/signin')
 .post(userData.userSignin)
 .get(isauth,userData.getAllSignin)

 app.route('/appt')
 .post(UserAppointment.Appointments)
 .get(UserAppointment.getAllAppointment)


 app.route('/sch')
 .post(UserSchedule.createProduct)

 app.route('/delete/:id')
 .delete(UserAppointment.delete)



 app.route('/update/:id')
 .put(UserAppointment.update)

 app.route('/contact')
 .post(UserContact.getAllContact)

}

