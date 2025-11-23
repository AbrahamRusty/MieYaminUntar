'use client';

import { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Card, Button, Badge } from 'react-bootstrap';
import { FaWallet, FaHistory, FaGift, FaCrown, FaArrowUp, FaCoins, FaStar, FaUser, FaCamera } from 'react-icons/fa';
import { useWallet } from '@/hooks/useWallet';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useMembership } from '@/hooks/useMembership';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { account, isConnected, connectWallet } = useWallet();
  const { user } = useAuth();
  const router = useRouter();
  const { membershipInfo, idrxBalance, buyMembership, getTierBenefits, isLoading, loadMembershipData } = useMembership();
  const [activeTab, setActiveTab] = useState('overview');
  const [membershipPayment, setMembershipPayment] = useState({});

  if (!isConnected && !user) {
    return (
      <div className="dashboard-section py-5" style={{ minHeight: '80vh' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <div className="dashboard-card p-5 shadow-lg rounded-3">
                <FaWallet size={64} className="text-primary mb-4" />
                <h3 className="mb-3">Hubungkan Wallet Anda</h3>
                <p className="text-muted mb-4 fs-5">
                  Untuk mengakses dashboard loyalty, Anda perlu menghubungkan wallet terlebih dahulu.
                </p>
                <Button
                  variant=""
                  className="btn-brand-primary px-4 py-2"
                  onClick={connectWallet}
                >
                  <FaWallet className="me-2" />
                  Connect Wallet
                </Button>
                <div className="mt-3">
                  <Button variant="outline-primary" className="me-2" onClick={() => router.push('/auth')}>Login / Register</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const handleBuyMembership = async (tier) => {
    const mp = membershipPayment[tier] || { method: 'idrx', proof: null };

    // IDRX on-chain flow (existing)
    if (mp.method === 'idrx') {
      const success = await buyMembership(tier);
      if (success) {
        toast.success(`Membership ${tier} berhasil dibeli dengan IDRX!`);
      }
      return;
    }

    // Wallet flow: simulate web3 transaction (dummy)
    if (mp.method === 'wallet') {
      if (!isConnected) {
        toast('Silakan hubungkan wallet untuk membayar dengan dompet crypto', { icon: '🦊' });
        await connectWallet();
        return;
      }

      toast.loading('Memproses transaksi wallet (dummy)...');
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast.success(`Pembayaran membership ${tier} via wallet berhasil (dummy).`);
        // Try reloading membership data if wallet connected
        try { await loadMembershipData(); } catch (e) { /* ignore */ }
      } catch (e) {
        toast.error('Transaksi wallet gagal');
      }
      return;
    }

    // Bank transfer flow: require proof upload
    if (mp.method === 'bank') {
      if (!mp.proof) {
        toast.error('Silakan upload bukti transfer untuk pembayaran membership');
        return;
      }

      // Simulate upload and verification
      toast.loading('Mengunggah bukti transfer...');
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success(`Pembayaran membership ${tier} via bank diterima (dummy).`);
        try { await loadMembershipData(); } catch (e) { /* ignore */ }
      } catch (e) {
        toast.error('Gagal memproses bukti transfer');
      }
      return;
    }
  };

  const renderOverview = () => (
    <Row>
      {/* User Info Section */}
      <Col lg={4}>
        <Card className="dashboard-card mb-4">
          <Card.Body>
            <h5 className="mb-3 d-flex align-items-center">
              <FaUser className="me-2" />
              Informasi Pengguna
            </h5>
            <div className="text-center mb-3">
              <div className="profile-avatar mb-2">
                <div className="avatar-circle mx-auto mb-3" style={{ width: '96px', height: '96px', borderRadius: '50%', backgroundColor: '#ddd' }}>
                  <FaUser size={48} className="text-muted" />
                </div>
                <Button variant="outline-primary" size="sm">
                  <FaCamera className="me-2" />
                  Ubah Foto
                </Button>
              </div>
            </div>
            <div className="mb-2">
              <strong>Nama:</strong>
              <div>John Doe</div>
            </div>
            <div className="mb-2">
              <strong>Email:</strong>
              <div>john.doe@example.com</div>
            </div>
            <div className="mb-2">
              <strong>No. Telepon:</strong>
              <div>+62 812 3456 7890</div>
            </div>
            <div>
              <strong>Bio:</strong>
              <div>Saya suka mie ayam dan kopi.</div>
            </div>
            <div className="mt-3 text-center">
              <Button
                variant=""
                className="btn-brand-primary"
                onClick={() => setActiveTab('settings')}
              >
                <FaUser className="me-2" />
                Ubah Profile
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Membership Status Section */}
      <Col lg={4}>
        <Card className="dashboard-card mb-4">
          <Card.Body>
            <h5 className="mb-3 d-flex align-items-center">
              <FaCrown className="text-warning me-2" />
              Status Membership
            </h5>
            {membershipInfo ? (
              <div className="membership-status">
                <div className="d-flex align-items-center mb-3">
                  <div className={`nft-card tier-${membershipInfo.tier.toLowerCase()} p-3 rounded-3 text-center me-3`}>
                    <FaCrown size={32} className="text-warning mb-2" />
                    <div className="nft-title fw-bold">{membershipInfo.tier}</div>
                    <small className="text-muted">NFT #{membershipInfo.tokenId}</small>
                  </div>
                  <div>
                    <span className="fw-bold fs-5">{membershipInfo.tier} Member</span>
                    <Badge bg="success" className="ms-2 fs-6">Aktif</Badge>
                  </div>
                </div>
                <div className="benefits-list">
                  {getTierBenefits(membershipInfo.tier) && (
                    <ul className="list-unstyled">
                      <li>💰 Diskon: {getTierBenefits(membershipInfo.tier).discount}</li>
                      <li>🎁 Voucher: {getTierBenefits(membershipInfo.tier).vouchers}</li>
                      <li>⭐ Prioritas: {getTierBenefits(membershipInfo.tier).priority}</li>
                      {getTierBenefits(membershipInfo.tier).customMenu && (
                        <li>🍽️ Custom Menu Request</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted mb-3">Anda belum memiliki membership</p>
                <Button
                  variant=""
                  className="btn-brand-primary"
                  onClick={() => setActiveTab('membership')}
                >
                  Beli Membership Sekarang
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>

      {/* Loyalty Points and Quick Actions Section */}
      <Col lg={4}>
        <Card className="dashboard-card mb-4">
          <Card.Body>
            <h5 className="mb-3 d-flex align-items-center">
              <FaCoins className="text-warning me-2" />
              Loyalty Points
            </h5>
            <div className="d-flex align-items-center mb-3">
              <div className="points-display me-4">
                <span className="display-4 fw-bold text-warning">{idrxBalance}</span>
                <span className="fs-5 text-muted ms-2">Points</span>
              </div>
              <div className="points-progress flex-grow-1">
                <small className="text-muted d-block">Progress to next tier</small>
                <div className="progress mt-2" style={{ height: '8px' }}>
                  <div className="progress-bar bg-warning" style={{ width: '0%' }}></div>
                </div>
                <small className="text-muted mt-1 d-block">0 / 1000 points to Silver</small>
              </div>
            </div>
            <div className="d-grid gap-2">
              <Button variant="outline-primary" size="sm">
                <FaGift className="me-2" />
                Klaim Voucher
              </Button>
              <Button variant="outline-primary" size="sm">
                <FaHistory className="me-2" />
                Riwayat Transaksi
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  const renderMembership = () => (
    <Row className="g-4">
      <Col xs={12}>
        <h4 className="mb-4">Pilih Tingkatan Membership</h4>
      </Col>

      {['silver', 'gold', 'platinum'].map((tier) => {
        const benefits = getTierBenefits(tier);
        const prices = { silver: 100, gold: 250, platinum: 500 };
        const isCurrentTier = membershipInfo?.tier.toLowerCase() === tier;

        return (
          <Col lg={4} md={6} key={tier} className="mb-4">
            <Card className={`membership-tier-card ${tier} ${isCurrentTier ? 'current' : ''} shadow-lg border-0 h-100`}>
              <Card.Body className="d-flex flex-column h-100 p-4">
                <div className="tier-header mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="tier-name mb-0">{tier.charAt(0).toUpperCase() + tier.slice(1)}</h5>
                    {isCurrentTier && <Badge bg="success" className="fs-6">Current</Badge>}
                  </div>
                </div>

                <div className="tier-price mb-4">
                  <span className="display-5 fw-bold text-primary">{prices[tier]}</span>
                  <span className="fs-6 text-muted ms-2">IDRX</span>
                </div>

                <ul className="tier-benefits list-unstyled mb-4 flex-grow-1">
                  <li className="mb-3 d-flex align-items-center">
                    <FaStar className="text-warning me-2" size={16} />
                    <span>Diskon: {benefits.discount}</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <FaGift className="text-success me-2" size={16} />
                    <span>Voucher: {benefits.vouchers}</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <FaCrown className="text-primary me-2" size={16} />
                    <span>Prioritas: {benefits.priority}</span>
                  </li>
                  {benefits.customMenu && (
                    <li className="mb-3 d-flex align-items-center">
                      <FaStar className="text-gold me-2" size={16} />
                      <span>Custom Menu Request</span>
                    </li>
                  )}
                </ul>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Metode Pembayaran</label>
                  <div className="d-flex gap-2 mb-2">
                    <div>
                      <input
                        type="radio"
                        name={`pay-${tier}`}
                        id={`pay-${tier}-idrx`}
                        value="idrx"
                        checked={(membershipPayment[tier]?.method || 'idrx') === 'idrx'}
                        onChange={() => setMembershipPayment(prev => ({ ...prev, [tier]: { ...(prev[tier]||{}), method: 'idrx' } }))}
                      />
                      <label className="ms-1">IDRX</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name={`pay-${tier}`}
                        id={`pay-${tier}-wallet`}
                        value="wallet"
                        checked={(membershipPayment[tier]?.method || '') === 'wallet'}
                        onChange={() => setMembershipPayment(prev => ({ ...prev, [tier]: { ...(prev[tier]||{}), method: 'wallet' } }))}
                      />
                      <label className="ms-1">Web3 Wallet</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name={`pay-${tier}`}
                        id={`pay-${tier}-bank`}
                        value="bank"
                        checked={(membershipPayment[tier]?.method || '') === 'bank'}
                        onChange={() => setMembershipPayment(prev => ({ ...prev, [tier]: { ...(prev[tier]||{}), method: 'bank' } }))}
                      />
                      <label className="ms-1">Bank Transfer</label>
                    </div>
                  </div>

                  {membershipPayment[tier]?.method === 'bank' && (
                    <div>
                      <label className="form-label small">Upload Bukti Transfer (screenshot)</label>
                      <input type="file" accept="image/*" className="form-control" onChange={(e) => {
                        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                        setMembershipPayment(prev => ({ ...prev, [tier]: { ...(prev[tier]||{}), proof: file } }));
                      }} />
                      {membershipPayment[tier]?.proof && <small className="text-muted">File: {membershipPayment[tier].proof.name}</small>}
                    </div>
                  )}
                </div>

                <Button
                  variant=""
                  className="btn-brand-primary w-100 mt-auto"
                  disabled={isCurrentTier || isLoading}
                  onClick={() => handleBuyMembership(tier)}
                >
                  {isCurrentTier ? 'Membership Aktif' : `Beli ${tier.charAt(0).toUpperCase() + tier.slice(1)}`}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );

  return (
    <div className="dashboard-section py-5" style={{ minHeight: '80vh' }}>
      <Container>
        <Row className="mb-5">
          <Col>
            <h1 className="display-4 fw-bold text-center mb-3">Dashboard Loyalty</h1>
            <p className="text-muted text-center fs-5">Kelola membership dan rewards Anda</p>
          </Col>
        </Row>

        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Nav variant="tabs" className="dashboard-tabs mb-4 justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="overview" className="px-4 py-2">
                <FaWallet className="me-2" />
                Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="transactions" className="px-4 py-2">
                <FaHistory className="me-2" />
                Transaksi
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="rewards" className="px-4 py-2">
                <FaGift className="me-2" />
                Rewards
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="membership" className="px-4 py-2">
                <FaCrown className="me-2" />
                Membership
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="upgrade" className="px-4 py-2">
                <FaArrowUp className="me-2" />
                Upgrade
              </Nav.Link>
            </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="settings" className="px-4 py-2">
              <FaUser className="me-2" />
              Settings
            </Nav.Link>
          </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="overview">
              {renderOverview()}
            </Tab.Pane>
            <Tab.Pane eventKey="transactions">
              <Card className="dashboard-card shadow-lg border-0">
                <Card.Body className="p-4">
                  <h4 className="mb-4">Riwayat Transaksi</h4>
                  <div className="transaction-list">
                    {[
                      { date: '2024-01-15', type: 'Purchase', amount: '50 IDRX', status: 'Completed' },
                      { date: '2024-01-10', type: 'Reward', amount: '+100 Points', status: 'Earned' },
                      { date: '2024-01-05', type: 'Membership', amount: '250 IDRX', status: 'Completed' },
                      { date: '2023-12-28', type: 'Purchase', amount: '75 IDRX', status: 'Completed' },
                      { date: '2023-12-20', type: 'Reward', amount: '+50 Points', status: 'Earned' }
                    ].map((tx, index) => (
                      <div key={index} className="transaction-item d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                          <div className="fw-bold">{tx.type}</div>
                          <small className="text-muted">{tx.date}</small>
                        </div>
                        <div className="text-end">
                          <div className={`fw-bold ${tx.amount.startsWith('+') ? 'text-success' : ''}`}>{tx.amount}</div>
                          <Badge bg={tx.status === 'Completed' ? 'success' : 'info'} className="mt-1">{tx.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Tab.Pane>
            <Tab.Pane eventKey="rewards">
              <Card className="dashboard-card shadow-lg border-0">
                <Card.Body className="p-4">
                  <h4 className="mb-4">Rewards & Voucher</h4>
                  <Row className="g-3">
{[
  { title: 'Diskon 10%', desc: 'Untuk semua menu', expiry: '2024-02-01', type: 'discount' },
  { title: 'Free Mie Ayam', desc: '1 porsi gratis', expiry: '2024-01-30', type: 'free' },
  { title: 'Bonus Points', desc: '+50 loyalty points', expiry: '2024-03-01', type: 'points' }
].map((reward, index) => {
  let className = "mb-3 ";
  if (reward.type === 'discount') className += "text-success";
  else if (reward.type === 'free') className += "text-warning";
  else className += "text-primary";

  return (
    <Col md={4} key={index}>
      <Card className="reward-card h-100 border-0 shadow-sm">
        <Card.Body className="text-center p-3">
          <FaGift size={32} className={className} />
          <h6 className="fw-bold">{reward.title}</h6>
          <p className="text-muted small mb-2">{reward.desc}</p>
          <small className="text-muted">Expires: {reward.expiry}</small>
          <br />
          <Button variant="outline-primary" size="sm" className="mt-2">Claim</Button>
        </Card.Body>
      </Card>
    </Col>
  );
})}
                  </Row>
                </Card.Body>
              </Card>
            </Tab.Pane>
            <Tab.Pane eventKey="membership">
              {renderMembership()}
            </Tab.Pane>
            <Tab.Pane eventKey="upgrade">
              <Card className="dashboard-card shadow-lg border-0">
                <Card.Body className="p-4">
                  <h4 className="mb-4">Upgrade Membership</h4>
                  <Row className="g-4">
{[
  { tier: 'Silver', price: '100 IDRX', benefits: ['10% discount', 'Monthly vouchers', 'Standard priority'], current: false },
  { tier: 'Gold', price: '250 IDRX', benefits: ['15% discount', 'Weekly vouchers', 'Priority queue'], current: false },
  { tier: 'Platinum', price: '500 IDRX', benefits: ['20% discount', 'Daily vouchers', 'Max priority', 'Custom menu'], current: false }
].map((upgrade, index) => {
  let cardClass = "upgrade-card h-100 border-0 shadow-sm ";
  cardClass += upgrade.current ? "border-primary" : "";

  let nftClass = `nft-card tier-${upgrade.tier.toLowerCase()} p-3 rounded-3 d-inline-block`;

  return (
    <Col md={4} key={index}>
      <Card className={cardClass}>
        <Card.Body className="text-center p-4 d-flex flex-column h-100">
          <div className="nft-preview mb-3">
            <div className={nftClass}>
              <FaCrown size={24} className="text-warning mb-1" />
              <div className="fw-bold small">{upgrade.tier}</div>
            </div>
          </div>
          <h5 className="fw-bold">{upgrade.tier} Membership</h5>
          <div className="price-display my-3">
            <span className="display-6 fw-bold text-primary">{upgrade.price}</span>
          </div>
          <ul className="list-unstyled mb-4 flex-grow-1">
            {upgrade.benefits.map((benefit, i) => (
              <li key={i} className="mb-2 small d-flex align-items-center justify-content-center">
                <FaStar className="text-warning me-2" size={12} />
                {benefit}
              </li>
            ))}
          </ul>
          <Button variant="primary" className="w-100 mt-auto">Upgrade to {upgrade.tier}</Button>
        </Card.Body>
      </Card>
    </Col>
  );
})}
                  </Row>
                </Card.Body>
              </Card>
            </Tab.Pane>
            <Tab.Pane eventKey="settings">
              <Card className="dashboard-card mb-4">
                <Card.Body>
                  <h5 className="mb-3">Edit Profile</h5>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Nama</label>
                      <input id="name" type="text" className="form-control" placeholder="John Doe" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input id="email" type="email" className="form-control" placeholder="john.doe@example.com" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">No. Telepon</label>
                      <input id="phone" type="tel" className="form-control" placeholder="+62 812 3456 7890" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label">Bio</label>
                      <textarea id="bio" className="form-control" rows={3} placeholder="Saya suka mie ayam dan kopi." />
                    </div>
                    <Button type="submit" className="btn-brand-primary">Save Changes</Button>
                  </form>
                </Card.Body>
              </Card>
            </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
}
