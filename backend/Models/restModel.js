const mongoose = require('mongoose');

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const restSchema = new Schema({
  remail: { type: String, unique: true, DropDups: true },
  rpassword: { type: String },
  rname: { type: String },
  rphone: { type: String },
  rabout: { type: String },
  rphoto: [{ type: String }],
  rlatitude: { type: Number },
  rlongitude: { type: Number },
  raddress: { type: String },
  rcuisine: { type: String },
  rdelivery: {
    type: String,
    enum: ['Curbside pickup', 'Yelp Delivery', 'Dine In'],
    default: 'Curbside pickup',
  },
  rrating: { type: Number, default: 0 },
},
{
  versionKey: false,
});

const restModel = mongoose.model('restaurant', restSchema);
module.exports = restModel;