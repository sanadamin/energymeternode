import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let OwnerDivisionSchema = new Schema({
    name: String,
    group: [{ employee: String, email: String }]



});
module.exports = mongoose.model('OwnerDivision', OwnerDivisionSchema);