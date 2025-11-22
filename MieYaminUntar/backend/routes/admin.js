const express = require('express');
const User = require('../models/User');

const router = express.Router();

// GET /api/admin/users - Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-__v'); // Exclude __v field
    res.json(users);
  } catch (error) {
    // More detailed error logging
    console.error('Error fetching users:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to fetch users', detail: error.message });
  }
});

module.exports = router;
