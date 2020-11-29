const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  id: Number,
  name: String,
  job: String,
  imageBase64:String
});

module.exports = model('Product', ProductSchema);
