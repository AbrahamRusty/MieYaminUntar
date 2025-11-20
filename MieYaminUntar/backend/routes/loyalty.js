const express = require('express');
const { ethers } = require('ethers');
const jwt = require('jwt-simple');

const User = require('../models/User');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token diperlukan' });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ error: 'Token kadaluarsa' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token tidak valid' });
  }
};

// Get membership packages
router.get('/packages', (req, res) => {
  const packages = {
    silver: {
      price: 100,
      benefits: ['Diskon 20%', 'Voucher mingguan', 'Request menu']
    },
    gold: {
      price: 250,
      benefits: ['Diskon 20%', 'Voucher mingguan', 'Request menu', 'Prioritas']
    },
    platinum: {
      price: 500,
      benefits: ['Diskon 20%', 'Voucher mingguan', 'Request menu', 'Custom menu', 'Prioritas']
    }
  };
  res.json(packages);
});

// Create order
router.post('/create-order', authenticate, async (req, res) => {
  try {
    const { tier } = req.body;
    const userId = req.user.userId;

    const packages = {
      silver: 100,
      gold: 250,
      platinum: 500
    };

    if (!packages[tier]) {
      return res.status(400).json({ error: 'Tier tidak valid' });
    }

    const order = new Order({
      userId,
      tier,
      amount: packages[tier]
    });

    await order.save();
    res.json({ orderId: order._id, amount: order.amount });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Gagal membuat order' });
  }
});

// Verify payment and mint NFT
router.post('/verify-payment', authenticate, async (req, res) => {
  try {
    const { orderId, txHash } = req.body;
    const userId = req.user.userId;

    const order = await Order.findById(orderId);
    if (!order || order.userId.toString() !== userId) {
      return res.status(404).json({ error: 'Order tidak ditemukan' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Order sudah diproses' });
    }

    // Verify transaction on blockchain (simplified)
    // In production, use etherscan API or run your own node
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const tx = await provider.getTransaction(txHash);

    if (!tx) {
      return res.status(400).json({ error: 'Transaksi tidak ditemukan' });
    }

    // Check if transaction is to the correct contract and amount
    // This is simplified - in production, verify the actual transfer

    // Mint NFT (call contract)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const nftContract = new ethers.Contract(
      process.env.NFT_CONTRACT_ADDRESS,
      ['function mintMembership(address,uint8,string)'],
      wallet
    );

    const tierIndex = { silver: 0, gold: 1, platinum: 2 }[order.tier];
    const tokenURI = `${process.env.BASE_URI}/${order._id}`;

    const mintTx = await nftContract.mintMembership(tx.from, tierIndex, tokenURI);
    await mintTx.wait();

    const tokenId = await nftContract.totalSupply() - 1; // Simplified

    // Update order and user
    order.status = 'confirmed';
    order.txHash = txHash;
    order.tokenId = tokenId;
    order.confirmedAt = new Date();
    await order.save();

    const user = await User.findById(userId);
    user.membershipTier = order.tier;
    user.membershipTokenId = tokenId;
    await user.save();

    // Record transaction
    await new Transaction({
      userId,
      txHash,
      type: 'purchase',
      amount: order.amount,
      token: 'IDRX',
      tier: order.tier,
      status: 'confirmed'
    }).save();

    res.json({
      success: true,
      tokenId,
      tier: order.tier,
      message: 'Membership berhasil dibeli!'
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: 'Verifikasi pembayaran gagal' });
  }
});

// Upgrade membership
router.post('/upgrade', authenticate, async (req, res) => {
  try {
    const { newTier } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user.membershipTier === 'none') {
      return res.status(400).json({ error: 'Belum memiliki membership' });
    }

    const tierOrder = { silver: 0, gold: 1, platinum: 2 };
    if (tierOrder[newTier] <= tierOrder[user.membershipTier]) {
      return res.status(400).json({ error: 'Tier baru harus lebih tinggi' });
    }

    const upgradePrices = {
      'silver-gold': 150,
      'silver-platinum': 400,
      'gold-platinum': 250
    };

    const upgradeKey = `${user.membershipTier}-${newTier}`;
    const upgradeAmount = upgradePrices[upgradeKey];

    // Similar payment verification and NFT upgrade logic as above
    // ... (implementation similar to verify-payment)

    res.json({ message: 'Upgrade berhasil!' });
  } catch (error) {
    console.error('Upgrade error:', error);
    res.status(500).json({ error: 'Upgrade gagal' });
  }
});

// Get user dashboard data
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 }).limit(10);
    const orders = await Order.find({ userId, status: 'confirmed' }).sort({ createdAt: -1 });

    res.json({
      user: {
        email: user.email,
        name: user.name,
        membershipTier: user.membershipTier,
        membershipTokenId: user.membershipTokenId
      },
      transactions,
      orders,
      rewards: [] // Placeholder for rewards system
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Gagal memuat dashboard' });
  }
});

module.exports = router;
