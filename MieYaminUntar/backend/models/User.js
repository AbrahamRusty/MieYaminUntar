const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  googleId: String,
  walletAddress: {
    type: String,
    lowercase: true,
    sparse: true
  },
  name: String,
  avatar: String,
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  membershipTier: {
    type: String,
    enum: ['none', 'silver', 'gold', 'platinum'],
    default: 'none'
  },
  membershipTokenId: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
});

module.exports = mongoose.model('User', userSchema);
