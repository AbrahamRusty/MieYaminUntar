'use client';

import { Modal, Button, ProgressBar, Alert } from 'react-bootstrap';
import { FaCheck, FaSpinner, FaWallet, FaCreditCard } from 'react-icons/fa';
import { useState } from 'react';
import { useMembership } from '@/hooks/useMembership';
import toast from 'react-hot-toast';

export default function PaymentModal({ show, onHide, tier, price }) {
  const { buyMembership, isLoading } = useMembership();
  const [step, setStep] = useState(1); // 1: Confirm, 2: Approve, 3: Purchase, 4: Complete
  const [txHash, setTxHash] = useState('');

  const steps = [
    { label: 'Konfirmasi Pembayaran', icon: FaCreditCard },
    { label: 'Approve IDRX', icon: FaWallet },
    { label: 'Pembelian Membership', icon: FaSpinner },
    { label: 'Selesai', icon: FaCheck }
  ];

  const handlePayment = async () => {
    setStep(2);

    try {
      // This will handle both approval and purchase internally
      const success = await buyMembership(tier);

      if (success) {
        setStep(4);
        toast.success('Pembelian membership berhasil!');
        setTimeout(() => {
          onHide();
          setStep(1);
        }, 2000);
      } else {
        // If payment fails due to insufficient balance, show error
        toast.error('Saldo IDRX tidak mencukupi atau transaksi gagal');
        setStep(1);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Transaksi gagal: ' + error.message);
      setStep(1);
    }
  };

  const resetModal = () => {
    setStep(1);
    setTxHash('');
    onHide();
  };

  const getProgress = () => {
    switch (step) {
      case 1: return 25;
      case 2: return 50;
      case 3: return 75;
      case 4: return 100;
      default: return 0;
    }
  };

  return (
    <Modal show={show} onHide={resetModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Pembelian Membership {tier.charAt(0).toUpperCase() + tier.slice(1)}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="payment-modal">
          {/* Progress Bar */}
          <div className="mb-4">
            <ProgressBar now={getProgress()} className="mb-3" />
            <div className="d-flex justify-content-between">
              {steps.map((stepInfo, index) => {
                const stepNumber = index + 1;
                const IconComponent = stepInfo.icon;
                const isActive = stepNumber === step;
                const isCompleted = stepNumber < step;

                return (
                  <div key={stepNumber} className="text-center" style={{ flex: 1 }}>
                    <div className={`step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                      <IconComponent />
                    </div>
                    <small className="step-label">{stepInfo.label}</small>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div className="step-content">
              <Alert variant="info">
                <h6>Ringkasan Pembelian</h6>
                <p className="mb-1">Membership: <strong>{tier.charAt(0).toUpperCase() + tier.slice(1)}</strong></p>
                <p className="mb-1">Harga: <strong>{price} IDRX</strong></p>
                <p className="mb-0">Pastikan saldo IDRX Anda mencukupi untuk transaksi ini.</p>
              </Alert>
            </div>
          )}

          {step === 2 && (
            <div className="step-content text-center">
              <FaWallet size={48} className="text-primary mb-3" />
              <h5>Menyetujui Penggunaan IDRX</h5>
              <p>Mengizinkan kontrak untuk menggunakan token IDRX Anda...</p>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content text-center">
              <FaSpinner size={48} className="text-primary mb-3 spinning" />
              <h5>Memproses Pembelian</h5>
              <p>Membership sedang dibuat dan NFT dikirim ke wallet Anda...</p>
            </div>
          )}

          {step === 4 && (
            <div className="step-content text-center">
              <FaCheck size={48} className="text-success mb-3" />
              <h5>Pembelian Berhasil!</h5>
              <p>Membership {tier.charAt(0).toUpperCase() + tier.slice(1)} telah aktif.</p>
              {txHash && (
                <small className="text-muted">
                  Transaction Hash: {txHash.substring(0, 10)}...{txHash.substring(txHash.length - 8)}
                </small>
              )}
            </div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        {step === 1 && (
          <>
            <Button variant="secondary" onClick={resetModal}>
              Batal
            </Button>
            <Button
              variant="primary"
              onClick={handlePayment}
              disabled={isLoading}
            >
              Konfirmasi Pembayaran
            </Button>
          </>
        )}

        {(step === 2 || step === 3) && (
          <Button variant="secondary" disabled>
            <FaSpinner className="spinning me-2" />
            Memproses...
          </Button>
        )}

        {step === 4 && (
          <Button variant="primary" onClick={resetModal}>
            Tutup
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
