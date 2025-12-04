const express = require('express');
const FoodOrder = require('../models/FoodOrder');
const Menu = require('../models/Menu');
const User = require('../models/User');

const router = express.Router();

// Middleware to check if user is authenticated (you can implement this based on your auth system)
const requireAuth = (req, res, next) => {
  // For now, we'll assume userId is passed in the request body or headers
  // You should implement proper authentication middleware
  if (!req.body.userId && !req.headers.userid) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  req.userId = req.body.userId || req.headers.userid;
  next();
};

// GET /api/food-orders - Get all food orders (admin)
router.get('/', async (req, res) => {
  try {
    const { status, userId, limit = 50, skip = 0 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (userId) query.userId = userId;

    const total = await FoodOrder.countDocuments(query);
    const orders = await FoodOrder.find(query)
      .populate('userId', 'name email')
      .populate('items.menuId', 'name category')
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: parseInt(skip) + parseInt(limit) < total
      }
    });
  } catch (error) {
    console.error('Get food orders error:', error);
    res.status(500).json({ error: 'Gagal mengambil pesanan' });
  }
});

// GET /api/food-orders/:id - Get single food order
router.get('/:id', async (req, res) => {
  try {
    const order = await FoodOrder.findById(req.params.id)
      .populate('userId', 'name email phoneNumber')
      .populate('items.menuId', 'name category price image');

    if (!order) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Get food order by ID error:', error);
    res.status(500).json({ error: 'Gagal mengambil pesanan' });
  }
});

// GET /api/food-orders/user/:userId - Get orders for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await FoodOrder.find({ userId: req.params.userId })
      .populate('items.menuId', 'name category price image')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Get user food orders error:', error);
    res.status(500).json({ error: 'Gagal mengambil pesanan pengguna' });
  }
});

// POST /api/food-orders - Create new food order
router.post('/', requireAuth, async (req, res) => {
  try {
    const {
      items,
      paymentMethod,
      deliveryAddress,
      phoneNumber,
      specialInstructions
    } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items pesanan diperlukan' });
    }
    if (!paymentMethod) {
      return res.status(400).json({ error: 'Metode pembayaran diperlukan' });
    }

    // Validate and enrich items with menu data
    const enrichedItems = [];
    for (const item of items) {
      if (!item.menuId || !item.quantity) {
        return res.status(400).json({ error: 'Menu ID dan quantity diperlukan untuk setiap item' });
      }

      // Get menu details
      const menu = await Menu.findById(item.menuId);
      if (!menu) {
        return res.status(404).json({ error: `Menu dengan ID ${item.menuId} tidak ditemukan` });
      }

      enrichedItems.push({
        menuId: item.menuId,
        name: menu.name,
        price: menu.price,
        quantity: item.quantity,
        notes: item.notes,
        category: menu.category
      });
    }

    // Calculate total amount
    const totalAmount = enrichedItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Create the order
    const newOrder = new FoodOrder({
      userId: req.userId,
      items: enrichedItems,
      totalAmount,
      paymentMethod,
      deliveryAddress,
      phoneNumber,
      specialInstructions,
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
    });

    const savedOrder = await newOrder.save();
    const populatedOrder = await FoodOrder.findById(savedOrder._id)
      .populate('userId', 'name email')
      .populate('items.menuId', 'name category price image');

    res.status(201).json({
      success: true,
      message: 'Pesanan berhasil dibuat',
      data: populatedOrder
    });
  } catch (error) {
    console.error('Create food order error:', error);
    res.status(500).json({ error: 'Gagal membuat pesanan' });
  }
});

// PUT /api/food-orders/:id - Update food order status
router.put('/:id', async (req, res) => {
  try {
    const { status, paymentStatus, estimatedDeliveryTime, actualDeliveryTime } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (estimatedDeliveryTime) updateData.estimatedDeliveryTime = new Date(estimatedDeliveryTime);
    if (actualDeliveryTime) updateData.actualDeliveryTime = new Date(actualDeliveryTime);

    const updatedOrder = await FoodOrder.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate('userId', 'name email')
      .populate('items.menuId', 'name category price image');

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
    }

    res.json({
      success: true,
      message: 'Pesanan berhasil diperbarui',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Update food order error:', error);
    res.status(500).json({ error: 'Gagal memperbarui pesanan' });
  }
});

// DELETE /api/food-orders/:id - Cancel food order
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const order = await FoodOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
    }

    // Check if user owns the order or is admin
    if (order.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Tidak memiliki akses untuk membatalkan pesanan ini' });
    }

    // Only allow cancellation if order is still pending
    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Pesanan tidak dapat dibatalkan karena sudah diproses' });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({
      success: true,
      message: 'Pesanan berhasil dibatalkan'
    });
  } catch (error) {
    console.error('Cancel food order error:', error);
    res.status(500).json({ error: 'Gagal membatalkan pesanan' });
  }
});

module.exports = router;
