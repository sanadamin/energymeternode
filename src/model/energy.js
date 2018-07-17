import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Energy = new Schema({
    energy: { reading: String, timestamp: String },
    voltage: { reading: String, timestamp: String }
});



module.exports = mongoose.model('Energy', Energy);