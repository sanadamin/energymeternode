import mongoose from 'mongoose';
import FoodTruck from './foodtruck';
let Schema = mongoose.Schema;

let SitesSchema = new Schema({
  sitename: String,
  siteid: String,
  coordinates:{
    lat: String,
    long:String
  },
  sitetype:String

});

module.exports = mongoose.model('Site',SitesSchema);
