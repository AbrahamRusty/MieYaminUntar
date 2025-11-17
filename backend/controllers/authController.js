const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const generateToken = require('../utils/generateToken'); 

// Fungsi yang sudah ada untuk pendaftaran
const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    // 1. Validasi input sederhana (bisa diperluas)
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'Mohon lengkapi semua field.' });
    }

    try {
        // 2. Cek apakah pengguna sudah terdaftar
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email sudah terdaftar.' });
        }

        // 3. Buat pengguna baru
        user = new User({ name, email, phone, password });

        await user.save();

        // 4. Kirim respons berhasil
        res.status(201).json({ 
            message: 'Pendaftaran berhasil!',
            userId: user._id
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Fungsi BARU untuk login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Mohon lengkapi email dan kata sandi.' });
    }

    try {
        // 1. Cek User berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Kombinasi email dan password salah.' });
        }

        // 2. Bandingkan Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Kombinasi email dan password salah.' });
        }

        // 3. Login Berhasil & Buat Token JWT
        const token = generateToken(user._id);

        res.status(200).json({
            message: 'Login berhasil!',
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address, // Tambahkan address agar terbawa ke frontend
            token, 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// FUNGSI BARU: Update Profile
const updateProfile = async (req, res) => {
    // req.user berasal dari middleware 'protect'
    const userId = req.user._id; 
    const { name, phone, address, password } = req.body;

    try {
        const updateFields = {};
        
        // 1. Isi objek updateFields hanya dengan data yang ada di payload
        if (name !== undefined) updateFields.name = name;
        if (phone !== undefined) updateFields.phone = phone;
        if (address !== undefined) updateFields.address = address;

        // 2. Handle Password Update (Hanya jika password diisi di frontend)
        if (password) {
            // Enkripsi password baru sebelum update
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }

        // 3. Lakukan update menggunakan findByIdAndUpdate
        // Opsi { new: true } mengembalikan dokumen yang sudah diperbarui.
        // .select('-password') untuk memastikan password tidak dikirim ke frontend.
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true } 
        ).select('-password'); 
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }

        // 4. Kirim data pengguna yang sudah diperbarui kembali ke frontend
        res.status(200).json({ 
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Gagal memperbarui profil. Periksa log backend.', error: err.message });
    }
};

// 📢 Penting: Export semua fungsi yang digunakan oleh routes
module.exports = { registerUser, loginUser, updateProfile };