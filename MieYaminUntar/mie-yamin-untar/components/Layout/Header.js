'use client';

// 1. Impor Button
import { Container, Nav, Navbar, Button, Dropdown } from 'react-bootstrap';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FaWallet, FaSignOutAlt, FaGoogle, FaUser, FaTrophy, FaCoins, FaCrown } from 'react-icons/fa';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import toast from 'react-hot-toast';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { user, logout: authLogout } = useAuth();

  // Only call useWeb3Modal after component has mounted
  const { open } = mounted ? useWeb3Modal() : { open: () => {} };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (hash) => {
    if (pathname !== '/') {
      router.push(`/${hash}`);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Redirect to backend Google OAuth
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/auth/google`;
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Gagal login dengan Google');
      setIsLoading(false);
    }
  };

  const handleWalletLogin = async () => {
    if (!mounted) return;

    setIsLoading(true);
    try {
      await open();
      // Modal will close automatically when wallet connects
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast.error('Gagal koneksi wallet');
      setIsLoading(false);
    } finally {
      // Reset loading state after a short delay
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const handleAuthLogout = () => {
    authLogout();
  };

  const handleOpenDashboard = () => {
    router.push('/dashboard');
  };

  const handleShowLoyaltyPoints = () => {
    toast('Loyalty Points: 0 points');
  };

  const handleShowCurrentTier = () => {
    toast('Current Tier: No Membership');
  };

  const isPricingPage = pathname === '/pricing';

  return (
    <>
      <Navbar bg="white" expand="lg" className="py-3 shadow-sm fixed-top">
        <Container>
          {/* 2. Logo Teks dibuat Oranye */}
          <Navbar.Brand
            onClick={() => handleNavClick('#home')}
            className="fw-bold fs-4 text-brand-primary"
            style={{ cursor: 'pointer' }}
          >
            Mie Yamin Untar
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link onClick={() => handleNavClick('#home')} className="nav-link-dark me-2" style={{ cursor: 'pointer' }}>
                Home
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick('#about')} className="nav-link-dark me-2" style={{ cursor: 'pointer' }}>
                About
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick('#menu')} className="nav-link-dark me-2" style={{ cursor: 'pointer' }}>
                Menu
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick('#lokasi')} className="nav-link-dark me-3" style={{ cursor: 'pointer' }}>
                Contact
              </Nav.Link>

              {/* Dashboard Dropdown - Show when connected (wallet OR auth) */}
              {(isConnected || user) && !isPricingPage && (
                <Dropdown className="ms-2 me-3">
                  <Dropdown.Toggle
                    variant=""
                    className="btn-outline-primary d-flex align-items-center gap-2"
                  >
                    <FaTrophy />
                    Dashboard
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end" className="shadow">
                    <Dropdown.Item
                      onClick={handleOpenDashboard}
                      className="d-flex align-items-center gap-2"
                    >
                      <FaTrophy />
                      Open Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={handleShowLoyaltyPoints}
                      className="d-flex align-items-center gap-2"
                    >
                      <FaCoins />
                      Loyalty Points
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={handleShowCurrentTier}
                      className="d-flex align-items-center gap-2"
                    >
                      <FaCrown />
                      Current Tier
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {/* If logged in via local auth, show greeting */}
              {user && (
                <div className="me-3 d-none d-lg-flex align-items-center">
                  <span className="fw-semibold">Hi, {user.name}</span>
                  <Button variant="link" className="ms-3 p-0 small" onClick={handleAuthLogout}>Logout</Button>
                </div>
              )}

              {/* 3. Dropdown untuk Connect Wallet */}
              {!isPricingPage && (
                <Dropdown className="ms-3">
                  <Dropdown.Toggle
                    variant=""
                    className="btn-brand-primary d-flex align-items-center gap-2"
                    disabled={isLoading}
                  >
                    {isConnected ? (
                      <>
                        <FaSignOutAlt />
                        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Disconnect'}
                      </>
                    ) : (
                      <>
                        <FaWallet />
                        Connect Wallet
                      </>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end" className="shadow">
                    {!isConnected ? (
                      <>
                        <Dropdown.Item
                          onClick={handleGoogleLogin}
                          disabled={isLoading}
                          className="d-flex align-items-center gap-2"
                        >
                          <FaGoogle />
                          Masuk dengan Google
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => router.push('/auth')}
                          className="d-flex align-items-center gap-2"
                        >
                          <FaUser />
                          Login / Register
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          onClick={handleWalletLogin}
                          disabled={isLoading}
                          className="d-flex align-items-center gap-2"
                        >
                          <FaWallet />
                          Masuk dengan Wallet
                        </Dropdown.Item>
                      </>
                    ) : (
                      <Dropdown.Item
                        onClick={handleDisconnect}
                        className="d-flex align-items-center gap-2 text-danger"
                      >
                        <FaSignOutAlt />
                        Disconnect Wallet
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  );
}
