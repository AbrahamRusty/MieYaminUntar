const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { _id: true });

const MenuSchema = new Schema({
  category: { type: String, required: true },
  items: [ItemSchema]
});

module.exports = mongoose.model('Menu', MenuSchema);
