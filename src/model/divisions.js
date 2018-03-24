import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let DivisionSchema = new Schema({
    taskname: String,
    description: String,
    taskownmer: String,
    tasktype: String,
    project: String,
    thirdparties: String,
    duedate: Date,
    progress: String,
    taskdate: Date,
    notificationrec: [{name: String,email:String,token:String}],
    effectedentities: [{ entityname: String }],
    relatedpr: String,
    relatedpo: String,
    budgetline: String,
    budgetamount: String,
    actualbudget: String,
    updates: [{ value: String, dateofupdate: String, updater: String }]



});
module.exports = mongoose.model('Division', DivisionSchema);