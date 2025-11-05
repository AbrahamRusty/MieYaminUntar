'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image';
import { BsStar, BsStarFill } from 'react-icons/bs';

export default function Hero() {
  return (
    <Container as="section" className="py-5 my-md-5" id="home">
      <Row className="align-items-center gy-5">
        {/* Kolom Kiri: Teks, CTA, & Statistik */}
        <Col lg={6}>
          {/* Badge (tetap sama) */}
          <div className="hero-badge mb-3">
            <BsStar />
            <span>Campus Favorite Since 2018</span>
          </div>

          {/* 1. Headline - KEDUA baris dibuat Oranye */}
          <h1 className="display-3 fw-bolder lh-1 mb-3">
            <span className="text-brand-primary">Campus Taste,</span>
            <br />
            <span className="text-brand-primary">Endless Flavor</span>
          </h1>

          {/* Paragraf (tetap sama) */}
          <p className="lead text-muted mb-4 pb-2">
            Mie autentik yang dibuat dengan bahan segar, topping yang melimpah,
            dan resep yang selalu berhasil. Setiap gigitan mengembalikan
            kenangan.
          </p>

          {/* Tombol CTA (tetap sama) */}
          <div className="mb-5">
            <Button
              variant=""
              className="btn-brand-primary btn-lg me-3 px-4"
            >
              Join Loyalty Program
            </Button>
            <Button
              variant=""
              className="btn-brand-secondary btn-lg px-4"
            >
              Order Now
            </Button>
          </div>

          {/* 2. Statistik - Diubah sesuai permintaan Anda */}
          <Row>
            <Col xs={4} className="hero-stats-item">
              <h4>100+</h4> {/* <--- DIUBAH */}
              <p>Happy Students</p>
            </Col>
            <Col xs={4} className="hero-stats-item">
              <h4 className="d-flex align-items-center">
                4.8
                <BsStarFill className="star-icon" />
              </h4>
              <p>Customer Rating</p>
            </Col>
            <Col xs={4} className="hero-stats-item">
              <h4>50+</h4> {/* <--- DIUBAH */}
              <p>Years Serving</p> {/* (Teksnya saya biarkan 'Years Serving') */}
            </Col>
          </Row>
        </Col>

        {/* Kolom Kanan: Gambar (tetap sama) */}
        <Col lg={6}>
          <Image
            src="/mie-yamin-hero-baru.jpg" // Ganti dengan path gambar mie Anda
            alt="Mie Yamin Lezat"
            width={600}
            height={600}
            className="img-fluid rounded-4 shadow-lg"
            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            priority
          />
        </Col>
      </Row>
    </Container>
  );
}