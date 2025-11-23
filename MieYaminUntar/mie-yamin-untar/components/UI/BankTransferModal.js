'use client';

import { Modal, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaCreditCard, FaCheck, FaCopy } from 'react-icons/fa';
import { useState } from 'react';

export default function BankTransferModal({ show, onHide, tier, price }) {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [proofFile, setProofFile] = useState(null);

  const bankAccount = {
    bank: 'BCA',
    accountNumber: '1234567890',
    accountName: 'Mie Yamin Untar',
    branch: 'Jakarta Pusat'
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(bankAccount.accountNumber);
    alert('Nomor rekening berhasil disalin!');
  };

  const handleConfirmPayment = () => {
    if (!proofFile) {
      alert('Silakan upload bukti transfer sebelum konfirmasi.');
      return;
    }

    // Simulate bank transfer confirmation
    setPaymentConfirmed(true);
    setTimeout(() => {
      alert('Transfer berhasil dikonfirmasi! Membership telah aktif. (dummy)');
      onHide();
      setPaymentConfirmed(false);
      setProofFile(null);
    }, 2000);
  };

  const resetModal = () => {
    setPaymentConfirmed(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={resetModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Transfer Bank - {tier.charAt(0).toUpperCase() + tier.slice(1)}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="bank-transfer-modal">
          {!paymentConfirmed ? (
            <>
              <FaCreditCard size={48} className="text-primary mb-4 d-block mx-auto" />
              <h5 className="text-center mb-4">Informasi Rekening Bank</h5>

              <Alert variant="info" className="mb-4">
                <Row>
                  <Col md={6}>
                    <strong>Bank:</strong> {bankAccount.bank}
                  </Col>
                  <Col md={6}>
                    <strong>Cabang:</strong> {bankAccount.branch}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}>
                    <strong>No. Rekening:</strong>
                    <div className="d-flex align-items-center">
                      <span className="me-2">{bankAccount.accountNumber}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={handleCopyAccountNumber}
                        title="Salin nomor rekening"
                      >
                        <FaCopy />
                      </Button>
                    </div>
                  </Col>
                  <Col md={6}>
                    <strong>Atas Nama:</strong> {bankAccount.accountName}
                  </Col>
                </Row>
              </Alert>

              <Alert variant="warning">
                <strong>Ringkasan Pembayaran:</strong><br />
                Membership: {tier.charAt(0).toUpperCase() + tier.slice(1)}<br />
                Total Transfer: Rp {price.toLocaleString('id-ID')}<br />
                <small className="text-muted">
                  *Pastikan jumlah transfer sesuai dengan nominal di atas
                </small>
              </Alert>

              <div className="transfer-instructions mt-4">
                <h6>Instruksi Transfer:</h6>
                <ol className="text-start">
                  <li>Buka aplikasi banking atau ATM</li>
                  <li>Pilih menu transfer</li>
                  <li>Masukkan nomor rekening: <strong>{bankAccount.accountNumber}</strong></li>
                  <li>Masukkan jumlah: <strong>Rp {price.toLocaleString('id-ID')}</strong></li>
                  <li>Konfirmasi dan selesaikan transfer</li>
                  <li>Klik "Konfirmasi Pembayaran" setelah transfer berhasil</li>
                </ol>
                <div className="mt-3">
                  <label className="form-label">Upload Bukti Transfer (screenshot)</label>
                  <input type="file" accept="image/*" className="form-control" onChange={(e) => setProofFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
                  {proofFile && <div className="mt-2"><small className="text-muted">File siap: {proofFile.name}</small></div>}
                </div>
              </div>
            </>
          ) : (
            <div className="payment-success text-center">
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
