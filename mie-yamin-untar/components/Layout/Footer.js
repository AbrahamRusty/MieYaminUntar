'use client';

import { Container, Row, Col } from 'react-bootstrap';
// Impor ikon yang diperlukan
import {
  BsInstagram,
  BsFacebook,
  BsTwitter,
  BsPinMap,
  BsTelephone,
  BsEnvelope,
  BsHeartFill,
} from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="footer-dark">
      <Container>
        {/* 1. KONTEN UTAMA (4 KOLOM) */}
        <Row className="gy-4">
          {/* Kolom 1: About & Social */}
          <Col lg={4} md={6}>
            <h5>Mie Yamin Untar</h5>
            <p>
              Campus taste, endless flavor. Serving authentic noodles with love
              since 2018.
            </p>
            <div>
              <a href="#" className="social-icon-btn">
                <BsInstagram />
              </a>
              <a href="#" className="social-icon-btn">
                <BsFacebook />
              </a>
              <a href="#" className="social-icon-btn">
                <BsTwitter />
              </a>
            </div>
          </Col>

          {/* Kolom 2: Quick Links */}
          <Col lg={2} md={6}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#" className="btn btn-brand-primary btn-sm">Loyalty Program</a></li>
            </ul>
          </Col>

          {/* Kolom 3: Contact */}
          <Col lg={3} md={6}>
            <h5>Contact</h5>
            <ul className="contact-list">
              <li>
                <BsPinMap className="contact-list-icon" />
                <span>
                  Jl. Letjen S. Parman No. 1, Jakarta Barat
                </span>
              </li>
              <li>
                <BsTelephone className="contact-list-icon" />
                <span>0812-3456-7890</span>
              </li>
              <li>
                <BsEnvelope className="contact-list-icon" />
                <span>info@mieyaminuntar.com</span>
              </li>
            </ul>
          </Col>

          {/* Kolom 4: Opening Hours */}
          <Col lg={3} md={6}>
            <h5>Opening Hours</h5>
            <div className="opening-hours-row">
              <span>Monday - Friday</span>
              <span>09:00 - 21:00</span>
            </div>
            <div className="opening-hours-row">
              <span>Saturday</span>
              <span>09:00 - 21:00</span>
            </div>
            <div className="opening-hours-row">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </Col>
        </Row>

        {/* 2. COPYRIGHT */}
        <Row>
          <Col className="text-center footer-copyright-divider">
            <p className="mb-0 small">
              © 2025 Mie Yamin Untar. All rights reserved. Made with{' '}
              <BsHeartFill style={{ color: '#e25555' }} /> for students.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}