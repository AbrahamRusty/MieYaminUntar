const mongoose = require('mongoose');

const foodOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    menuId: {
      type: String,
      ref: 'Menu',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    notes: String, // Special instructions for the item
    category: String
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'qris', 'bank_transfer', 'idrxtoken'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  deliveryAddress: {
    street: String,
    city: String,
    postalCode: String,
    notes: String
  },
  phoneNumber: String,
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  specialInstructions: String,
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
foodOrderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Calculate total amount from items
foodOrderSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    this.totalAmount = this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  next();
});

module.exports = mongoose.model('FoodOrder', foodOrderSchema);
