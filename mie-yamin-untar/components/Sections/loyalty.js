'use client';

import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
// Impor ikon
import { BsPercent, BsGift, BsCalendarEvent, BsStar, BsCreditCard, BsBank } from 'react-icons/bs';
import { useState } from 'react';
import toast from 'react-hot-toast';

// Helper component untuk Benefit Card
const BenefitCard = ({ icon, text }) => (
  <div className="benefit-card">
    <div className="benefit-icon-wrapper">{icon}</div>
    <h6>{text}</h6>
  </div>
);

export default function Loyalty() {
  const [registrationType, setRegistrationType] = useState('login'); // 'login' or 'membership'
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('qris');

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

        {/* 2. REGISTRATION SECTION */}
        <Row className="mt-5 justify-content-center">
          <Col lg={8}>
            <div className="form-card">
              <h4 className="fw-bold text-center mb-4">Join Mie Yamin Loyalty Program</h4>
              <p className="text-muted mb-4 text-center">
                Register to access exclusive features and benefits
              </p>

              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formFullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        className="form-card-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="your.email@example.com"
                        className="form-card-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formWhatsApp">
                      <Form.Label>WhatsApp Number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="+62-"
                        className="form-card-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="******"
                        className="form-card-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Radio buttons for registration type */}
                <Form.Group className="mb-3">
                  <Form.Label>Registration Type</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      id="login-radio"
                      label="Just Login (No Membership)"
                      name="registrationType"
                      value="login"
                      checked={registrationType === 'login'}
                      onChange={(e) => setRegistrationType(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      id="membership-radio"
                      label="Join Membership"
                      name="registrationType"
                      value="membership"
                      checked={registrationType === 'membership'}
                      onChange={(e) => setRegistrationType(e.target.value)}
                    />
                  </div>
                </Form.Group>

                {/* Membership level dropdown if membership is selected */}
                {registrationType === 'membership' && (
                  <Form.Group className="mb-3" controlId="formMembershipLevel">
                    <Form.Label>Select Membership Level</Form.Label>
                    <Form.Select
                      className="form-card-input"
                      value={selectedMembership}
                      onChange={(e) => setSelectedMembership(e.target.value)}
                    >
                      <option value="">Choose a level</option>
                      <option value="silver">Silver - Rp25.000/month</option>
                      <option value="gold">Gold - Rp50.000/month</option>
                      <option value="platinum">Platinum - Rp75.000/month</option>
                    </Form.Select>
                  </Form.Group>
                )}

                <Button
                  variant=""
                  className="btn-brand-primary w-100 btn-lg mt-3"
                  onClick={() => {
                    if (registrationType === 'membership' && selectedMembership) {
                      setShowPaymentModal(true);
                    } else {
                      toast.success('Registration successful!');
                    }
                  }}
                >
                  Register Now
                </Button>
              </Form>

              <p className="form-footer-link mt-4 text-center">
                Already have an account? <a href="/login">Login here</a>
              </p>
              <p className="form-disclaimer mt-3 text-center">
                By registering, you agree to our Terms & Conditions
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Complete Membership Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have selected: <strong>{selectedMembership.charAt(0).toUpperCase() + selectedMembership.slice(1)} Membership</strong></p>
          <p>Amount: <strong>
            {selectedMembership === 'silver' ? 'Rp25.000' :
             selectedMembership === 'gold' ? 'Rp50.000' :
             'Rp75.000'}/month
          </strong></p>

          <Form.Group className="mb-3">
            <Form.Label>Select Payment Method</Form.Label>
            <div>
              <Form.Check
                type="radio"
                id="qris-radio"
                label={<><BsCreditCard /> QRIS Barcode</>}
                name="paymentMethod"
                value="qris"
                checked={paymentMethod === 'qris'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                id="bank-radio"
                label={<><BsBank /> Bank Transfer</>}
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
          </Form.Group>

          {paymentMethod === 'qris' && (
            <div className="text-center">
              <h6>Scan QRIS Code</h6>
              <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', display: 'inline-block' }}>
                <img src="https://via.placeholder.com/200x200?text=QRIS+Barcode" alt="QRIS Barcode" style={{ width: '200px', height: '200px' }} />
              </div>
              <p className="mt-2">Scan this QR code with your e-wallet app</p>
            </div>
          )}

          {paymentMethod === 'bank' && (
            <div>
              <h6>Bank Transfer Details</h6>
              <p>Bank: BCA</p>
              <p>Account Number: 1234567890</p>
              <p>Account Name: Mie Yamin Untar</p>
              <p>Please transfer the exact amount and include your name in the notes.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            toast.success('Payment submitted! Membership activated.');
            setShowPaymentModal(false);
          }}>
            Confirm Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
