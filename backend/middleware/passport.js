const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken'); 

// ... (Serialize user, Deserialize user, Google OAuth Strategy tetap sama)

// FUNGSI protect: Middleware untuk memverifikasi Token JWT
const protect = async (req, res, next) => {
    let token;

    // 1. Cek token di header Authorization (Format: Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // 2. Verifikasi token menggunakan secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Ambil data user dari database (kecuali password) dan lampirkan ke req.user
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Token tidak valid, user tidak ditemukan.' });
            }

            next(); 
            return; // ⬅️ PERBAIKAN KRITIS: Hentikan eksekusi setelah memanggil next()
        } catch (error) {
            console.error("JWT Verification Error:", error.message);
            // Jika token tidak valid, expired, atau gagal diverifikasi
            return res.status(401).json({ message: 'Tidak terotentikasi, token gagal atau kadaluarsa.' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Tidak terotentikasi, tidak ada token.' });
    }
};


// --- PERUBAHAN EXPORT: Export passport DAN protect ---
module.exports = { passport, protect };