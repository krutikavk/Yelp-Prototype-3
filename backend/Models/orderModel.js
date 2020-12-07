const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  cid: { type: String },
  rid: { type: String },
  ooption: {
    type: String,
    enum: ['Pickup', 'Delivery', 'Dine In'],
    default: 'Pickup',
  },
  ostatus: {
    type: String,
    enum: ['Order received', 'Preparing', 'Pickup ready', 'Picked up', 'On the way', 'Delivered'],
    default: 'Order received',
  },
  otype: {
    type: String,
    enum: ['New', 'Picked up', 'Delivered', 'Cancelled'],
    default: 'New',
  },
  otime: Date,
  oaddress: String,
},
{
  versionKey: false,
});

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;
