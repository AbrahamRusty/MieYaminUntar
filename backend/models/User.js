const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Untuk mengenkripsi password

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    // BARU: Tambahkan field address
    address: { type: String, default: '' },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Middleware untuk mengenkripsi password sebelum disimpan (biarkan tetap sama)
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);