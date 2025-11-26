const express = require('express');
const router = express.Router();
const Menu = require('../models/Menus');

// Get all menu categories and items
router.get('/', async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new category
router.post('/category', async (req, res) => {
  const { category, items } = req.body;
  const newCategory = new Menu({ category, items });
  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add new item to a category
router.post('/:categoryId/item', async (req, res) => {
  const { categoryId } = req.params;
  const { title, description, price, imageUrl } = req.body;
  try {
    const category = await Menu.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const newItem = { title, description, price, imageUrl };
    category.items.push(newItem);
    await category.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an item by category id and item id
router.put('/:categoryId/item/:itemId', async (req, res) => {
  const { categoryId, itemId } = req.params;
  const { title, description, price, imageUrl } = req.body;
  try {
    const category = await Menu.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    const item = category.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.title = title ?? item.title;
    item.description = description ?? item.description;
    item.price = price ?? item.price;
    item.imageUrl = imageUrl ?? item.imageUrl;

    await category.save();
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an item by category id and item id
router.delete('/:categoryId/item/:itemId', async (req, res) => {
  const { categoryId, itemId } = req.params;
  try {
    const category = await Menu.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    const item = category.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.remove();
    await category.save();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
