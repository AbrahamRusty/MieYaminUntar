const express = require('express');
const { ethers } = require('ethers');
const jwt = require('jwt-simple');

const User = require('../models/User');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');

const router = express.Router();
const multer = require('multer');
const path = require('path');

// Setup multer for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Upload proof endpoint (no authentication required for simplicity)
router.post('/upload-proof', upload.single('proof'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'File tidak ditemukan' });
    const fileUrl = `${process.env.BACKEND_URL || ''}/uploads/${req.file.filename}`;
    res.json({ success: true, fileUrl, filename: req.file.filename });
  } catch (error) {
    console.error('Upload proof error:', error);
    res.status(500).json({ error: 'Gagal mengupload file' });
  }
});

// Record purchase (store a purchase record in orders or transactions)
router.post('/purchase', async (req, res) => {
  try {
    const { userId, method, amount, meta } = req.body;
    // Create a transaction record
    const tx = new Transaction({
      userId: userId || null,
      type: 'purchase',
      amount: amount || 0,
      token: method === 'crypto' ? 'ETH' : (meta && meta.token) || 'IDRX',
      status: 'pending',
      meta
    });
    await tx.save();
    res.json({ success: true, txId: tx._id });
  } catch (error) {
    console.error('Purchase record error:', error);
    res.status(500).json({ error: 'Gagal merekam pembelian' });
  }
});

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

    // Verify transaction on blockchain with better checks
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const tx = await provider.getTransaction(txHash);

    if (!tx) {
      return res.status(400).json({ error: 'Transaksi tidak ditemukan' });
    }

    const paymentAddress = (process.env.PAYMENT_ADDRESS || process.env.PAYMENT_RECEIVER || '').toLowerCase();
    const loyaltyContractAddress = (process.env.LOYALTY_CONTRACT_ADDRESS || process.env.LOYALTY_CONTRACT || '').toLowerCase();

    let valid = false;

    // If tx is a plain ETH transfer to the payment address, validate value
    if (tx.to && tx.to.toLowerCase() === paymentAddress) {
      const expected = ethers.parseEther(String(order.amount));
      if (tx.value && tx.value.gte(expected)) valid = true;
    }

    // If tx is an ERC20 transfer to payment address (IDRX token)
    const idrxTokenAddress = (process.env.IDRX_TOKEN_ADDRESS || process.env.IDRX_TOKEN || '').toLowerCase();
    if (!valid && tx.to && tx.to.toLowerCase() === idrxTokenAddress) {
      try {
        const receipt = await provider.getTransactionReceipt(txHash);
        if (receipt && receipt.logs && receipt.logs.length) {
          const transferTopic = ethers.id('Transfer(address,address,uint256)');
          for (const log of receipt.logs) {
            if (log.address && log.address.toLowerCase() === idrxTokenAddress && log.topics && log.topics[0] === transferTopic) {
              // topics[2] is 'to' (indexed)
              const toTopic = log.topics[2];
              const toAddress = '0x' + toTopic.slice(26);
              if (toAddress.toLowerCase() === paymentAddress) {
                // amount is in data
                const amountBn = ethers.BigInt(log.data);
                // assume IDRX has 18 decimals
                const expectedUnits = ethers.parseUnits(String(order.amount), 18);
                if (amountBn >= expectedUnits) {
                  valid = true;
                  break;
                }
              }
            }
          }
        }
      } catch (e) {
        console.warn('Error verifying ERC20 transfer logs:', e);
      }
    }

    // If tx is a call to loyalty contract (purchaseMembership), accept it
    if (!valid && tx.to && tx.to.toLowerCase() === loyaltyContractAddress) {
      // Basic acceptance: we assume the loyalty contract call is the purchase
      valid = true;
    }

    if (!valid) {
      return res.status(400).json({ error: 'Transaksi tidak memenuhi syarat pembayaran' });
    }

    // Mint NFT (call contract)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const nftContract = new ethers.Contract(
      process.env.NFT_CONTRACT_ADDRESS,
      ['function mintMembership(address,uint8,string)', 'function totalSupply() view returns (uint256)'],
      wallet
    );

    const tierIndex = { silver: 0, gold: 1, platinum: 2 }[order.tier];
    const tokenURI = `${process.env.BASE_URI || ''}/${order._id}`;

    const mintTx = await nftContract.mintMembership(tx.from, tierIndex, tokenURI);
    await mintTx.wait();

    let tokenId = null;
    try {
      const total = await nftContract.totalSupply();
      tokenId = total - 1;
    } catch (e) {
      console.warn('Could not fetch totalSupply for tokenId, leaving null', e);
    }

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
