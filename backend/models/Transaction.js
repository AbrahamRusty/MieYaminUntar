const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  txHash: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['purchase', 'upgrade', 'reward'],
    required: true
  },
  amount: {
    type: Number,
    required: true // Amount in IDRX or reward points
  },
  token: {
    type: String,
    enum: ['IDRX', 'points'],
    default: 'IDRX'
  },
  tier: {
    type: String,
    enum: ['silver', 'gold', 'platinum']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'failed'],
    default: 'pending'
  },
  blockNumber: Number,
  gasUsed: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
