'use client';

import { Modal, Button, Row, Col, Card } from 'react-bootstrap';
import { FaWallet, FaQrcode, FaCreditCard } from 'react-icons/fa';

const paymentMethods = [
  {
    id: 'wallet',
    name: 'Web3 Wallet',
    icon: FaWallet,
    description: 'Bayar dengan IDRX dari wallet Web3 Anda',
    available: true
  },
  {
    id: 'qris',
    name: 'QRIS',
    icon: FaQrcode,
    description: 'Pembayaran instan via QRIS',
    available: true
  },
  {
    id: 'bank',
    name: 'Transfer Bank',
    icon: FaCreditCard,
    description: 'Transfer ke rekening bank',
    available: true
  }
];

export default function PaymentMethodModal({ show, onHide, onSelectMethod, selectedTier }) {
  const handleMethodSelect = (method) => {
    if (method.available) {
      onSelectMethod(method);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Pilih Metode Pembayaran</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-4">
          <h6>Membership yang dipilih: <strong>{selectedTier?.name}</strong></h6>
          <p className="text-muted">Harga: {selectedTier?.price} IDRX</p>
        </div>

        <Row className="g-3">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <Col md={4} key={method.id}>
                <Card
                  className={`payment-method-card h-100 ${method.available ? '' : 'disabled'}`}
                  onClick={() => handleMethodSelect(method)}
                  style={{ cursor: method.available ? 'pointer' : 'not-allowed' }}
                >
                  <Card.Body className="text-center">
                    <IconComponent
                      size={32}
                      className={`mb-3 ${method.available ? 'text-primary' : 'text-muted'}`}
                    />
                    <h6 className={method.available ? '' : 'text-muted'}>{method.name}</h6>
                    <p className={`small ${method.available ? 'text-muted' : 'text-muted'}`}>
                      {method.description}
                    </p>
                    {!method.available && (
                      <small className="text-warning">Segera hadir</small>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        <div className="mt-4 p-3 bg-light rounded">
          <h6 className="mb-2">Catatan:</h6>
          <ul className="mb-0 small text-muted">
            <li>Pembayaran dengan Web3 Wallet menggunakan token IDRX</li>
            <li>QRIS menampilkan barcode dummy untuk simulasi</li>
            <li>Transfer Bank menampilkan rekening BCA Mie Yamin Untar</li>
            <li>Pastikan saldo IDRX Anda mencukupi untuk transaksi</li>
          </ul>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Batal
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
