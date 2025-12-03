const express = require('express');
const multer = require('multer');
const path = require('path');
const Menu = require('../models/Menu');

const router = express.Router();

// Setup multer for menu image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads', 'menu'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// GET /api/menu - Get all menu items
router.get('/', async (req, res) => {
  try {
    const { category, available, popular, limit = 50, skip = 0 } = req.query;

    // Build query
    const query = {};
    if (category) {
      query.category = category;
    }
    if (available !== undefined) {
      query.isAvailable = available === 'true';
    }
    if (popular !== undefined) {
      query.isPopular = popular === 'true';
    }

    const total = await Menu.countDocuments(query);
    const menus = await Menu.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: menus,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: parseInt(skip) + parseInt(limit) < total
      }
    });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({ error: 'Gagal mengambil menu' });
  }
});

// GET /api/menu/:id - Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu tidak ditemukan' });
    }

    res.json({ success: true, data: menu });
  } catch (error) {
    console.error('Get menu by ID error:', error);
    res.status(500).json({ error: 'Gagal mengambil menu' });
  }
});

// POST /api/menu - Create new menu item(s)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Handle body parsing - sometimes Thunder Client sends JSON as string
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON format' });
      }
    }

    // Check if body is an array (bulk insert) or single object
    const isArray = Array.isArray(body);
    const menuData = isArray ? body : [body];

    // Handle image upload (only for single item)
    let imageUrl = null;
    if (req.file && !isArray) {
      imageUrl = `${process.env.BACKEND_URL || ''}/uploads/menu/${req.file.filename}`;
    }

    const createdMenus = [];

    for (const item of menuData) {
      const { _id, name, description, price, category, isAvailable, isPopular, ingredients, nutritionalInfo, preparationTime, image } = item;

      // Validate required fields
      if (!name || !price || !category) {
        return res.status(400).json({ error: 'Nama, harga, dan kategori diperlukan untuk semua item' });
      }

      // Create menu using MongoDB model
      const newMenu = new Menu({
        _id: _id || undefined, // Let MongoDB generate if not provided
        name,
        description,
        price: parseFloat(price),
        category,
        image: image || imageUrl,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        isPopular: isPopular || false,
        ingredients: ingredients ? (Array.isArray(ingredients) ? ingredients : ingredients.split(',').map(i => i.trim())) : [],
        nutritionalInfo: nutritionalInfo ? (typeof nutritionalInfo === 'string' ? JSON.parse(nutritionalInfo) : nutritionalInfo) : {},
        preparationTime: preparationTime ? parseInt(preparationTime) : null
      });

      const savedMenu = await newMenu.save();
      createdMenus.push(savedMenu);
    }

    res.status(201).json({
      success: true,
      message: isArray ? `Berhasil membuat ${createdMenus.length} menu` : 'Menu berhasil dibuat',
      data: isArray ? createdMenus : createdMenus[0]
    });
  } catch (error) {
    console.error('Create menu error:', error);
    res.status(500).json({ error: 'Gagal membuat menu' });
  }
});

// PUT /api/menu/:id - Update menu item
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, isAvailable, isPopular, ingredients, nutritionalInfo, preparationTime } = req.body;

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      imageUrl = `${process.env.BACKEND_URL || ''}/uploads/menu/${req.file.filename}`;
    }

    // Find and update menu
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu tidak ditemukan' });
    }

    // Update fields
    if (name !== undefined) menu.name = name;
    if (description !== undefined) menu.description = description;
    if (price !== undefined) menu.price = parseFloat(price);
    if (category !== undefined) menu.category = category;
    if (imageUrl) menu.image = imageUrl;
    if (isAvailable !== undefined) menu.isAvailable = isAvailable === 'true';
    if (isPopular !== undefined) menu.isPopular = isPopular === 'true';
    if (ingredients !== undefined) {
      menu.ingredients = Array.isArray(ingredients) ? ingredients : ingredients.split(',').map(i => i.trim());
    }
    if (nutritionalInfo !== undefined) {
      menu.nutritionalInfo = typeof nutritionalInfo === 'string' ? JSON.parse(nutritionalInfo) : nutritionalInfo;
    }
    if (preparationTime !== undefined) menu.preparationTime = parseInt(preparationTime);

    const updatedMenu = await menu.save();

    res.json({
      success: true,
      message: 'Menu berhasil diperbarui',
      data: updatedMenu
    });
  } catch (error) {
    console.error('Update menu error:', error);
    res.status(500).json({ error: 'Gagal memperbarui menu' });
  }
});

// DELETE /api/menu/:id - Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedMenu) {
      return res.status(404).json({ error: 'Menu tidak ditemukan' });
    }

    res.json({
      success: true,
      message: 'Menu berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete menu error:', error);
    res.status(500).json({ error: 'Gagal menghapus menu' });
  }
});

// GET /api/menu/categories - Get all categories
router.get('/categories', (req, res) => {
  const categories = [
    { id: 'mie', name: 'Mie', description: 'Berbagai jenis mie' },
    { id: 'bihun', name: 'Bihun', description: 'Berbagai jenis bihun' },
    { id: 'kuetiaw', name: 'Kuetiaw', description: 'Berbagai jenis kuetiaw' },
    { id: 'topping', name: 'Topping', description: 'Pelengkap dan topping' },
    { id: 'minuman', name: 'Minuman', description: 'Minuman dan es' }
  ];

  res.json({ success: true, data: categories });
});

module.exports = router;
