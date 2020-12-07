const mongoose = require('mongoose');

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const reviewSchema = new Schema({
  retext: { type: String },
  rerating: { type: Number },
  rdate: { type: String },
  cid: { type: String },
  rid: { type: String },
},
{
  versionKey: false,
});

const reviewModel = mongoose.model('review', reviewSchema);
module.exports = reviewModel;
