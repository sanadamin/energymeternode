import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let TaskSchema = new Schema({
  tasklat:String,
  tasklong:String,
  sitename: String,
  taskname: String,
  taskcat: String,
  taskassignedto: String,
  taskdate:String,
  taskstarttime: String,
  taskarivaltime:String,
  acknowledge : String,
  charging : String






});
module.exports = mongoose.model('Task',TaskSchema);
