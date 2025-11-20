// components/FullMenu.js
'use client';

import { 
  Container, 
  Row, 
  Col, 
  ListGroup, 
  InputGroup, 
  Form,
  Nav
} from 'react-bootstrap';
// Impor ikon untuk search dan check
import { BsSearch, BsCheckLg } from 'react-icons/bs'; 
import MenuGridCard from '../UI/MenuGridCard'; // Impor kartu baru kita

// Data dummy menu
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
    title: 'Mie Yamin pangsit',
    description: 'Mie klasik dengan ayam kecap manis dan pangsit yang renyah',
    price: 'Rp18.000',
    imageUrl: '/menu/pangsit-goreng.jpg', // Ganti path gambar
  },
  {
    title: 'Mie Yamin Jamur',
    description: 'Pedas dan penuh rasa bagi para pecinta rempah ditambah sengatan jamur',
    price: 'Rp20.000',
    imageUrl: '/menu/mie-yamin-jamur.jpg', // Ganti path gambar
  },
  // ...Tambahkan menu lain...
];

export default function MenuMie() {
  return (
    // Gunakan class .menu-page-section untuk latar abu-abu
    <div className="menu-page-section" id="menu">
      <Container>
        <Row>
          
          {/* 1. SIDEBAR KIRI (Kategori) */}
          <Col lg={3}>
            <ListGroup variant="flush" className="menu-sidebar">
              <ListGroup.Item action active>
                Mie
              </ListGroup.Item>
              <ListGroup.Item action>
                Bihun
              </ListGroup.Item>
              <ListGroup.Item action>
                Kue Tiaw
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* 2. KONTEN KANAN (Search, Filter, Grid) */}
          <Col lg={9}>
            
            {/* Search Bar */}
            <InputGroup className="menu-search-bar mb-3">
              <InputGroup.Text id="basic-addon1">
                <BsSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search"
                aria-label="Search"
              />
            </InputGroup>

            {/* Filter Chips */}
            <Nav className="filter-chip-group">
              <Nav.Link href="#" className="filter-chip active">
                <BsCheckLg className="me-1" /> New
              </Nav.Link>
              <Nav.Link href="#" className="filter-chip">
                Price ascending
              </Nav.Link>
              <Nav.Link href="#" className="filter-chip">
                Price descending
              </Nav.Link>
              <Nav.Link href="#" className="filter-chip">
                Rating
              </Nav.Link>
            </Nav>

            {/* Grid Menu */}
            <Row className="gy-4">
              {menuItems.map((item, index) => (
                <Col md={4} key={index}>
                  <MenuGridCard
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    imageUrl={item.imageUrl}
                  />
                </Col>
              ))}
            </Row>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}