"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import backend from '@/lib/backend';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mieyamin_user');
      const rawToken = localStorage.getItem('mieyamin_token');
      if (raw) setUser(JSON.parse(raw));
      if (rawToken) setToken(rawToken);
    } catch (e) {
      console.error('Failed loading auth from storage', e);
    }
  }, []);

  const save = (userData, jwt) => {
    setUser(userData);
    setToken(jwt || null);
    try {
      if (userData) localStorage.setItem('mieyamin_user', JSON.stringify(userData));
      else localStorage.removeItem('mieyamin_user');

      if (jwt) localStorage.setItem('mieyamin_token', jwt);
      else localStorage.removeItem('mieyamin_token');
    } catch (e) {
      console.error('Failed saving auth to storage', e);
    }
  };

  // Request OTP (returns backend response)
  const requestOTP = async (email) => {
    return backend.requestOTP(email);
  };

  // Verify OTP and persist token + user
  const verifyOTP = async (email, otp) => {
    const res = await backend.verifyOTP(email, otp);
    if (res && res.token && res.user) {
      save(res.user, res.token);
      return res.user;
    }
    throw new Error('Verifikasi OTP gagal');
  };

  // Wallet login: request server nonce then sign it
  const loginWithWallet = async (signer) => {
    if (!signer) throw new Error('Signer diperlukan');
    const address = await signer.getAddress();

    // request server nonce
    const { nonce } = await backend.getWalletNonce(address);
    if (!nonce) throw new Error('Gagal mendapatkan nonce dari server');

    const message = `Login to Mie Yamin Loyalty: ${nonce}`;
    const signature = await signer.signMessage(message);
    const res = await backend.walletLogin(address, signature, nonce);
    if (res && res.token && res.user) {
      save(res.user, res.token);
      return res.user;
    }
    throw new Error('Login wallet gagal');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('mieyamin_user');
      localStorage.removeItem('mieyamin_token');
    } catch (e) {
      console.error('Failed removing auth from storage', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, requestOTP, verifyOTP, loginWithWallet, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
