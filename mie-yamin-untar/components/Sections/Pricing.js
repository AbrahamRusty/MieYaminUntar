'use client';

import { Container, Row, Col, Card, Button, Nav } from 'react-bootstrap';

export default function Pricing() {
  return (
    <div className="pricing-section">
      <Container>
        {/* 2. KARTU HARGA */}
        {/* 'align-items-center' dihapus agar kartu platinum bisa lebih tinggi */}
        <Row className="justify-content-center gy-4">
          
          {/* Kartu 1: Silver */}
          <Col lg={4} md={6}>
            <Card className="pricing-card">
              <Card.Body>
                <Card.Title>Silver</Card.Title>

                {/* --- HARGA DIPERBARUI ke IDRX --- */}
                <div className="pricing-card-price">
                  100 <span className="period">IDRX</span>
                </div>

                <ul className="pricing-list">
                  <li>Voucher</li>
                  <li>Feed Back</li>
                  <li>Request menu</li>
                </ul>
                <Button variant="" className="btn-brand-primary">
                  Beli dengan IDRX
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Kartu 2: Platinum (Featured) */}
          <Col lg={4} md={6}>
            <Card className="pricing-card featured">
              <Card.Body>
                <Card.Title>Platinum</Card.Title>

                {/* --- HARGA DIPERBARUI ke IDRX --- */}
                <div className="pricing-card-price">
                  500 <span className="period">IDRX</span>
                </div>

                <ul className="pricing-list">
                  <li>Voucher</li>
                  <li>Feed Back</li>
                  <li>Request Menu</li>
                  <li>Costume Menu</li>
                  <li>Prioritas</li>
                </ul>

                {/* --- TOMBOL DIPERBARUI --- */}
                <Button variant="" className="btn-brand-primary">
                  Beli dengan IDRX
                </Button>

              </Card.Body>
            </Card>
          </Col>

          {/* Kartu 3: Gold */}
          <Col lg={4} md={6}>
            <Card className="pricing-card">
              <Card.Body>
                <Card.Title>Gold</Card.Title>

                {/* --- HARGA DIPERBARUI ke IDRX --- */}
                <div className="pricing-card-price">
                  250 <span className="period">IDRX</span>
                </div>

                <ul className="pricing-list">
                  <li>Voucher</li>
                  <li>Feed back</li>
                  <li>Request Menu</li>
                  <li>Prioritas</li>
                </ul>
                <Button variant="" className="btn-brand-primary">
                  Beli dengan IDRX
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}