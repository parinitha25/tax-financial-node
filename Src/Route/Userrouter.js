import { Login,userSignup } from '../Controller/Usercontroller'

const routes = (app) => {
// to registor
app.route('/signup')
.post(userSignup)
.get(userSignup)
// to login 
app.route('/login')
.post(Login)  
.get(Login)  
}
export default routes;