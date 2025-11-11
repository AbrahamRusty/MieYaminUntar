'use client';

import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FaWallet, FaGoogle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';

export default function LoginModal({ show, onHide }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();

  // Only call useWeb3Modal after component has mounted
  const { open } = mounted ? useWeb3Modal() : { open: () => {} };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Google OAuth
      toast.success('Google login akan diimplementasikan');
      onHide();
    } catch (error) {
      toast.error('Gagal login dengan Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletLogin = async () => {
    if (!mounted) return;

    setIsLoading(true);
    try {
      await open();
      // Don't close modal immediately - let Web3Modal handle the connection
      // Modal will close automatically when wallet connects via useEffect
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast.error('Gagal koneksi wallet');
      setIsLoading(false);
    } finally {
      // Reset loading state after a short delay to prevent rapid clicking
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  // Close modal automatically when wallet is connected
  useEffect(() => {
    if (isConnected && show) {
      onHide();
    }
  }, [isConnected, show, onHide]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Masuk ke Mie Yamin Loyalty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted mb-4 text-center">
          Pilih metode login untuk melanjutkan
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

          <Col xs={12}>
            <Button
              variant="outline-secondary"
              className="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
              onClick={handleWalletLogin}
              disabled={isLoading}
            >
              <FaWallet />
              Masuk dengan Wallet
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
