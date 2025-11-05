'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
// Impor ikon yang diperlukan
import { BsPinMap, BsClock, BsWhatsapp, BsInstagram } from 'react-icons/bs';

export default function Contact() {
  // URL Google Maps (ganti dengan link embed Anda)
  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666427009772!2d106.7909261147689!3d-6.175392395529146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6f3e46c7f0b%3A0x6b4de210bc6363c3!2sUniversitas%20Tarumanagara%20(Kampus%20I)!5e0!3m2!1sid!2sid!4v1678888888888';

  return (
    <Container as="section" className="py-5 my-4" id="lokasi">
      {/* 1. HEADER (Tag, Judul, Subjudul) */}
      <Row className="justify-content-center text-center mb-5">
        <Col xs="auto">
          {/* Badge 'Visit Us' */}
          <div className="soft-badge">Visit Us</div>
        </Col>
        <Col xs={12}>
          <h2 className="section-title mt-3">Find Us Here</h2>
        </Col>
        <Col lg={7}>
          <p className="text-muted fs-5">
            Visit our convenient campus location
          </p>
        </Col>
      </Row>

      {/* 2. KONTEN (Kartu Info + Peta) */}
      <Row className="gy-4">
        {/* Kolom Kiri: Kartu Info */}
        <Col lg={5}>
          {/* Card: Address */}
          <div className="info-card">
            <div className="info-card-icon address">
              <BsPinMap />
            </div>
            <div className="info-card-content">
              <h6>Address</h6>
              <p>
                Jl. Letjen S. Parman No. 1<br />
                Kampus Untar, Jakarta Barat
              </p>
            </div>
          </div>

          {/* Card: Open Hours */}
          <div className="info-card">
            <div className="info-card-icon hours">
              <BsClock />
            </div>
            <div className="info-card-content">
              <h6>Open Hours</h6>
              <p>
                Monday – Saturday
                <br />
                09.00 – 21.00 WIB
              </p>
            </div>
          </div>

          {/* Card: Contact (Green) */}
          <div className="info-card-green">
            <div className="info-card-icon">
              <BsWhatsapp />
            </div>
            <div className="info-card-content flex-grow-1">
              <h6>Contact</h6>
              <p className="fs-5 fw-bold">WhatsApp: 0812-3456-7890</p>
            </div>
            <Button
              variant=""
              className="btn-white-outline ms-auto align-self-center"
            >
              Order via WhatsApp
            </Button>
          </div>

          {/* Card: Social Media (Purple) */}
          <div className="info-card-purple">
            <div className="info-card-icon">
              <BsInstagram />
            </div>
            <div className="info-card-content">
              <h6>Social Media</h6>
              <p className="fs-5 fw-bold">@mieyaminuntar</p>
            </div>
          </div>
        </Col>

        {/* Kolom Kanan: Peta */}
        <Col lg={7}>
          <div className="map-embed">
            <iframe
              src={mapEmbedUrl}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
}