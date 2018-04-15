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
    notificationrec: [{ name: String, email: String, token: String }],
    effectedentities: [{
        entityname: String,
        entityupdate: String,
        entityduedate: String,
        dateofupdate: String,
        updater: String
    }],
    entitieshistory: [{
        entityname: String,
        entityupdate: String,
        dateofupdate: String,
        entityduedate: String,
        updater: String
    }],
    relatedpr: { prnumber: String, prstatus: String },
    relatedpo: { ponumber: String, postatus: String },
    budgetline: String,
    budgetamount: String,
    actualbudget: String,
    updates: [{ value: String, dateofupdate: String, updater: String }],
    pending: [{
        pendingon: String,
        startdate: String,
        enddate: String,
        subtask: String,
        feedback: String
    }]



});
module.exports = mongoose.model('Division', DivisionSchema);