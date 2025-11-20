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
            <div className="loyalty-badge">Program Loyalitas</div>
            <h2 className="display-4 fw-bold text-white mt-3">
              Jadilah Pelanggan Setia
            </h2>
            <p className="fs-5 mt-3" style={{ opacity: 0.8 }}>
              Bergabung dengan program loyalitas kami untuk menikmati manfaat eksklusif dan hadiah
            </p>
          </Col>
        </Row>

        {/* 2. REGISTRATION SECTION */}
        <Row className="mt-5 justify-content-center">
          <Col lg={8}>
            <div className="form-card">
              <h4 className="fw-bold text-center mb-4">Bergabung dengan Program Loyalitas Mie Yamin</h4>
              <p className="text-muted mb-4 text-center">
                Daftar untuk mengakses fitur eksklusif dan manfaat khusus
              </p>

              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formFullName">
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        className="form-card-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="email.anda@example.com"
                        className="form-card-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formWhatsApp">
                      <Form.Label>Nomor WhatsApp</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="+62-"
                        className="form-card-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Kata Sandi</Form.Label>
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
                  <Form.Label>Tipe Pendaftaran</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      id="login-radio"
                      label="Hanya Login (Tanpa Membership)"
                      name="registrationType"
                      value="login"
                      checked={registrationType === 'login'}
                      onChange={(e) => setRegistrationType(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      id="membership-radio"
                      label="Bergabung Membership"
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
                    <Form.Label>Pilih Tingkat Membership</Form.Label>
                    <Form.Select
                      className="form-card-input"
                      value={selectedMembership}
                      onChange={(e) => setSelectedMembership(e.target.value)}
                    >
                      <option value="">Pilih tingkat</option>
                      <option value="silver">Silver - Rp25.000/bulan</option>
                      <option value="gold">Gold - Rp50.000/bulan</option>
                      <option value="platinum">Platinum - Rp75.000/bulan</option>
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
                      toast.success('Pendaftaran berhasil!');
                    }
                  }}
                >
                  Daftar Sekarang
                </Button>
              </Form>

              <p className="form-footer-link mt-4 text-center">
                Sudah punya akun? <a href="/login">Login di sini</a>
              </p>
              <p className="form-disclaimer mt-3 text-center">
                Dengan mendaftar, Anda menyetujui Syarat & Ketentuan kami
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Selesaikan Pembayaran Membership</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Anda telah memilih: <strong>{selectedMembership.charAt(0).toUpperCase() + selectedMembership.slice(1)} Membership</strong></p>
          <p>Jumlah: <strong>
            {selectedMembership === 'silver' ? 'Rp25.000' :
             selectedMembership === 'gold' ? 'Rp50.000' :
             'Rp75.000'}/bulan
          </strong></p>

          <Form.Group className="mb-3">
            <Form.Label>Pilih Metode Pembayaran</Form.Label>
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
                label={<><BsBank /> Transfer Bank</>}
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
          </Form.Group>

          {paymentMethod === 'qris' && (
            <div className="text-center">
              <h6>Scan Kode QRIS</h6>
              <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', display: 'inline-block' }}>
                <img src="https://via.placeholder.com/200x200?text=QRIS+Barcode" alt="QRIS Barcode" style={{ width: '200px', height: '200px' }} />
              </div>
              <p className="mt-2">Scan kode QR ini dengan aplikasi e-wallet Anda</p>
            </div>
          )}

          {paymentMethod === 'bank' && (
            <div>
              <h6>Detail Transfer Bank</h6>
              <p>Bank: BCA</p>
              <p>Nomor Rekening: 1234567890</p>
              <p>Nama Rekening: Mie Yamin Untar</p>
              <p>Silakan transfer jumlah yang tepat dan sertakan nama Anda di catatan.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={() => {
            toast.success('Pembayaran dikirim! Membership diaktifkan.');
            setShowPaymentModal(false);
          }}>
            Konfirmasi Pembayaran
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
