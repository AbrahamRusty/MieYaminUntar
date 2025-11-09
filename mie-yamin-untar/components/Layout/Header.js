'use client';

// 1. Impor Button
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

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

  const isPricingPage = pathname === '/pricing';

  return (
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
            {/* 3. Tombol "HI Andrew" diganti "Join Loyalty" */}
            {/* 3. Tombol "HI Andrew" diganti "Join Loyalty" */}
            {!isPricingPage && (
              <Link href="/pricing" passHref>
                <Button variant="" className="btn-brand-primary ms-3">
                  Join Loyalty
                </Button>
              </Link>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
