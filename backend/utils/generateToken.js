// backend/utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // Pastikan environment variables (JWT_SECRET, JWT_LIFETIME) dimuat di server utama (server.js)
    return jwt.sign(
        { id }, // Payload: Data yang disimpan di token (ID Pengguna)
        process.env.JWT_SECRET, // Secret Key dari .env
        {
            expiresIn: process.env.JWT_LIFETIME || '30d', // Masa berlaku default 30 hari
        }
    );
};

module.exports = generateToken;