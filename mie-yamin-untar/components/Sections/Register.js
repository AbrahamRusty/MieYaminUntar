'use client';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Impor ikon
import { BsPercent, BsGift, BsCalendarEvent, BsStar } from 'react-icons/bs';
import toast from 'react-hot-toast';
import axios from 'axios';

// Helper component untuk Benefit Card
const BenefitCard = ({ icon, text }) => (
  <div className="benefit-card">
    <div className="benefit-icon-wrapper">{icon}</div>
    <h6>{text}</h6>
  </div>
);

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  return (
    <div className="loyalty-section" id="register">
      <Container>
        {/* 1. HEADER */}
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <div className="loyalty-badge">Pendaftaran</div>
            <h2 className="display-4 fw-bold text-white mt-3">
              Bergabung dengan Mie Yamin Untar
            </h2>
            <p className="fs-5 mt-3" style={{ opacity: 0.8 }}>
              Daftar untuk mengakses fitur eksklusif dan manfaat khusus member
            </p>
          </Col>
        </Row>

        {/* 2. KONTEN (Kiri: Benefit, Kanan: Form) */}
        <Row className="mt-5 gy-4 align-items-center">

          {/* Kolom Kiri: Member Benefits */}
          <Col lg={6}>
            <h5 className="fw-bold fs-4 mb-3 text-white">Manfaat Member:</h5>
            <BenefitCard icon={<BsPercent />} text="Diskon hingga 20%" />
            <BenefitCard icon={<BsGift />} text="Voucher setiap minggu" />
            <BenefitCard icon={<BsCalendarEvent />} text="Akses awal ke menu baru" />
            <BenefitCard icon={<BsStar />} text="Layanan prioritas" />
          </Col>

          {/* Kolom Kanan: Form Registrasi */}
          <Col lg={6}>
            <div className="form-card">
              <h4 className="fw-bold">Buat Akun Anda</h4>
              <p className="text-muted mb-4">
                Isi detail Anda untuk memulai
              </p>

              <Form>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    className="form-card-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email.anda@example.com"
                    className="form-card-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formWhatsApp">
                  <Form.Label>Nomor WhatsApp</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="+62-"
                    className="form-card-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Kata Sandi</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="******"
                    className="form-card-input"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </Form.Group>

                <Button
                  variant=""
                  className="btn-brand-primary w-100 btn-lg mt-3"
                  disabled={isLoading}
                  onClick={async () => {
                    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
                      toast.error('Mohon lengkapi semua field');
                      return;
                    }

                    setIsLoading(true);
                    try {
                      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/auth/register`, formData);
                      toast.success('Pendaftaran berhasil! Silakan login.');
                      router.push('/');
                    } catch (error) {
                      console.error('Registration error:', error);
                      toast.error(error.response?.data?.message || 'Gagal mendaftar');
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                </Button>
              </Form>

              <p className="form-footer-link mt-4">
                Sudah punya akun? <a href="/login">Login di sini</a>
              </p>
              <p className="form-disclaimer mt-3">
                Dengan mendaftar, Anda menyetujui Syarat & Ketentuan kami
              </p>
            </div>
          </Col>
        </Row>
      </Container>


    </div>
  );
}
