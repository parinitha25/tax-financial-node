import mongoose from 'mongoose'
import resturantSchema from '../models/resturantModel'
 
const Resturant = mongoose.model('Resturant', resturantSchema)
exports.createResturant = function(req, res) {
    var new_data = new Resturant(req.body);
    new_data.save(function(err, data) {
    if (err)
    res.send(err);
     res.json(data);
    });
};