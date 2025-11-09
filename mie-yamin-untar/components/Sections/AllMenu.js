// components/FullMenu.js
'use client';

import { 
  Container, 
  Row, 
  Col, 
  ListGroup, 
  InputGroup, 
  Form 
} from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'; 
import MenuGridCard from '../UI/MenuGridCard'; // Menggunakan kartu Anda

// Data dummy baru dengan 5 item per kategori
const menuData = {
  mie: [
    {
      title: 'Mie Yamin Original',
      description: 'Mie klasik dengan ayam kecap manis',
      price: 'Rp18.000',
      imageUrl: '/menu/mie-yamin-original.jpg',
    },
    {
      title: 'Mie Yamin Level 5',
      description: 'Pedas dan penuh rasa bagi para pecinta rempah',
      price: 'Rp20.000',
      imageUrl: '/menu/mie-yamin-level5.jpg',
    },
    {
      title: 'Mie Yamin Complete',
      description: 'Includes chicken, dumplings, meatballs, and sambal',
      price: 'Rp25.000',
      imageUrl: '/menu/mie-yamin-complete.jpg',
    },
    {
      title: 'Mie Yamin Pangsit',
      description: 'Mie klasik dengan ayam kecap manis dan pangsit',
      price: 'Rp18.000',
      imageUrl: '/menu/pangsit-goreng.jpg',
    },
    {
      title: 'Mie Yamin Jamur',
      description: 'Ditambah sengatan jamur spesial',
      price: 'Rp20.000',
      imageUrl: '/menu/mie-yamin-jamur.jpg',
    },
  ],
  bihun: [
    {
      title: 'Bihun Goreng',
      description: 'Bihun goreng spesial dengan sayuran segar',
      price: 'Rp17.000',
      imageUrl: '/menu/default.jpg', // Ganti path
    },
    {
      title: 'Bihun Kuah',
      description: 'Bihun kuah kaldu ayam yang menghangatkan',
      price: 'Rp17.000',
      imageUrl: '/menu/default.jpg', // Ganti path
    },
    {
      title: 'Bihun Dummy 3',
      description: 'Deskripsi dummy',
      price: 'Rp10.000',
      imageUrl: '/menu/default.jpg',
    },
    {
      title: 'Bihun Dummy 4',
      description: 'Deskripsi dummy',
      price: 'Rp10.000',
      imageUrl: '/menu/default.jpg',
    },
    {
      title: 'Bihun Dummy 5',
      description: 'Deskripsi dummy',
      price: 'Rp10.000',
      imageUrl: '/menu/default.jpg',
    },
  ],
  kuetiaw: [
    {
      title: 'Kuetiaw Siram',
      description: 'Kuetiaw dengan kuah kental yang gurih',
      price: 'Rp20.000',
      imageUrl: '/menu/default.jpg', // Ganti path
    },
    {
      title: 'Kuetiaw Goreng',
      description: 'Kuetiaw goreng seafood',
      price: 'Rp22.000',
      imageUrl: '/menu/default.jpg',
    },
    {
      title: 'Kuetiaw Dummy 3',
      description: 'Deskripsi dummy',
      price: 'Rp10.000',
      imageUrl: '/menu/default.jpg',
    },
    {
      title: 'Kuetiaw Dummy 4',
      description: 'Deskripsi dummy',
      price: 'Rp10.000',
      imageUrl: '/menu/default.jpg',
    },
    {
      title: 'Kuetiaw Dummy 5',
      description: 'Deskripsi dummy',
      price: 'Rp10.000',
      imageUrl: '/menu/default.jpg',
    },
  ],
  topping: [
    {
      title: 'Pangsit Goreng',
      description: 'Pangsit renyah (5 pcs)',
      price: 'Rp10.000',
      imageUrl: '/menu/pangsit-goreng.jpg',
    },
    {
      title: 'Bakso Sapi',
      description: 'Bakso sapi (3 pcs)',
      price: 'Rp8.000',
      imageUrl: '/menu/default.jpg',
    },
    {
      title: 'Topping Dummy 3',
      description: 'Deskripsi dummy',
      price: 'Rp5.000',
      imageUrl: '/menu/default.jpg',
    },
    {
      title: 'Topping Dummy 4',
      description: 'Deskripsi dummy',
      price: 'Rp5.000',
      imageUrl: '/menu/default.jpg',
    },
    {
      title: 'Topping Dummy 5',
      description: 'Deskripsi dummy',
      price: 'Rp5.000',
      imageUrl: '/menu/default.jpg',
    },
  ],
};

export default function FullMenu() {
  return (
    // Gunakan class .menu-section untuk latar abu-abu
    <div className="menu-section" id="menu">
      <Container>
        <Row>

          {/* 1. SIDEBAR KIRI (Permintaan #1) */}
          <Col lg={3}>
            <div className="menu-sidebar">
              <ListGroup as="ul" className="menu-sidebar-list">
                {/* 'active' menandai "Mie" sebagai default */}
                <li><a href="#mie" className="active">Mie</a></li>
                <li><a href="#bihun">Bihun</a></li>
                <li><a href="#kuetiaw">Kue Tiaw</a></li>
                <li><a href="#topping">Topping</a></li>
              </ListGroup>
            </div>
          </Col>

          {/* 2. KONTEN KANAN */}
          <Col lg={9}>
            <div className="menu-content">
              
              {/* Search Bar (Permintaan #3) */}
              <InputGroup className="menu-search-bar mb-4">
                <InputGroup.Text><BsSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Cari menu favoritmu..."
                  aria-label="Cari menu"
                />
              </InputGroup>
              
              {/* Loop melalui data menu */}
              {Object.keys(menuData).map((category) => (
                <div key={category} id={category}>
                  
                  {/* Judul Grup (Kotak Hitam) */}
                  <div className="menu-group-title-box">
                    {category}
                  </div>
                  
                  <Row className="gy-4 mb-5">
                    {menuData[category].map((item, index) => (
                      // SEMUA kartu, termasuk topping, kini lg={4}
                      // (Permintaan #4)
                      <Col lg={4} md={6} sm={12} key={index}> 
                        <MenuGridCard
                          title={item.title}
                          description={item.description}
                          price={item.price}
                          imageUrl={item.imageUrl}
                        />
                      </Col>
                    ))}
                  </Row>
                  
                </div>
              ))}
              
            </div>
          </Col>
          
        </Row>
      </Container>
    </div>
  );
}