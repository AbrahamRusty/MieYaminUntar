const express = require('express');
const User = require('../models/User');
const FoodOrder = require('../models/FoodOrder');
const Menu = require('../models/Menu');

const router = express.Router();

// Middleware to check if user is admin (you can implement proper admin authentication later)
const isAdmin = (req, res, next) => {
  // For now, allow all requests. In production, implement proper admin authentication
  next();
};

// USER MANAGEMENT ROUTES

// GET /api/admin/users - Get all users
router.get('/users', isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-__v')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json({
      success: true,
      data: users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Gagal mengambil data pengguna' });
  }
});

// GET /api/admin/users/:id - Get single user
router.get('/users/:id', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ error: 'Gagal mengambil data pengguna' });
  }
});

// PUT /api/admin/users/:id - Update user
router.put('/users/:id', isAdmin, async (req, res) => {
  try {
    const { name, email, membershipTier, isEmailVerified } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    // Update fields
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (membershipTier !== undefined) user.membershipTier = membershipTier;
    if (isEmailVerified !== undefined) user.isEmailVerified = isEmailVerified;

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: 'Pengguna berhasil diperbarui',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Gagal memperbarui pengguna' });
  }
});

// DELETE /api/admin/users/:id - Delete user
router.delete('/users/:id', isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    res.json({
      success: true,
      message: 'Pengguna berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Gagal menghapus pengguna' });
  }
});

// MENU MANAGEMENT ROUTES (using existing menu routes, but adding admin-specific endpoints)

// GET /api/admin/menus - Get all menus for admin
router.get('/menus', isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, category, search } = req.query;

    const query = {};
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Menu.countDocuments(query);
    const menus = await Menu.find(query)
      .select('-__v')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json({
      success: true,
      data: menus,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get menus error:', error);
    res.status(500).json({ error: 'Gagal mengambil data menu' });
  }
});

// ORDERS MANAGEMENT ROUTES

// GET /api/admin/orders - Get all orders
router.get('/orders', isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const query = {};
    if (status) query.status = status;
    if (search) {
      // Search by order ID or customer name
      query.$or = [
        { _id: search },
        { 'userId.name': { $regex: search, $options: 'i' } },
        { 'userId.email': { $regex: search, $options: 'i' } }
      ];
    }

    const total = await FoodOrder.countDocuments(query);
    const orders = await FoodOrder.find(query)
      .populate('userId', 'name email')
      .select('-__v')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Gagal mengambil data pesanan' });
  }
});

// GET /api/admin/orders/:id - Get single order
router.get('/orders/:id', isAdmin, async (req, res) => {
  try {
    const order = await FoodOrder.findById(req.params.id)
      .populate('userId', 'name email walletAddress')
      .select('-__v');

    if (!order) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ error: 'Gagal mengambil data pesanan' });
  }
});

// PUT /api/admin/orders/:id - Update order status
router.put('/orders/:id', isAdmin, async (req, res) => {
  try {
    const { status, paymentStatus, specialInstructions } = req.body;

    const order = await FoodOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
    }

    // Update fields
    if (status !== undefined) {
      order.status = status;
      if (status === 'delivered' && !order.actualDeliveryTime) {
        order.actualDeliveryTime = new Date();
      }
    }
    if (paymentStatus !== undefined) order.paymentStatus = paymentStatus;
    if (specialInstructions !== undefined) order.specialInstructions = specialInstructions;

    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: 'Pesanan berhasil diperbarui',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ error: 'Gagal memperbarui pesanan' });
  }
});

// DELETE /api/admin/orders/:id - Delete order
router.delete('/orders/:id', isAdmin, async (req, res) => {
  try {
    const deletedOrder = await FoodOrder.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
    }

    res.json({
      success: true,
      message: 'Pesanan berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ error: 'Gagal menghapus pesanan' });
  }
});

// DASHBOARD STATS

// GET /api/admin/stats - Get dashboard statistics
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const [
      totalUsers,
      totalOrders,
      totalMenus,
      pendingOrders,
      completedOrders,
      totalRevenue
    ] = await Promise.all([
      User.countDocuments(),
      FoodOrder.countDocuments(),
      Menu.countDocuments(),
      FoodOrder.countDocuments({ status: 'pending' }),
      FoodOrder.countDocuments({ status: 'delivered' }),
      FoodOrder.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ])
    ]);

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    res.json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalMenus,
        pendingOrders,
        completedOrders,
        totalRevenue: revenue
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Gagal mengambil statistik' });
  }
});

module.exports = router;
