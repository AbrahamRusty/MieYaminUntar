const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tier: {
    type: String,
    enum: ['silver', 'gold', 'platinum'],
    required: true
  },
  amount: {
    type: Number,
    required: true // Amount in IDRX
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'failed'],
    default: 'pending'
  },
  txHash: String,
  tokenId: Number, // NFT token ID after minting
  createdAt: {
    type: Date,
    default: Date.now
  },
  confirmedAt: Date
});

module.exports = mongoose.model('Order', orderSchema);
