const mongoose = require('mongoose');

const { Schema } = mongoose;

const dishSchema = new Schema({
  rid: String,
  dname: String,
  dingredients: String,
  dprice: Number,
  dcategory: {
    type: String,
    enum: ['Appetizer', 'Salad', 'Main Course', 'Dessert', 'Beverage'],
    default: 'Main Course',
  },
  durl: {
    type: String,
    enum: ['Appetizer', 'Salad', 'Main Course', 'Dessert', 'Beverage'],
    default: 'Main Course',
  },
},
{
  versionKey: false,
});

const dishModel = mongoose.model('dish', dishSchema);
module.exports = dishModel;
