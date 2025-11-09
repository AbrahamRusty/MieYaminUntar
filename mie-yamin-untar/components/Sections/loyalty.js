'use client';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// Impor ikon
import { BsPercent, BsGift, BsCalendarEvent, BsStar } from 'react-icons/bs';

// Helper component untuk Benefit Card
const BenefitCard = ({ icon, text }) => (
  <div className="benefit-card">
    <div className="benefit-icon-wrapper">{icon}</div>
    <h6>{text}</h6>
  </div>
);

export default function Loyalty() {
  return (
    <div className="loyalty-section" id="loyalty">
      <Container>
        {/* 1. HEADER */}
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <div className="loyalty-badge">Loyalty Program</div>
            <h2 className="display-4 fw-bold text-white mt-3">
              Become a Loyal Customer
            </h2>
            <p className="fs-5 mt-3" style={{ opacity: 0.8 }}>
              Join our loyalty program to enjoy exclusive benefits and rewards
            </p>
          </Col>
        </Row>

        {/* 2. KONTEN (Kiri: Benefit, Kanan: Form) */}
        <Row className="mt-5 gy-4 align-items-center">
          
          {/* Kolom Kiri: Member Benefits */}
          <Col lg={6}>
            <h5 className="fw-bold fs-4 mb-3 text-white">Member Benefits:</h5>
            <BenefitCard icon={<BsPercent />} text="Diskon 20%" />
            <BenefitCard icon={<BsGift />} text="Voucher setiap minggu" />
            <BenefitCard icon={<BsCalendarEvent />} text="Early access ke menu baru" />
            <BenefitCard icon={<BsStar />} text="Prioritas" />
          </Col>

          {/* Kolom Kanan: Form Registrasi */}
          <Col lg={6}>
            <div className="form-card">
              <h4 className="fw-bold">Join Us Today</h4>
              <p className="text-muted mb-4">
                Create your account and start earning rewards
              </p>

              <Form>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    className="form-card-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="your.email@example.com"
                    className="form-card-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formWhatsApp">
                  <Form.Label>WhatsApp Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="+62-"
                    className="form-card-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="******"
                    className="form-card-input"
                  />
                </Form.Group>

                <Button
                  variant=""
                  className="btn-brand-primary w-100 btn-lg mt-3"
                >
                  Login Here
                </Button>
              </Form>

              <p className="form-footer-link mt-4">
                Don't have an account? <a href="/register">Register here</a>
              </p>
              <p className="form-disclaimer mt-3">
                By registering, you agree to our Terms & Conditions
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}