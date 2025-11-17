// components/sections/Login.js
'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios'; 
// Tidak ada import styling di sini, karena menggunakan global CSS

const LoginSection = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        const response = await axios.post('/api/auth/login', {
            email,
            password,
        });

        // Ambil data yang dibutuhkan dari respons
        const { token, name, email: userEmail, _id, phone, address } = response.data;

        // Siapkan data user untuk disimpan
        const userInfoData = {
            _id,
            name,
            email: userEmail,
            phone, 
            address,
        };

        // 1. Simpan Token dan Info User dengan KEY yang Diharapkan oleh Dashboard
        localStorage.setItem('authToken', token); // Menyimpan token sebagai 'authToken'
        localStorage.setItem('userInfo', JSON.stringify(userInfoData)); // Menyimpan data user sebagai 'userInfo'

        // 2. Redirect ke halaman Dashboard
        window.location.href = '/dashboard'; // MENGARAHKAN KE DASHBOARD

    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Gagal login. Periksa koneksi atau kredensial Anda.';
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
};

    return (
        // Menggunakan class CSS Global: login-card
        <div className="login-card">
            
            <h1 className="login-header-title">Selamat Datang Kembali!</h1>
            <p className="login-header-subtitle">Masuk untuk menikmati akses member dan layanan prioritas.</p>
            
            {error && (
                <div className="login-error-message" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <form onSubmit={handleLogin}>
                
                <div className="login-form-group">
                    <label htmlFor="email" className="login-form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email.anda@example.com"
                        className="login-form-input" 
                    />
                </div>

                <div className="login-form-group">
                    <label htmlFor="password" className="login-form-label">Kata Sandi</label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        className="login-form-input" 
                    />
                    <div className="login-forgot-password-link">
                        <Link href="/forgot-password">
                            Lupa Kata Sandi?
                        </Link>
                    </div>
                </div>
                
                <div className="login-form-group">
                    <button
                        type="submit"
                        disabled={loading}
                        className="login-submit-button"
                    >
                        {loading ? 'Memproses...' : 'Masuk'}
                    </button>
                </div>
            </form>

            <div className="login-footer-text">
                <p>
                    Belum punya akun?{' '}
                    <Link href="/register" className="login-footer-link">
                        Daftar Sekarang
                    </Link>
                </p>
            </div>
            
        </div>
    );
};

export default LoginSection;