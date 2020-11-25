const mongoose = require('mongoose');

const { Schema } = mongoose;

const custSchema = new Schema({
  cemail: { type: String, unique: true, DropDups: true },
  cpassword: { type: String },
  cname: { type: String },
  cphone: { type: Number },
  cabout: { type: String },
  cjoined: { type: Date, default: Date.now },
  cphoto: { type: String },
  cfavrest: { type: String },
  cfavcuisine: { type: String },
},
{
  versionKey: false,
});

const custModel = mongoose.model('customer', custSchema);
module.exports = custModel;