import mongoose from 'mongoose'
 
const Schema = mongoose.Schema
 
const DownloadSchema = new Schema({
    Name: {
        type: String,
        required: 'First Name required'
    },
    Email: {
        type: String,
        required: 'Email required',
        unique: true,
        match:/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,10})$/        
    },
    Password: {
        type: String,
        required: 'valid Password required',
        match: /(?=.*[a-zA-Z0-9]).*/
    }
})
 
export default DownloadSchema;