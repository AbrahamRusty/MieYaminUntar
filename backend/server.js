require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const menuRoutes = require('./routes/menu');
const Menu = require('./models/Menu');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://test:test123@cluster0.a8uor.mongodb.net/?appName=Cluster0';

app.use(cors());
app.use(express.json());

// Simple test route to verify routing works
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route works' });
});

// Register routes
app.use('/api', menuRoutes);

// Initial menu data
const menuData = {
  mie: [
    {
      title: 'Mie Yamin Original',
      description: 'Mie klasik dengan ayam kecap manis',
      price: 'Rp18.000',
      imageUrl: '/menu/mie/mie-original.png',
    },
    {
      title: 'Mie Yamin Level 5',
      description: 'Pedas dan penuh rasa bagi para pecinta rempah',
      price: 'Rp20.000',
      imageUrl: '/menu/mie/mie-level-5.png',
    },
    {
      title: 'Mie Yamin Complete',
      description: 'Includes chicken, dumplings, meatballs, and sambal',
      price: 'Rp25.000',
      imageUrl: '/menu/mie/mie-complete.png',
    },
    {
      title: 'Mie Yamin Pangsit',
      description: 'Mie klasik dengan ayam kecap manis dan pangsit',
      price: 'Rp18.000',
      imageUrl: '/menu/topping/pangsit-goreng.png',
    },
    {
      title: 'Mie Yamin Jamur',
      description: 'Ditambah sengatan jamur spesial',
      price: 'Rp20.000',
      imageUrl: '/menu/mie/mie_yamin_jamur.jpg',
    },
  ],
  bihun: [
    {
      title: 'Bihun Goreng',
      description: 'Bihun goreng spesial dengan sayuran segar',
      price: 'Rp17.000',
      imageUrl: '/menu/bihun/bihun_goreng.webp',
    },
    {
      title: 'Bihun Kuah',
      description: 'Bihun kuah kaldu ayam yang menghangatkan',
      price: 'Rp17.000',
      imageUrl: '/menu/bihun/Bihun_kuah.jpg',
    },
    {
      title: 'Bihun Komplit',
      description: 'Bihun lengkap dengan berbagai topping',
      price: 'Rp20.000',
      imageUrl: '/menu/bihun/bihun_komplit.webp',
    },
    {
      title: 'Bihun Pangsit',
      description: 'Bihun dengan pangsit renyah',
      price: 'Rp18.000',
      imageUrl: '/menu/bihun/bihun_pangsit.png',
    },
    {
      title: 'Bihun Pedas',
      description: 'Bihun dengan level pedas tinggi',
      price: 'Rp19.000',
      imageUrl: '/menu/bihun/bihun_pedas.webp',
    },
  ],
  kuetiaw: [
    {
      title: 'Kuetiaw Siram',
      description: 'Kuetiaw dengan kuah kental yang gurih',
      price: 'Rp20.000',
      imageUrl: '/menu/kuetiaw/kuetiaw_siram.jpg',
    },
    {
      title: 'Kuetiaw Goreng',
      description: 'Kuetiaw goreng seafood',
      price: 'Rp22.000',
      imageUrl: '/menu/kuetiaw/kuetiaw_goreng.webp',
    },
    {
      title: 'Kuetiaw Daging',
      description: 'Kuetiaw dengan daging sapi pilihan',
      price: 'Rp23.000',
      imageUrl: '/menu/kuetiaw/kuetiaw_daging.jpg',
    },
    {
      title: 'Kuetiaw Pedas',
      description: 'Kuetiaw dengan level pedas tinggi',
      price: 'Rp21.000',
      imageUrl: '/menu/kuetiaw/kwetiau_pedas.jpg',
    },
    {
      title: 'Kuetiaw Seafood',
      description: 'Kuetiaw dengan seafood segar',
      price: 'Rp24.000',
      imageUrl: '/menu/kuetiaw/Kwetiau_seafood.jpg',
    },
  ],
  topping: [
    {
      title: 'Pangsit Goreng',
      description: 'Pangsit renyah (5 pcs)',
      price: 'Rp10.000',
      imageUrl: '/menu/topping/pangsit-goreng.png',
    },
    {
      title: 'Bakso Sapi',
      description: 'Bakso sapi (3 pcs)',
      price: 'Rp8.000',
      imageUrl: '/menu/topping/baso.webp',
    },
    {
      title: 'Pangsit Rebus',
      description: 'Pangsit rebus dengan kuah spesial',
      price: 'Rp9.000',
      imageUrl: '/menu/topping/pangsit_rebus.webp',
    },
  ],
};

// Convert menuData object to categories array
const categoriesArray = Object.entries(menuData).map(([category, items]) => ({
  category,
  items,
}));

// Connect to MongoDB and start the server
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Insert initial menu data if not exists
    const menuCount = await Menu.countDocuments();
    if (menuCount === 0) {
      const menuDoc = new Menu({ categories: categoriesArray });
      await menuDoc.save();
      console.log('Inserted initial menu data');
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
