// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors'); // Untuk mengizinkan koneksi dari frontend Next.js

dotenv.config(); // Muat variabel dari .env

// Koneksi ke Database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Body parser untuk menerima JSON dari frontend
app.use(cors()); // Izinkan semua permintaan lintas domain

// Definisi Routes
app.use('/api/auth', authRoutes);

// Tentukan port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));