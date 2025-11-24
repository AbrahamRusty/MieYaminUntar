'use client';

import { Modal, Button, Row, Col, Form, Badge } from 'react-bootstrap';
import { BsTrash, BsPlus, BsDash, BsCreditCard, BsWallet, BsTruck, BsShop } from 'react-icons/bs';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWallet } from '@/hooks/useWallet';
import web3 from '@/lib/web3';
import backend from '@/lib/backend';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function CartModal({ show, onHide }) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { isConnected: walletConnected, connectWallet, signer } = useWallet();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedBank, setSelectedBank] = useState('bca');
  const [transferProof, setTransferProof] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = getTotalPrice();

  const handleCheckout = async () => {
    if (deliveryMethod === 'delivery' && !deliveryAddress.trim()) {
      toast.error('Silakan masukkan alamat pengiriman');
      return;
    }

    if (paymentMethod === 'bank' && !transferProof) {
      toast.error('Silakan upload bukti transfer untuk metode Bank Transfer');
      return;
    }

    // Handle crypto via wallet: require wallet connection and perform on-chain tx
    if (paymentMethod === 'crypto') {
      if (!walletConnected || !signer) {
        toast('Silakan hubungkan wallet untuk membayar dengan dompet crypto', { icon: '🦊' });
        await connectWallet();
        return;
      }

      setIsProcessing(true);
      try {
        const demoAmount = process.env.NEXT_PUBLIC_CRYPTO_PAYMENT_AMOUNT_ETH || '0.001';
        console.log(`[CartModal.crypto] Sending ETH payment: amount=${demoAmount}`);
        toast.loading('Memproses transaksi on-chain...');
        
        const receipt = await web3.sendEtherPayment(signer, undefined, demoAmount);
        console.log('[CartModal.crypto] Transaction receipt:', receipt);
        
        if (receipt) {
          const txHash = receipt.transactionHash || receipt.hash || '';
          console.log('[CartModal.crypto] Recording purchase on backend...');
          
          // send receipt to backend to record order
          try {
            await backend.createPurchaseRecord({
              userId: user?.id || null,
              method: 'crypto',
              amount: demoAmount,
              meta: { txHash, items: cart }
            });
            console.log('[CartModal.crypto] Purchase recorded');
          } catch (e) {
            console.warn('[CartModal.crypto] Failed to record purchase:', e);
          }
          
          toast.success('Transaksi on-chain berhasil. Pesanan ditempatkan.');
          clearCart();
          onHide();
        } else {
          throw new Error('Receipt kosong atau transaksi gagal');
        }
      } catch (error) {
        console.error('[CartModal.crypto] Error:', error);
        toast.error('Transaksi on-chain gagal: ' + (error.message || ''));
      } finally {
        setIsProcessing(false);
      }

      return;
    }

    // Non-crypto flows (qris / bank)
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (paymentMethod === 'bank') {
        // upload proof and record
        let proofUrl = null;
        if (transferProof) {
          try {
            const up = await backend.uploadProof(transferProof);
            proofUrl = up.fileUrl || null;
          } catch (e) {
            console.warn('Upload proof failed:', e);
          }
        }

        try {
          await backend.createPurchaseRecord({
            userId: user?.id || null,
            method: 'bank',
            amount: totalPrice,
            meta: { bank: selectedBank, proofUrl, items: cart }
          });
        } catch (e) {
          console.warn('Failed to record bank purchase:', e);
        }

        toast.success('Pembayaran via Bank Transfer diterima. Pesanan ditempatkan.');
      } else {
        try {
          await backend.createPurchaseRecord({
            userId: user?.id || null,
            method: 'qris',
            amount: totalPrice,
            meta: { items: cart }
          });
        } catch (e) {
          console.warn('Failed to record QRIS purchase:', e);
        }

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
                  <Form.Check
                    type="radio"
                    id="bank-radio"
                    label={<><BsCreditCard /> Bank Transfer</>}
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
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

            {/* Bank Transfer Section */}
            {paymentMethod === 'bank' && (
              <Row className="mt-3">
                <Col xs={12}>
                  <h6>Bank Transfer</h6>
                  <Form.Group className="mb-2">
                    <Form.Label>Pilih Bank</Form.Label>
                    <Form.Select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                      <option value="bca">BCA - 1234567890 (a.n. Mie Yamin Untar)</option>
                      <option value="bni">BNI - 9876543210 (a.n. Mie Yamin Untar)</option>
                      <option value="mandiri">Mandiri - 1122334455 (a.n. Mie Yamin Untar)</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="mb-3">
                    <strong>Instruksi Pembayaran:</strong>
                    <div className="mt-2">
                      Silakan transfer ke rekening berikut, kemudian upload bukti transfer (screenshot) pada form di bawah.
                    </div>
                    <div className="mt-2">
                      {selectedBank === 'bca' && (<div><strong>BCA</strong> - 1234567890</div>)}
                      {selectedBank === 'bni' && (<div><strong>BNI</strong> - 9876543210</div>)}
                      {selectedBank === 'mandiri' && (<div><strong>Mandiri</strong> - 1122334455</div>)}
                    </div>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Upload Bukti Transfer (screenshot)</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={(e) => setTransferProof(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
                    {transferProof && (<small className="text-muted">File siap diupload: {transferProof.name}</small>)}
                  </Form.Group>
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
