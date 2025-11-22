const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const MenuCategorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  items: [MenuItemSchema]
});

const MenuSchema = new mongoose.Schema({
  categories: [MenuCategorySchema]
});

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
