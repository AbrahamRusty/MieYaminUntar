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
import FloatingCart from '../UI/FloatingCart';
import CartModal from '../UI/CartModal';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';

// Data dummy baru dengan 5 item per kategori
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
      title: 'Mie Yamin ayam',
      description: 'Mie klasik dengan ayam kecap manis dengan sentuhan ayam tambahan',
      price: 'Rp18.000',
      imageUrl: '/menu/mie/mie-yamin-hero-baru.png',
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

function AllMenuContent() {
  const { isCartOpen, setIsCartOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState('mie');

  // Intersection Observer for category highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all category sections
    const categories = ['mie', 'bihun', 'kuetiaw', 'topping'];
    categories.forEach((category) => {
      const element = document.getElementById(category);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    // Gunakan class .menu-section untuk latar abu-abu
    <div className="menu-section" id="menu">
      <Container>
        <Row>

          {/* 1. SIDEBAR KIRI (Permintaan #1) */}
          <Col lg={3}>
            <div className="menu-sidebar">
              <ListGroup as="ul" className="menu-sidebar-list">
                <li><a href="#mie" className={activeCategory === 'mie' ? 'active' : ''}>Mie</a></li>
                <li><a href="#bihun" className={activeCategory === 'bihun' ? 'active' : ''}>Bihun</a></li>
                <li><a href="#kuetiaw" className={activeCategory === 'kuetiaw' ? 'active' : ''}>Kue Tiaw</a></li>
                <li><a href="#topping" className={activeCategory === 'topping' ? 'active' : ''}>Topping</a></li>
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

      {/* Floating Cart */}
      <FloatingCart />

      {/* Cart Modal */}
      <CartModal show={isCartOpen} onHide={() => setIsCartOpen(false)} />
    </div>
  );
}

export default function FullMenu() {
  return (
    <AllMenuContent />
  );
}