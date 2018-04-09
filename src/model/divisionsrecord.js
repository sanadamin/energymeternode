import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let DivisionRecordSchema = new Schema({
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
        dateofupdate: String,
        updater: String,
        entityduedate: String
    }],
    entitieshistory: [{
        entityname: String,
        entityupdate: String,
        dateofupdate: String,
        updater: String,
        entityduedate: String
    }],
    relatedpr: { prnumber: String, prstatus: String },
    relatedpo: { ponumber: String, postatus: String },
    budgetline: String,
    budgetamount: String,
    actualbudget: String,
    updates: [{ value: String, dateofupdate: String, updater: String }],
    closedate: String,
    closestatus: String,
    closer: String



});
module.exports = mongoose.model('DivisionRecord', DivisionRecordSchema);