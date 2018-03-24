import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let TaskSchema = new Schema({
  sitename: String,
  taskname: String,
  taskcat: String,
  taskassignedto: String,
  taskdate:String,
  taskstarttime: String,
  acknowledge : String,
  acknowledgetime: String,
  description: String,
  closingtime:String,
  approvedby:String,
  approvedtime:String






});
module.exports = mongoose.model('TaskApproval',TaskSchema);
