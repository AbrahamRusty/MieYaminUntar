'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Tab, Card, Button, Badge } from 'react-bootstrap';
import { FaUser, FaHistory, FaGift, FaCog, FaSignOutAlt, FaCamera } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios'; // Import axios untuk koneksi API

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [editProfileData, setEditProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '' // Untuk perubahan kata sandi
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [token, setToken] = useState(null);


  useEffect(() => {
  const authToken = localStorage.getItem('authToken');
  const userJson = localStorage.getItem('userInfo');

  if (authToken && userJson) {
    setIsLoggedIn(true);
    setToken(authToken);

    const user = JSON.parse(userJson);
    setUserInfo(user);

    // FIX: selalu pakai fallback string '' (bukan undefined)
    setEditProfileData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      password: ''
    });

  } else {
    window.location.href = '/';
  }
}, []);
  
  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menyimpan perubahan profil ke database
  // Fungsi untuk menyimpan perubahan profil ke database
const handleSaveProfile = async () => {
    if (isSaving) return;

    // Validasi sederhana (diperkuat)
    if (!editProfileData.name) {
      toast.error('Nama wajib diisi.');
      return;
    }
    
    // Data yang akan dikirim (diperjelas)
    const dataToUpdate = {
      name: editProfileData.name,
      phone: editProfileData.phone,
      address: editProfileData.address,
      // email: editProfileData.email // BARIS INI DIHAPUS
    };
    
    // Jika password diisi, tambahkan ke payload
    if (editProfileData.password) {
      dataToUpdate.password = editProfileData.password;
    }

    setIsSaving(true);
    
    try {
      // Pastikan URL API menggunakan variabel lingkungan yang benar
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/auth/profile`;
      
      const response = await axios.put(apiUrl, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ... (Update state dan localStorage)
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      setUserInfo(response.data)

      toast.success('Profil berhasil diperbarui!');

    } catch (error) {
      console.error('Error saving profile:', error);
      // Tampilkan error yang lebih spesifik untuk membantu debugging
      const errorMessage = error.response?.data?.message || `Gagal menyimpan profil: ${error.message}. Cek backend URL Anda.`;
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    toast.success('Berhasil logout');
    window.location.href = '/';
  };

  if (!isLoggedIn) {
    return (
      <div className="dashboard-section py-5" style={{ minHeight: '80vh' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <div className="dashboard-card p-5 shadow-lg rounded-3">
                <FaUser size={64} className="text-primary mb-4" />
                <h3 className="mb-3">Akses Ditolak</h3>
                <p className="text-muted mb-4 fs-5">
                  Anda perlu login terlebih dahulu untuk mengakses dashboard.
                </p>
                <Button
                  variant=""
                  className="btn-brand-primary px-4 py-2"
                  onClick={() => window.location.href = '/'}
                >
                  Kembali ke Beranda
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const renderOverview = () => (
    <Row>
      <Col lg={8}>
        <Card className="dashboard-card mb-4">
          <Card.Body>
            <h5 className="mb-3">Informasi Akun</h5>
            <div className="user-info">
              <div className="d-flex align-items-center mb-3">
                <FaUser className="text-primary me-3" size={32} />
                <div>
                  <h6 className="mb-1">{userInfo?.name || 'Nama Pengguna'}</h6>
                  <p className="text-muted mb-0">{userInfo?.email || 'email@example.com'}</p>
                </div>
                <Badge bg="success" className="ms-auto">Aktif</Badge>
              </div>
              <div className="user-stats">
                <Row className="text-center">
                  <Col>
                    <div className="stat-number">0</div>
                    <div className="stat-label">Pesanan</div>
                  </Col>
                  <Col>
                    <div className="stat-number">0</div>
                    <div className="stat-label">Poin Loyalty</div>
                  </Col>
                  <Col>
                    <div className="stat-number">0</div>
                    <div className="stat-label">Voucher</div>
                  </Col>
                </Row>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={4}>
        <Card className="dashboard-card">
          <Card.Body>
            <h6 className="mb-3">Quick Actions</h6>
            <div className="d-grid gap-2">
              <Button variant="outline-primary" size="sm">
                <FaGift className="me-2" />
                Lihat Voucher
              </Button>
              <Button variant="outline-primary" size="sm">
                <FaHistory className="me-2" />
                Riwayat Pesanan
              </Button>
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" />
                Logout
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  return (
    <div className="dashboard-section py-5" style={{ minHeight: '80vh' }}>
      <Container>
        <Row className="mb-5">
          <Col>
            <h1 className="display-4 fw-bold text-center mb-3">Dashboard Pengguna</h1>
            <p className="text-muted text-center fs-5">Kelola akun dan pesanan Anda</p>
          </Col>
        </Row>

        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Row className="g-4">
            <Col lg={12}>
              <Nav variant="tabs" className="dashboard-tabs mb-4 justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="overview" className="px-4 py-2">
                    <FaUser className="me-2" />
                    Overview
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="orders" className="px-4 py-2">
                    <FaHistory className="me-2" />
                    Pesanan
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="rewards" className="px-4 py-2">
                    <FaGift className="me-2" />
                    Rewards
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="settings" className="px-4 py-2">
                    <FaCog className="me-2" />
                    Pengaturan
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="overview">
                  {renderOverview()}
                </Tab.Pane>
                <Tab.Pane eventKey="orders">
                  <Card className="dashboard-card shadow-lg border-0">
                    <Card.Body className="p-4">
                      <h4 className="mb-4">Riwayat Pesanan</h4>
                      <div className="text-center py-5">
                        <FaHistory size={48} className="text-muted mb-3" />
                        <p className="text-muted">Belum ada riwayat pesanan</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="rewards">
                  <Card className="dashboard-card shadow-lg border-0">
                    <Card.Body className="p-4">
                      <h4 className="mb-4">Rewards & Voucher</h4>
                      <div className="text-center py-5">
                        <FaGift size={48} className="text-muted mb-3" />
                        <p className="text-muted">Belum ada voucher tersedia</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="settings">
                  <Card className="dashboard-card shadow-lg border-0">
                    <Card.Body className="p-4">
                      <h4 className="mb-4 d-flex align-items-center">
                        <FaCog className="text-primary me-3" size={24} />
                        Settings
                      </h4>
                      <Row className="g-4">
                        <Col lg={8}>
                          <Card className="profile-form border-0 shadow-sm">
                            <Card.Body className="p-4">
                              <h5 className="mb-4">Informasi Pribadi</h5>
                              <div className="mb-3">
                                <label className="form-label fw-bold">Nama Lengkap</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Masukkan nama lengkap"
                                  name="name"
                                  value={editProfileData.name}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label fw-bold">Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="email@example.com"
                                  value={userInfo?.email || ''}
                                  name="email"
                                  onChange={handleChange}
                                  readOnly 
                                  disabled={true}
                                />
                                <div className="form-text">Email tidak dapat diubah</div>
                              </div>
                              <div className="mb-3">
                                <label className="form-label fw-bold">Nomor Telepon</label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  placeholder="+62-"
                                  name="phone"
                                  value={editProfileData.phone}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="mb-4">
                                <label className="form-label fw-bold">Alamat</label>
                                <textarea
                                  className="form-control"
                                  rows={3}
                                  placeholder="Masukkan alamat lengkap..."
                                  name="address"
                                  value={editProfileData.address}
                                  onChange={handleChange}
                                />
                              </div>
                              <Button variant="primary" className="px-4" onClick={handleSaveProfile} disabled={isSaving}>
                                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}
