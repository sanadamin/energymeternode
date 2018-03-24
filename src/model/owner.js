import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let OwnerSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    auth: String,
    fcmtoken: String
});
module.exports = mongoose.model('Owner', OwnerSchema);