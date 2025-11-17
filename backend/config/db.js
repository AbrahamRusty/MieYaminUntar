// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'mieyamin_db', // Memastikan nama database
            // Hapus properti deprecated (useNewUrlParser, useUnifiedTopology)
        });

        console.log('MongoDB Atlas connected successfully.');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;