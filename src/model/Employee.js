import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let EmpSchema = new Schema({
  empname: String,
  empusername: String,
  emppassword: String,
  emplat: String,
  emplong:String,
  empregtoken:String




});
module.exports = mongoose.model('Employee',EmpSchema);
