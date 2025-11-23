"use client";

import * as React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'register' && !name) {
      toast.error('Nama wajib diisi untuk registrasi');
      return;
    }

    if (!email) {
      toast.error('Email wajib diisi');
      return;
    }

    // Simple client-side auth stub: in real app call backend
    const userData = {
      name: mode === 'register' ? name : (name || email.split('@')[0]),
      email,
    };

    (userData);
    toast.success(mode === 'register' ? 'Registrasi berhasil' : 'Login berhasil');

    // Redirect to home after small delay
    setTimeout(() => router.push('/'), 600);
  };

  return (
    <Container className="py-5" style={{ minHeight: '70vh' }}>
      <Row className="justify-content-center">
        <Col lg={6}>
          <div className="p-4 shadow-sm rounded bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>{mode === 'login' ? 'Login' : 'Register'}</h3>
              <div>
                <Button variant={mode === 'login' ? 'outline-primary' : 'primary'} className="me-2" onClick={() => setMode('login')}>Login</Button>
                <Button variant={mode === 'register' ? 'outline-primary' : 'primary'} onClick={() => setMode('register')}>Register</Button>
              </div>
            </div>

            <Form onSubmit={handleSubmit}>
              {mode === 'register' && (
                <Form.Group className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap" />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@domain.com" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" className="btn-brand-primary">{mode === 'login' ? 'Login' : 'Register'}</Button>
              </div>
            </Form>

            <hr />
            <div className="text-center">
              <small className="text-muted">Autentikasi ini adalah contoh client-side. Untuk integrasi nyata, hubungkan ke backend.</small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
