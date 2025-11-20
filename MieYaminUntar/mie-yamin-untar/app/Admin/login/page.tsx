'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from '@/components/Sections/Admin_page/Admin/login';

export default function AdminLoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Simulasi login/logout
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('adminLoggedIn', 'true');
    router.push('/Admin'); // Alihkan ke dashboard setelah login
  };

  // Cek status login saat komponen mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (loggedIn) {
      router.push('/Admin');
    }
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--primary-orange)' }}>
      <LoginPage onLogin={handleLogin} />
    </div>
  );
}
