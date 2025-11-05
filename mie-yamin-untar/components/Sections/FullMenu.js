'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import MenuItemCard from '../UI/MenuCard'; // Impor kartu baru kita

// Data untuk menu, Anda bisa ganti ini dari database nanti
const menuItems = [
  {
    title: 'Mie Yamin Original',
    description: 'Mie klasik dengan ayam kecap manis',
    price: 'Rp18.000',
    imageUrl: '/menu/mie-yamin-original.jpg', // Ganti path gambar
  },
  {
    title: 'Mie Yamin Level 5',
    description: 'Pedas dan penuh rasa bagi para pecinta rempah',
    price: 'Rp20.000',
    imageUrl: '/menu/mie-yamin-level5.jpg', // Ganti path gambar
  },
  {
    title: 'Mie Yamin Complete',
    description: 'Includes chicken, dumplings, meatballs, and sambal',
    price: 'Rp25.000',
    imageUrl: '/menu/mie-yamin-complete.jpg', // Ganti path gambar
  },
  {
    title: 'Pangsit Goreng (5 pcs)',
    description: 'Renyah dan gurih',
    price: 'Rp10.000',
    imageUrl: '/menu/pangsit-goreng.jpg', // Ganti path gambar
  },
  {
    title: 'Es Teh',
    description: 'Teman minum yang sempurna',
    price: 'Rp5.000',
    imageUrl: '/menu/es-teh.jpg', // Ganti path gambar
  },
  {
    title: 'Menu Lain',
    description: 'Deskripsi menu lain',
    price: 'Rp15.000',
    imageUrl: '/menu/default.jpg', // Ganti path gambar
  },
];


export default function FullMenu() {
  return (
    <Container as="section" className="py-5 my-4" id="menu">
      {/* 1. HEADER (Tag, Judul, Subjudul) */}
      <Row className="justify-content-center text-center mb-5">
        <Col xs="auto">
          {/* Badge 'Full Menu' */}
          <div className="soft-badge">Full Menu</div>
        </Col>
        <Col xs={12}>
          <h2 className="section-title mt-3">Pilihan Menu Lengkap</h2>
        </Col>
        <Col lg={7}>
          <p className="text-muted fs-5">
            Mie segar, topping melimpah, dan harga ramah di kantong
          </p>
        </Col>
      </Row>

      {/* 2. GRID MENU */}
      <Row className="gy-4">
        {menuItems.map((item, index) => (
          <Col lg={4} md={6} key={index}>
            <MenuItemCard
              title={item.title}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          </Col>
        ))}
      </Row>

      {/* 3. TOMBOL "SEE MORE" */}
      <Row className="mt-5 pt-3">
        <Col className="text-center">
          <Button variant="" className="btn-brand-primary btn-lg px-5">
            See more
          </Button>
        </Col>
      </Row>
    </Container>
  );
}