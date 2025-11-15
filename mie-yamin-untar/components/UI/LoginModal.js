'use client';

import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginModal({ show, onHide }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Redirect to backend Google OAuth
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/auth/google`;
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Gagal login dengan Google');
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Masuk ke Mie Yamin Untar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted mb-4 text-center">
          Masuk untuk mengakses fitur lengkap
        </p>

        <Row className="g-3">
          <Col xs={12}>
            <Button
              variant="outline-primary"
              className="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <FaGoogle />
              Masuk dengan Google
            </Button>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <small className="text-muted">
            Dengan masuk, Anda menyetujui Syarat & Ketentuan kami
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
}
