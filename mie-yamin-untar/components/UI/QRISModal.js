'use client';

import { Modal, Button, Alert } from 'react-bootstrap';
import { FaQrcode, FaCheck } from 'react-icons/fa';
import { useState } from 'react';

export default function QRISModal({ show, onHide, tier, price }) {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handleConfirmPayment = () => {
    // Simulate QRIS payment confirmation
    setPaymentConfirmed(true);
    setTimeout(() => {
      alert('Pembayaran QRIS berhasil! Membership telah aktif.');
      onHide();
      setPaymentConfirmed(false);
    }, 2000);
  };

  const resetModal = () => {
    setPaymentConfirmed(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={resetModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Pembayaran QRIS - {tier.charAt(0).toUpperCase() + tier.slice(1)}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="qris-modal text-center">
          {!paymentConfirmed ? (
            <>
              <FaQrcode size={64} className="text-primary mb-4" />
              <h5>Scan QR Code untuk Pembayaran</h5>
              <p className="text-muted mb-4">
                Gunakan aplikasi e-wallet Anda untuk scan QR code di bawah ini
              </p>

              {/* Dummy QR Code - In real implementation, this would be generated */}
              <div className="qr-code-placeholder mb-4" style={{
                width: '200px',
                height: '200px',
                background: '#f8f9fa',
                border: '2px dashed #dee2e6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                borderRadius: '8px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <FaQrcode size={48} className="text-secondary mb-2" />
                  <small className="text-muted">QRIS Code</small>
                  <br />
                  <small className="text-muted">Dummy</small>
                </div>
              </div>

              <Alert variant="info">
                <strong>Ringkasan Pembayaran:</strong><br />
                Membership: {tier.charAt(0).toUpperCase() + tier.slice(1)}<br />
                Total: Rp {price.toLocaleString('id-ID')}
              </Alert>

              <div className="mt-4">
                <small className="text-muted">
                  Setelah scan QR code, klik "Konfirmasi Pembayaran" untuk menyelesaikan transaksi
                </small>
              </div>
            </>
          ) : (
            <div className="payment-success">
              <FaCheck size={64} className="text-success mb-4" />
              <h5>Pembayaran Berhasil!</h5>
              <p>Membership {tier.charAt(0).toUpperCase() + tier.slice(1)} telah aktif.</p>
            </div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        {!paymentConfirmed ? (
          <>
            <Button variant="secondary" onClick={resetModal}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleConfirmPayment}>
              Konfirmasi Pembayaran
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={resetModal}>
            Tutup
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
