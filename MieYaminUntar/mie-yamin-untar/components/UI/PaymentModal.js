
'use client';

import { Modal, Button, ProgressBar, Alert } from 'react-bootstrap';
import { FaCheck, FaSpinner, FaWallet, FaCreditCard } from 'react-icons/fa';
import { useState } from 'react';
import { useMembership } from '@/hooks/useMembership';
import toast from 'react-hot-toast';
import { useWallet } from '@/hooks/useWallet';
import { useContract } from '@/hooks/useContract';
import backend from '@/lib/backend';
import { useAuth } from '@/contexts/AuthContext';

export default function PaymentModal({ show, onHide, tier, price, method = 'idrx' }) {
  const { buyMembership, isLoading } = useMembership();
  const [step, setStep] = useState(1); // 1: Confirm, 2: Approve, 3: Purchase, 4: Complete
  const [txHash, setTxHash] = useState('');

  const { signer, isConnected } = useWallet();
  const { purchaseMembership } = useContract(signer);
  const { user } = useAuth();

  const steps = [
    { label: 'Konfirmasi Pembayaran', icon: FaCreditCard },
    { label: 'Approve IDRX', icon: FaWallet },
    { label: 'Pembelian Membership', icon: FaSpinner },
    { label: 'Selesai', icon: FaCheck }
  ];

  const handlePayment = async () => {
    // If method is wallet, use signer + contract to perform purchase
    if (method === 'wallet') {
      if (!isConnected || !signer) {
        toast.error('Silakan hubungkan wallet terlebih dahulu');
        return;
      }

      console.log(`[PaymentModal.wallet] Starting payment: tier=${tier}, price=${price}`);
      setStep(2);
      try {
        console.log('[PaymentModal.wallet] Calling purchaseMembership()...');
        const receipt = await purchaseMembership(tier);
        console.log('[PaymentModal.wallet] purchaseMembership returned:', receipt);
        
        if (receipt) {
          const hash = receipt.transactionHash || receipt.hash || '';
          console.log('[PaymentModal.wallet] Got txHash:', hash);
          setTxHash(hash);
          
          // record purchase on backend
          try {
            console.log('[PaymentModal.wallet] Recording purchase on backend...');
            await backend.createPurchaseRecord({
              userId: user?.id || null,
              method: 'wallet',
              amount: price,
              meta: { txHash: hash, tier }
            });
            console.log('[PaymentModal.wallet] Purchase recorded');
          } catch (e) {
            console.warn('[PaymentModal.wallet] Backend record failed:', e);
          }

          console.log('[PaymentModal.wallet] Moving to step 4 (complete)');
          setStep(4);
          toast.success('Pembelian membership berhasil melalui wallet!');
          setTimeout(() => {
            onHide();
            setStep(1);
          }, 1500);
        } else {
          throw new Error('Transaksi gagal atau tidak ada receipt');
        }
      } catch (err) {
        console.error('[PaymentModal.wallet] Error:', err);
        toast.error('Transaksi wallet gagal: ' + (err.message || ''));
        setStep(1);
      }
      return;
    }

    // Default: IDRX on-chain flow via buyMembership
    console.log(`[PaymentModal.idrx] Starting IDRX payment: tier=${tier}, price=${price}`);
    setStep(2);
    try {
      console.log('[PaymentModal.idrx] Calling buyMembership()...');
      const receipt = await buyMembership(tier);
      console.log('[PaymentModal.idrx] buyMembership returned:', receipt);

      if (receipt) {
        // receipt may be a boolean in old flows or a tx receipt
        const txHash = receipt.transactionHash || receipt.hash || null;
        try {
          console.log('[PaymentModal.idrx] Recording purchase...');
          await backend.createPurchaseRecord({
            userId: user?.id || null,
            method: 'idrx',
            amount: price,
            meta: { txHash, tier }
          });
          console.log('[PaymentModal.idrx] Purchase recorded');
        } catch (e) {
          console.warn('[PaymentModal.idrx] Backend record failed:', e);
        }

        setStep(4);
        toast.success('Pembelian membership berhasil!');
        setTimeout(() => {
          onHide();
          setStep(1);
        }, 2000);
      } else {
        toast.error('Saldo IDRX tidak mencukupi atau transaksi gagal');
        setStep(1);
      }
    } catch (error) {
      console.error('[PaymentModal.idrx] Error:', error);
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
