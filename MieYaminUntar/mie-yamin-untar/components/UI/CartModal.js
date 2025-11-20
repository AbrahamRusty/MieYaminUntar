'use client';

import { Modal, Button, Row, Col, Form, Badge } from 'react-bootstrap';
import { BsTrash, BsPlus, BsDash, BsCreditCard, BsWallet, BsTruck, BsShop } from 'react-icons/bs';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import toast from 'react-hot-toast';

export default function CartModal({ show, onHide }) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = getTotalPrice();

  const handleCheckout = async () => {
    if (deliveryMethod === 'delivery' && !deliveryAddress.trim()) {
      toast.error('Silakan masukkan alamat pengiriman');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (paymentMethod === 'crypto') {
        toast.success('Pembayaran dengan dompet crypto dimulai!');
      } else {
        toast.success('Pembayaran berhasil! Pesanan ditempatkan.');
      }

      clearCart();
      onHide();
    } catch (error) {
      toast.error('Pembayaran gagal. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Keranjang Anda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p className="text-center text-muted">Keranjang Anda kosong</p>
        ) : (
          <>
            {/* Cart Items */}
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {cart.map((item) => (
                <Row key={item.title} className="align-items-center mb-3 p-2 border-bottom">
                  <Col xs={6}>
                    <h6 className="mb-1">{item.title}</h6>
                    <small className="text-muted">{item.description}</small>
                  </Col>
                  <Col xs={2} className="text-center">
                    <div className="d-flex align-items-center justify-content-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.title, item.quantity - 1)}
                      >
                        <BsDash />
                      </Button>
                      <Badge bg="secondary" className="mx-2">{item.quantity}</Badge>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.title, item.quantity + 1)}
                      >
                        <BsPlus />
                      </Button>
                    </div>
                  </Col>
                  <Col xs={3} className="text-end">
                    <div className="fw-bold">Rp{(parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity).toLocaleString()}</div>
                  </Col>
                  <Col xs={1}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.title)}
                    >
                      <BsTrash />
                    </Button>
                  </Col>
                </Row>
              ))}
            </div>

            {/* Total */}
            <Row className="mt-3 pt-3 border-top">
              <Col xs={9} className="text-end fw-bold">
                Total: Rp{totalPrice.toLocaleString()}
              </Col>
              <Col xs={3}></Col>
            </Row>

            {/* Delivery Options */}
            <Row className="mt-4">
              <Col xs={12}>
                <h6>Metode Pengiriman</h6>
                <div>
                  <Form.Check
                    type="radio"
                    id="pickup-radio"
                    label={<><BsShop /> Ambil di toko</>}
                    name="deliveryMethod"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    id="delivery-radio"
                    label={<><BsTruck /> Antar ke rumah</>}
                    name="deliveryMethod"
                    value="delivery"
                    checked={deliveryMethod === 'delivery'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                </div>
                {deliveryMethod === 'delivery' && (
                  <Form.Group className="mt-3">
                    <Form.Label>Alamat Pengiriman</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Masukkan alamat lengkap pengiriman"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      required
                    />
                  </Form.Group>
                )}
              </Col>
            </Row>

            {/* Payment Options */}
            <Row className="mt-4">
              <Col xs={12}>
                <h6>Metode Pembayaran</h6>
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
                    id="crypto-radio"
                    label={<><BsWallet /> Dompet Crypto (IDRX)</>}
                    name="paymentMethod"
                    value="crypto"
                    checked={paymentMethod === 'crypto'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </div>
              </Col>
            </Row>

            {/* QRIS Display */}
            {paymentMethod === 'qris' && (
              <Row className="mt-3">
                <Col xs={12} className="text-center">
                  <h6>Scan Kode QRIS</h6>
                  <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', display: 'inline-block' }}>
                    <img src="https://via.placeholder.com/200x200?text=QRIS+Barcode" alt="QRIS Barcode" style={{ width: '200px', height: '200px' }} />
                  </div>
                  <p className="mt-2">Scan kode QR ini dengan aplikasi e-wallet Anda</p>
                </Col>
              </Row>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Tutup
        </Button>
        {cart.length > 0 && (
          <Button
            variant="primary"
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? 'Memproses...' : 'Checkout'}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
