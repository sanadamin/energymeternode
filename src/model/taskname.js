import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let ActionSchema = new Schema({
    actionname: string,
});
module.exports = mongoose.model('Action', ActionSchema);