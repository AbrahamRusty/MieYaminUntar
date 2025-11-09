'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Admin/Layout';
import AdminDashboard from '@/components/Sections/Admin_page/Admin/index';

export default function AdminDashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Cek status login saat komponen mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/Admin/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  if (!isLoggedIn) {
    return null; // atau loading screen
  }

  return (
    <Layout onLogout={() => {
      localStorage.removeItem('adminLoggedIn');
      router.push('/Admin/login');
    }}>
      <AdminDashboard />
    </Layout>
  );
}