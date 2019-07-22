import express from 'express';
import routes from './Src/Route/Userrouter'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
 
const app = express()
const PORT = 3000
 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tax-financial')
 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
 
routes(app)
 
app.listen(PORT, () => {
    console.log(`you are server is running on ${PORT}`);
})