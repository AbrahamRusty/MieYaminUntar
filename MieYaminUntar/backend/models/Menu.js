const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['mie', 'bihun', 'kuetiaw', 'topping', 'minuman']
  },
  image: String,
  isAvailable: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  ingredients: [{
    type: String
  }],
  nutritionalInfo: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  preparationTime: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
menuSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Menu', menuSchema);
