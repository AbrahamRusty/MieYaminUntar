require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../db');
const Menu = require('../models/Menus');

const menuData = [
  {
    category: "mie",
    items: [
      {
        title: "Mie Yamin Original",
        description: "Mie klasik dengan ayam kecap manis",
        price: "Rp18.000",
        imageUrl: "https://bolulembang.co.id/wp-content/uploads/2024/04/fromandroid-9dc7f9ab197e042d62f67beabd294e07.jpg"
      },
      {
        title: "Mie Yamin Level 5",
        description: "Pedas dan penuh rasa bagi para pecinta rempah",
        price: "Rp20.000",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeD938Bk0Ybm8pZqNva_LMK1ZlBskU7uzQAA&s"
      },
      {
        title: "Mie Yamin Complete",
        description: "Includes chicken, dumplings, meatballs, and sambal",
        price: "Rp25.000",
        imageUrl: "https://id.pinterest.com/didiksatria07/mie-ayam/"
      },
      {
        title: "Mie Yamin Pangsit",
        description: "Mie klasik dengan ayam kecap manis dan pangsit",
        price: "Rp18.000",
        imageUrl: "https://tse2.mm.bing.net/th/id/OIP.IjFF94dno_pHvPDJzRLrHQHaE8?pid=ImgDet&w=159&h=106&c=7&o=7&rm=3"
      },
      {
        title: "Mie Yamin Jamur",
        description: "Ditambah sengatan jamur spesial",
        price: "Rp20.000",
        imageUrl: "https://tse3.mm.bing.net/th/id/OIP.zAaRXsp6Gl35knHdaBEscwAAAA?pid=ImgDet&w=159&h=159&c=7&o=7&rm=3"
      }
    ],
  },
  {
    category: "bihun",
    items: [
      {
        title: "Bihun Goreng",
        description: "Bihun goreng spesial dengan sayuran segar",
        price: "Rp17.000",
        imageUrl: "https://tse2.mm.bing.net/th/id/OIP.nXYfxpc-fQI93OJMyb8ZvQAAAA?pid=ImgDet&w=159&h=159&c=7&o=7&rm=3"
      },
      {
        title: "Bihun Kuah",
        description: "Bihun kuah kaldu ayam yang menghangatkan",
        price: "Rp17.000",
        imageUrl: "https://tse4.mm.bing.net/th/id/OIP.XoBuMQiKkNMDFMmBBaIXpwAAAA?pid=ImgDet&w=159&h=124&c=7&o=7&rm=3"
      },
      {
        title: "Bihun Komplit",
        description: "Bihun lengkap dengan berbagai topping",
        price: "Rp20.000",
        imageUrl: "https://tse2.mm.bing.net/th/id/OIP.sQKH6Gqc07l7n7KemsVa8QAAAA?pid=ImgDet&w=159&h=168&c=7&o=7&rm=3"
      },
      {
        title: "Bihun Pangsit",
        description: "Bihun dengan pangsit renyah",
        price: "Rp18.000",
        imageUrl: "https://tse2.mm.bing.net/th/id/OIP.Ay6birp9DFq3Es_X1O-HqAHaFj?pid=ImgDet&w=159&h=119&c=7&o=7&rm=3"
      },
      {
        title: "Bihun Pedas",
        description: "Bihun dengan level pedas tinggi",
        price: "Rp19.000",
        imageUrl: "https://tse4.mm.bing.net/th/id/OIP.QQZRqask4553PqF7d5dVDAHaF7?pid=ImgDet&w=159&h=127&c=7&o=7&rm=3"
      }
    ],
  },
  {
    category: "kuetiaw",
    items: [
      {
        title: "Kuetiaw Siram",
        description: "Kuetiaw dengan kuah kental yang gurih",
        price: "Rp20.000",
        imageUrl: "https://tse4.mm.bing.net/th/id/OIP.DMLel8Ko3xl1k7P11j33jgAAAA?pid=ImgDet&w=159&h=113&c=7&o=7&rm=3"
      },
      {
        title: "Kuetiaw Goreng",
        description: "Kuetiaw goreng seafood",
        price: "Rp22.000",
        imageUrl: "https://tse3.mm.bing.net/th/id/OIP.AxZp3lwBHUv4iMhb2cGkQwHaE7?pid=ImgDet&w=159&h=106&c=7&o=7&rm=3"
      },
      {
        title: "Kuetiaw Daging",
        description: "Kuetiaw dengan daging sapi pilihan",
        price: "Rp23.000",
        imageUrl: "https://tse3.mm.bing.net/th/id/OIP.3pL19Bklk9fFxlNCRd59xwAAAA?pid=ImgDet&w=159&h=159&c=7&o=7&rm=3"
      },
      {
        title: "Kuetiaw Pedas",
        description: "Kuetiaw dengan level pedas tinggi",
        price: "Rp21.000",
        imageUrl: "https://tse1.mm.bing.net/th/id/OIP.JUnbwqojpCutcP2WxOZd5wHaE7?pid=ImgDet&w=164&h=109&c=7&dpr=1,5&o=7&rm=3"
      },
      {
        title: "Kuetiaw Seafood",
        description: "Kuetiaw dengan seafood segar",
        price: "Rp24.000",
        imageUrl: "https://tse2.mm.bing.net/th/id/OIP.tBm5B_0QhzNW1YK4NTKMqQHaEK?pid=ImgDet&w=159&h=89&c=7&o=7&rm=3"
      }
    ],
  },
  {
    category: "topping",
    items: [
      {
        title: "Pangsit Goreng",
        description: "Pangsit renyah (5 pcs)",
        price: "Rp10.000",
        imageUrl: "https://tse2.mm.bing.net/th/id/OIP.4cGQGa7ZxKfVsQJVU_1c_wHaF7?pid=ImgDet&w=159&h=127&c=7&o=7&rm=3"
      },
      {
        title: "Bakso Sapi",
        description: "Bakso sapi (3 pcs)",
        price: "Rp8.000",
        imageUrl: "https://tse4.mm.bing.net/th/id/OIP.Y8cgJZmlvVseI7Qhh6UyuwAAAA?pid=ImgDet&w=159&h=124&c=7&o=7&rm=3"
      },
      {
        title: "Pangsit Rebus",
        description: "Pangsit rebus dengan kuah spesial",
        price: "Rp9.000",
        imageUrl: "https://tse2.mm.bing.net/th/id/OIP.8Wos5SHWCKMGqyS7Acq6bwHaGA?pid=ImgDet&w=159&h=128&c=7&o=7&rm=3"
      }
    ],
  }
];

const seedMenu = async () => {
  try {
    await connectDB();

    // Clear existing menu data
    await Menu.deleteMany({});

    // Insert new menu data
    await Menu.insertMany(menuData);
    console.log('Menu data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding menu data:', error);
    process.exit(1);
  }
};

seedMenu();
