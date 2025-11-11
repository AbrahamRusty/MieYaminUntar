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

        {/* 2. KONTEN: Tingkatan Membership */}
        <Row className="mt-5 gy-4">
          <Col xs={12}>
            <h5 className="fw-bold fs-4 mb-4 text-white text-center">Tingkatan Membership</h5>
          </Col>

          {/* Silver Tier */}
          <Col lg={4} md={6}>
            <div className="tier-card">
              <div className="tier-header">
                <h6 className="tier-title">Silver</h6>
                <div className="tier-price">100 IDRX</div>
              </div>
              <div className="tier-benefits">
                <BenefitCard icon={<BsPercent />} text="Diskon 10%" />
                <BenefitCard icon={<BsGift />} text="Voucher bulanan" />
                <BenefitCard icon={<BsCalendarEvent />} text="Early access menu" />
              </div>
            </div>
          </Col>

          {/* Gold Tier */}
          <Col lg={4} md={6}>
            <div className="tier-card featured">
              <div className="tier-header">
                <h6 className="tier-title">Gold</h6>
                <div className="tier-price">250 IDRX</div>
              </div>
              <div className="tier-benefits">
                <BenefitCard icon={<BsPercent />} text="Diskon 15%" />
                <BenefitCard icon={<BsGift />} text="Voucher mingguan" />
                <BenefitCard icon={<BsCalendarEvent />} text="Early access menu" />
                <BenefitCard icon={<BsStar />} text="Prioritas antrian" />
              </div>
            </div>
          </Col>

          {/* Platinum Tier */}
          <Col lg={4} md={6}>
            <div className="tier-card">
              <div className="tier-header">
                <h6 className="tier-title">Platinum</h6>
                <div className="tier-price">500 IDRX</div>
              </div>
              <div className="tier-benefits">
                <BenefitCard icon={<BsPercent />} text="Diskon 20%" />
                <BenefitCard icon={<BsGift />} text="Voucher harian" />
                <BenefitCard icon={<BsCalendarEvent />} text="Early access menu" />
                <BenefitCard icon={<BsStar />} text="Prioritas maksimal" />
                <BenefitCard icon={<BsStar />} text="Custom menu request" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}