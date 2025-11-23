"use client";

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mieyamin_user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.error('Failed loading auth from storage', e);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('mieyamin_user', JSON.stringify(userData));
    } catch (e) {
      console.error('Failed saving user to storage', e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('mieyamin_user');
    } catch (e) {
      console.error('Failed removing user from storage', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
