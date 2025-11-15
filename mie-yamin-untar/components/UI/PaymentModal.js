'use client';

import { Modal, Button, Alert } from 'react-bootstrap';
import { FaCheck, FaCreditCard } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PaymentModal({ show, onHide, tier, price }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // Simulate API call to backend for membership purchase
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/loyalty/purchase-membership`, {
        tier,
        price
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setIsSuccess(true);
        toast.success('Pembelian membership berhasil!');
        setTimeout(() => {
          onHide();
          setIsSuccess(false);
        }, 2000);
      } else {
        toast.error('Pembelian membership gagal');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Transaksi gagal: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setIsSuccess(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={resetModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Pembelian Membership {tier.charAt(0).toUpperCase() + tier.slice(1)}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="payment-modal">
          {!isSuccess ? (
            <div className="step-content">
              <Alert variant="info">
                <h6>Ringkasan Pembelian</h6>
                <p className="mb-1">Membership: <strong>{tier.charAt(0).toUpperCase() + tier.slice(1)}</strong></p>
                <p className="mb-1">Harga: <strong>Rp{price.toLocaleString()}</strong></p>
                <p className="mb-0">Pembayaran akan diproses melalui sistem backend.</p>
              </Alert>
            </div>
          ) : (
            <div className="step-content text-center">
              <FaCheck size={48} className="text-success mb-3" />
              <h5>Pembelian Berhasil!</h5>
              <p>Membership {tier.charAt(0).toUpperCase() + tier.slice(1)} telah aktif.</p>
            </div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        {!isSuccess ? (
          <>
            <Button variant="secondary" onClick={resetModal}>
              Batal
            </Button>
            <Button
              variant="primary"
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Konfirmasi Pembayaran'}
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
