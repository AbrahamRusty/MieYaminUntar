const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require('../models/Menu');

// GET /menus - get all menu categories and items
router.get('/menus', async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.json(menus.length ? menus[0].categories : []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu data', error });
  }
});

// POST /menus - add or replace menu data with single menu item
router.post('/menus', async (req, res) => {
  try {
    const { category, item } = req.body;
    if (!category || !item) {
      return res.status(400).json({ message: 'Category and item data are required' });
    }

    let menuDoc = await Menu.findOne({});
    if (!menuDoc) {
      // Create new menu document if none exists
      menuDoc = new Menu({ categories: [] });
    }

    // Find existing category
    const existingCatIndex = menuDoc.categories.findIndex(cat => cat.category === category);
    if (existingCatIndex === -1) {
      // Add new category and item
      menuDoc.categories.push({ category, items: [item] });
    } else {
      // Add item to existing category items
      menuDoc.categories[existingCatIndex].items.push(item);
    }

    await menuDoc.save();
    res.status(201).json(menuDoc);
  } catch (error) {
    res.status(500).json({ message: 'Error saving menu data', error });
  }
});

// PUT /menus/:itemId - update single menu item by id
router.put('/menus/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { category, updatedItem } = req.body;
    if (!category || !updatedItem) {
      return res.status(400).json({ message: 'Category and updated item data are required' });
    }

    let menuDoc = await Menu.findOne({});
    if (!menuDoc) {
      return res.status(404).json({ message: 'Menu not found'});
    }

    const cat = menuDoc.categories.find(cat => cat.category === category);
    if (!cat) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const itemIndex = cat.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Preserve original _id, update other fields
    cat.items[itemIndex] = { ...cat.items[itemIndex].toObject(), ...updatedItem, _id: cat.items[itemIndex]._id };
    await menuDoc.save();
    res.json(cat.items[itemIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item', error });
  }
});

// DELETE /menus/:itemId - delete single menu item by id
router.delete('/menus/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    let menuDoc = await Menu.findOne({});
    if (!menuDoc) {
      return res.status(404).json({ message: 'Menu not found'});
    }

    let found = false;
    for (const cat of menuDoc.categories) {
      const itemIndex = cat.items.findIndex(item => item._id.toString() === itemId);
      if (itemIndex !== -1) {
        cat.items.splice(itemIndex, 1);
        found = true;
        break;
      }
    }
    if (!found) {
      return res.status(404).json({ message: 'Item not found' });
    }
    await menuDoc.save();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error });
  }
});



module.exports = router;

// POST /menus - add or replace menu data
router.post('/menus', async (req, res) => {
  try {
    const { categories } = req.body;
    if (!categories) {
      return res.status(400).json({ message: 'Categories data is required' });
    }
    let menuDoc = await Menu.findOne({});
    if (menuDoc) {
      menuDoc.categories = categories;
      await menuDoc.save();
    } else {
      menuDoc = new Menu({ categories });
      await menuDoc.save();
    }
    res.status(201).json(menuDoc);
  } catch (error) {
    res.status(500).json({ message: 'Error saving menu data', error });
  }
});

// POST /menus/reset - reset menu data to fixed categories and items count
router.post('/menus/reset', async (req, res) => {
  try {
    const fixedCategories = [
      {
        category: "Mie",
        items: [
          { title: "Mie Goreng Spesial", description: "Mie goreng dengan bumbu spesial", price: "20000", imageUrl: "/menu/mie-goreng-spesial.png" },
          { title: "Mie Rebus Original", description: "Mie rebus dengan kuah kaldu", price: "18000", imageUrl: "/menu/mie-rebus-original.png" },
          { title: "Mie Ayam Jamur", description: "Mie ayam dengan tambahan jamur segar", price: "22000", imageUrl: "/menu/mie-ayam-jamur.png" },
          { title: "Mie Level 5 Pedas", description: "Mie dengan tingkat kepedasan level 5", price: "21000", imageUrl: "/menu/mie-level-5.png" },
          { title: "Mie Yamin Spesial", description: "Mie dengan bumbu yamin khas", price: "23000", imageUrl: "/menu/mie-yamin-spesial.png" }
        ]
      },
      {
        category: "Bihun",
        items: [
          { title: "Bihun Goreng Original", description: "Bihun goreng dengan bumbu sederhana", price: "19000", imageUrl: "/menu/bihun-goreng-original.png" },
          { title: "Bihun Rebus Kuah Kari", description: "Bihun rebus dengan kuah kari", price: "20000", imageUrl: "/menu/bihun-rebus-kari.png" },
          { title: "Bihun Seafood", description: "Bihun dengan campuran seafood segar", price: "25000", imageUrl: "/menu/bihun-seafood.png" },
          { title: "Bihun Level 5 Pedas", description: "Bihun pedas tingkat 5", price: "21000", imageUrl: "/menu/bihun-level-5.png" },
          { title: "Bihun Ayam Special", description: "Bihun dengan ayam spesial", price: "23000", imageUrl: "/menu/bihun-ayam-special.png" }
        ]
      },
      {
        category: "Kuetiaw",
        items: [
          { title: "Kuetiaw Goreng", description: "Kuetiaw goreng ala restoran", price: "20000", imageUrl: "/menu/kuetiaw-goreng.png" },
          { title: "Kuetiaw Rebus Original", description: "Kuetiaw rebus dengan kuah kaldu", price: "18000", imageUrl: "/menu/kuetiaw-rebus.png" },
          { title: "Kuetiaw Seafood", description: "Kuetiaw dengan campuran seafood", price: "27000", imageUrl: "/menu/kuetiaw-seafood.png" },
          { title: "Kuetiaw Level 5 Pedas", description: "Kuetiaw pedas level 5", price: "22000", imageUrl: "/menu/kuetiaw-level-5.png" },
          { title: "Kuetiaw Ayam Jamur", description: "Kuetiaw dengan ayam dan jamur", price: "24000", imageUrl: "/menu/kuetiaw-ayam-jamur.png" }
        ]
      },
      {
        category: "Toping",
        items: [
          { title: "Pangsit Goreng", description: "Pangsit goreng renyah", price: "10000", imageUrl: "/menu/pangsit-goreng.png" },
          { title: "Bakso Goreng", description: "Bakso goreng spesial", price: "12000", imageUrl: "/menu/bakso-goreng.png" },
          { title: "Telur Rebus", description: "Telur rebus dengan bumbu", price: "8000", imageUrl: "/menu/telur-rebus.png" },
          { title: "Sawi Rebus", description: "Sawi rebus segar", price: "7000", imageUrl: "/menu/sawi-rebus.png" }
        ]
      }
    ];

    // Remove any existing menu doc to reset completely
    await Menu.deleteMany({});

    // Insert new menu document with fixed categories
    const newMenu = new Menu({ categories: fixedCategories });
    await newMenu.save();

    res.status(201).json({ message: "Menu reset successfully", menu: newMenu });
  } catch (error) {
    res.status(500).json({ message: "Error resetting menu", error });
  }
});

