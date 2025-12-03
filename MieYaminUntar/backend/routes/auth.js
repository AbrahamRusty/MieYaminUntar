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

// Simple in-memory nonces store for wallet login (dev only)
const nonces = new Map();

// Get or create a nonce for a wallet address
router.get('/wallet-nonce', async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) return res.status(400).json({ error: 'Address diperlukan' });

    const lower = address.toLowerCase();
    const nonce = (Math.floor(Math.random() * 1e9)).toString();
    // store with expiry (10 minutes)
    nonces.set(lower, { nonce, expiresAt: Date.now() + 10 * 60 * 1000 });

    res.json({ nonce });
  } catch (error) {
    console.error('wallet-nonce error:', error);
    res.status(500).json({ error: 'Gagal membuat nonce' });
  }
});

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

    // Verify stored nonce
    const lower = address.toLowerCase();
    const stored = nonces.get(lower);
    if (!stored || stored.nonce !== nonce || stored.expiresAt < Date.now()) {
      return res.status(400).json({ error: 'Nonce tidak valid atau kadaluarsa' });
    }

    // Verify signature
    const message = `Login to Mie Yamin Loyalty: ${nonce}`;
    let recoveredAddress;
    try {
      recoveredAddress = ethers.utils.verifyMessage(message, signature);
    } catch (e) {
      console.error('Signature verify error:', e);
      return res.status(400).json({ error: 'Signature tidak valid' });
    }

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(400).json({ error: 'Signature tidak valid' });
    }

    // consume nonce
    nonces.delete(lower);

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

// In-memory user store for when database is not connected
const inMemoryUsers = new Map();

// Create user endpoint for Thunder Client
router.post('/create-user', async (req, res) => {
  try {
    const { email, name, walletAddress, avatar, membershipTier } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: 'Email diperlukan' });
    }

    const mongoose = require('mongoose');

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      // Database not connected, use in-memory store
      const emailLower = email.toLowerCase();

      // Check if user already exists in memory
      if (inMemoryUsers.has(emailLower)) {
        return res.status(400).json({ error: 'User dengan email ini sudah ada' });
      }

      // Create new user in memory
      const newUser = {
        id: Date.now().toString(),
        email: emailLower,
        name,
        walletAddress: walletAddress ? walletAddress.toLowerCase() : undefined,
        avatar,
        membershipTier: membershipTier || 'none',
        isEmailVerified: false,
        createdAt: new Date()
      };

      inMemoryUsers.set(emailLower, newUser);

      return res.status(201).json({
        message: 'User berhasil dibuat (in-memory mode)',
        user: newUser
      });
    }

    // Database is connected, use normal operations
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User dengan email ini sudah ada' });
    }

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      name,
      walletAddress: walletAddress ? walletAddress.toLowerCase() : undefined,
      avatar,
      membershipTier: membershipTier || 'none',
      isEmailVerified: false,
      createdAt: new Date()
    });

    // Save to database
    await newUser.save();

    res.status(201).json({
      message: 'User berhasil dibuat',
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        walletAddress: newUser.walletAddress,
        membershipTier: newUser.membershipTier,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Gagal membuat user' });
  }
});

module.exports = router;
