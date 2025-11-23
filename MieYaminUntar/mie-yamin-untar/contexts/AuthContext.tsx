"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  name?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mieyamin_user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.error('Failed loading auth from storage', e);
    }
  }, []);

  const login = (userData: User) => {
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

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx as AuthContextType;
}

export default AuthContext;
