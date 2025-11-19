const express = require('express');
const router = express.Router();
// --- BARU: Import 'protect' yang sudah didefinisikan di middleware/passport.js ---
const { protect } = require('../middleware/passport'); 

// Import controller (impor seluruh objek controller lebih aman)
const authController = require('../controllers/authController'); 

// Endpoint: POST /api/auth/register
router.post('/register', authController.registerUser);

// Endpoint: POST /api/auth/login
router.post('/login', authController.loginUser);

// RUTE UPDATE PROFIL: PUT /api/auth/profile
// Rute ini memerlukan autentikasi (protect)
router.put('/profile', protect, authController.updateProfile); 

module.exports = router;