module.exports = function(app) {
	var userData = require('../controller/UserController');

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




app.route('/appt')
.post(userData.Appointments)
.get(userData.getAllAppointment)

app.route('/edit')
.post(userData.getAllAppointmentedit)
};
