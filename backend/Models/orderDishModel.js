const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderDishSchema = new Schema({
  oid: { type: String },
  did: { type: String },
  dname: { type: String },
  dquantity: { type: Number },
  dprice: { type: Number },
},
{
  versionKey: false,
});

const orderDishModel = mongoose.model('orderDish', orderDishSchema);
module.exports = orderDishModel;
