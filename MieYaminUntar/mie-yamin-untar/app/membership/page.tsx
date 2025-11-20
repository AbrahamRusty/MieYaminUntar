'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Badge } from 'react-bootstrap';
import { FaCrown, FaStar, FaGem, FaWallet, FaQrcode, FaCreditCard } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PaymentModal from '@/components/UI/PaymentModal';
import PaymentMethodModal from '@/components/UI/PaymentMethodModal';
import QRISModal from '@/components/UI/QRISModal';
import BankTransferModal from '@/components/UI/BankTransferModal';

const membershipTiers = [
  {
    id: 'silver',
    name: 'Silver',
    price: 100,
    icon: FaStar,
    color: 'secondary',
    benefits: [
      'Voucher Diskon 10%',
      'Kirim Masukan',
      'Request Menu Khusus',
      'Early Access Menu Baru'
    ],
    description: 'Paket dasar untuk pengalaman mie yang lebih baik dengan diskon dan prioritas.'
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 250,
    icon: FaCrown,
    color: 'warning',
    benefits: [
      'Voucher Diskon 15%',
      'Kirim Masukan',
      'Request Menu Khusus',
      'Layanan Prioritas',
      'Mingguan Voucher Khusus'
    ],
    description: 'Paket premium dengan diskon lebih besar dan layanan prioritas untuk pelanggan setia.'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 500,
    icon: FaGem,
    color: 'primary',
    benefits: [
      'Voucher Diskon 20%',
      'Kirim Masukan',
      'Request Menu Khusus',
      'Menu Custom',
      'Layanan Prioritas Maksimal',
      'Harian Voucher Eksklusif',
      'Akses Event Spesial'
    ],
    description: 'Paket tertinggi dengan semua benefit maksimal dan akses eksklusif ke event-event spesial.'
  }
];



export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [showQRISModal, setShowQRISModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);

  const handleSubscribe = (tier: any) => {
    setSelectedTier(tier);
    setShowPaymentMethodModal(true);
  };

  const handlePaymentMethodSelect = (method: any) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethodModal(false);

    if (method.id === 'wallet') {
      setShowPaymentModal(true);
    } else if (method.id === 'qris') {
      setShowQRISModal(true);
    } else if (method.id === 'bank') {
      setShowBankTransferModal(true);
    }
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedTier(null);
    setSelectedPaymentMethod(null);
  };

  const handleCloseQRISModal = () => {
    setShowQRISModal(false);
    setSelectedTier(null);
    setSelectedPaymentMethod(null);
  };

  const handleCloseBankTransferModal = () => {
    setShowBankTransferModal(false);
    setSelectedTier(null);
    setSelectedPaymentMethod(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="membership-page py-5"
      style={{ background: 'linear-gradient(135deg, #FFF8F5 0%, #FFF2EB 100%)' }}
    >
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="display-4 fw-bold text-primary mb-3"
          >
            Membership Mie Yamin
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lead text-muted"
          >
            Dapatkan benefit eksklusif dan pengalaman kuliner yang lebih baik
          </motion.p>
        </div>

        {/* Membership Tiers */}
        <Row className="justify-content-center gy-4 mb-5">
          {membershipTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <Col lg={4} md={6} key={tier.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                >
                  <Card className={`membership-card h-100 ${tier.id === 'gold' ? 'featured' : ''}`} style={{ borderRadius: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.07)', border: '1px solid #E2E8F0', background: 'white', minHeight: '480px' }}>
                    <Card.Body className="d-flex flex-column">
                      <div className="text-center mb-4">
                        <div className={`tier-icon mb-3 text-${tier.color}`}>
                          <IconComponent size={48} />
                        </div>
                        <Card.Title className="h3 mb-2">{tier.name}</Card.Title>
                        <div className="price-display mb-3">
                          <span className="price-amount" style={{ fontSize: '2.75rem', fontWeight: '800', color: 'var(--color-dark)' }}>{tier.price}</span>
                          <span className="price-currency" style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--color-gray)' }}>IDRX</span>
                        </div>
                        <p className="text-muted small">{tier.description}</p>
                      </div>

                      <div className="benefits-list mb-4 flex-grow-1">
                        <h6 className="mb-3">Benefit Membership:</h6>
                        <ul className="list-unstyled">
                          {tier.benefits.map((benefit, idx) => (
                            <li key={idx} className="mb-2">
                              <Badge bg="light" text="dark" className="benefit-badge" style={{ borderRadius: '50px', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                ✓ {benefit}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        variant="primary"
                        size="lg"
                        className="w-100 mt-auto btn-brand-primary"
                        onClick={() => handleSubscribe(tier)}
                      >
                        Langganan Sekarang
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="info-card mx-auto" style={{ maxWidth: '600px', background: 'white', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
            <Card.Body>
              <h5 className="mb-3">Mengapa Bergabung Membership?</h5>
              <Row className="text-start">
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Diskon hingga 20%</li>
                    <li className="mb-2">✓ Prioritas layanan</li>
                    <li className="mb-2">✓ Akses menu eksklusif</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Voucher bulanan</li>
                    <li className="mb-2">✓ Request menu khusus</li>
                    <li className="mb-2">✓ Event spesial member</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>

      {/* Payment Method Modal */}
      <PaymentMethodModal
        show={showPaymentMethodModal}
        onHide={() => setShowPaymentMethodModal(false)}
        onSelectMethod={handlePaymentMethodSelect}
        selectedTier={selectedTier}
      />

      {/* Payment Modal for Web3 Wallet */}
      {selectedTier && (
        <PaymentModal
          show={showPaymentModal}
          onHide={handleClosePaymentModal}
          tier={selectedTier.id}
          price={selectedTier.price}
        />
      )}

      {/* QRIS Payment Modal */}
      {selectedTier && (
        <QRISModal
          show={showQRISModal}
          onHide={handleCloseQRISModal}
          tier={selectedTier.id}
          price={selectedTier.price}
        />
      )}

      {/* Bank Transfer Modal */}
      {selectedTier && (
        <BankTransferModal
          show={showBankTransferModal}
          onHide={handleCloseBankTransferModal}
          tier={selectedTier.id}
          price={selectedTier.price}
        />
      )}
    </motion.div>
  );
}
