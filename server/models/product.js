const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  id: Number,
  name: String,
  job: String
});

module.exports = model('Product', ProductSchema);
