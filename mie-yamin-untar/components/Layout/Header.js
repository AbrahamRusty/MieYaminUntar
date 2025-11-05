'use client';

// 1. Impor Button
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="white" expand="lg" className="py-3 shadow-sm">
      <Container>
        {/* 2. Logo Teks dibuat Oranye */}
        <Navbar.Brand
          href="#home"
          className="fw-bold fs-4 text-brand-primary"
        >
          Mie Yamin Untar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home" className="nav-link-dark me-2">
              Home
            </Nav.Link>
            <Nav.Link href="#about" className="nav-link-dark me-2">
              About
            </Nav.Link>
            <Nav.Link href="#menu" className="nav-link-dark me-2">
              Menu
            </Nav.Link>
            <Nav.Link href="#contact" className="nav-link-dark me-3">
              Contact
            </Nav.Link>
            {/* 3. Tombol "HI Andrew" diganti "Join Loyalty" */}
            <Button variant="" className="btn-brand-primary ms-3">
              Join Loyalty
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}