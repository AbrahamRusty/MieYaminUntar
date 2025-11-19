'use client';

// 1. Impor Button
import { Container, Nav, Navbar, Button, Dropdown } from 'react-bootstrap';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaSignInAlt, FaUserPlus, FaUser, FaSignOutAlt, FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For Google login state

  useEffect(() => {
    // Check if user is logged in (you can implement this based on your auth system)
    const checkLoginStatus = () => {
      // This would typically check localStorage, cookies, or make an API call
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
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

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    toast.success('Berhasil logout');
    router.push('/');
  };

  const handleOpenDashboard = () => {
    router.push('/dashboard');
  };

  const handleOpenRegister = () => {
    router.push('/register');
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

              {/* Dashboard Dropdown - Show when logged in */}
              {isLoggedIn && !isPricingPage && (
                <Dropdown className="ms-2 me-3">
                  <Dropdown.Toggle
                    variant=""
                    className="btn-outline-primary d-flex align-items-center gap-2"
                  >
                    <FaUser />
                    Dashboard
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end" className="shadow">
                    <Dropdown.Item
                      onClick={handleOpenDashboard}
                      className="d-flex align-items-center gap-2"
                    >
                      <FaUser />
                      Open Dashboard
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {/* Login/Register Buttons */}
              {!isPricingPage && (
                <div className="d-flex gap-2">
                  {!isLoggedIn ? (
                    <>
                      <Button
                        variant="outline-primary"
                        className="d-flex align-items-center gap-2"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                      >
                        <FaGoogle />
                        Login
                      </Button>
                      <Button
                        variant=""
                        className="btn-brand-primary d-flex align-items-center gap-2"
                        onClick={handleOpenRegister}
                      >
                        <FaUserPlus />
                        Register
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline-danger"
                      className="d-flex align-items-center gap-2"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt />
                      Logout
                    </Button>
                  )}
                </div>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  );
}
