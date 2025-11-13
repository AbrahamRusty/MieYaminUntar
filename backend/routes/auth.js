const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const crypto = require('crypto');
const passport = require('passport');
const { ethers } = require('ethers');

const User = require('../models/User');
const OTP = require('../models/OTP');
const { sendOTP } = require('../utils/email');

const router = express.Router();

// Generate JWT token
const generateToken = (user) => {
  return jwt.encode({
    userId: user._id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  }, process.env.JWT_SECRET);
};

// Request OTP
router.post('/otp/request', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email diperlukan' });
    }

    // Check rate limit (1 request per minute)
    const recentOTP = await OTP.findOne({
      email,
      createdAt: { $gte: new Date(Date.now() - 60 * 1000) }
    });

    if (recentOTP) {
      return res.status(429).json({ error: 'Terlalu banyak permintaan. Coba lagi nanti.' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    // Save OTP
    await OTP.findOneAndDelete({ email }); // Remove existing
    await new OTP({
      email,
      otpHash,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    }).save();

    // Send email
    await sendOTP(email, otp);

    res.json({ message: 'OTP dikirim ke email Anda' });
  } catch (error) {
    console.error('OTP request error:', error);
    res.status(500).json({ error: 'Gagal mengirim OTP' });
  }
});

// Verify OTP
router.post('/otp/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpDoc = await OTP.findOne({ email });
    if (!otpDoc) {
      return res.status(400).json({ error: 'OTP tidak valid' });
    }

    if (otpDoc.attempts >= 3) {
      return res.status(400).json({ error: 'Terlalu banyak percobaan' });
    }

    if (otpDoc.expiresAt < new Date()) {
      return res.status(400).json({ error: 'OTP kadaluarsa' });
    }

    const isValid = await bcrypt.compare(otp, otpDoc.otpHash);
    if (!isValid) {
      otpDoc.attempts += 1;
      await otpDoc.save();
      return res.status(400).json({ error: 'OTP tidak valid' });
    }

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, isEmailVerified: true });
      await user.save();
    } else {
      user.isEmailVerified = true;
      user.lastLogin = new Date();
      await user.save();
    }

    // Clean up OTP
    await OTP.findOneAndDelete({ email });

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        membershipTier: user.membershipTier
      }
    });
  } catch (error) {
    console.error('OTP verify error:', error);
    res.status(500).json({ error: 'Verifikasi gagal' });
  }
});

// Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

// Wallet login
router.post('/wallet-login', async (req, res) => {
  try {
    const { address, signature, nonce } = req.body;

    if (!ethers.utils.isAddress(address)) {
      return res.status(400).json({ error: 'Alamat wallet tidak valid' });
    }

    // Verify signature
    const message = `Login to Mie Yamin Loyalty: ${nonce}`;
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(400).json({ error: 'Signature tidak valid' });
    }

    // Find or create user
    let user = await User.findOne({ walletAddress: address.toLowerCase() });
    if (!user) {
      user = new User({
        walletAddress: address.toLowerCase(),
        name: `Wallet ${address.slice(0, 6)}...${address.slice(-4)}`
      });
      await user.save();
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        walletAddress: user.walletAddress,
        name: user.name,
        membershipTier: user.membershipTier
      }
    });
  } catch (error) {
    console.error('Wallet login error:', error);
    res.status(500).json({ error: 'Login wallet gagal' });
  }
});

module.exports = router;
