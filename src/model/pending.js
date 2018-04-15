import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let PendingSchema = new Schema({

    pendingid: String,
    startdate: String,
    enddate: String,
    taskdescription: String,
    feedback: String,
    pendingon: String,
    status: String,
    taskid: String



});
module.exports = mongoose.model('Pending', PendingSchema);