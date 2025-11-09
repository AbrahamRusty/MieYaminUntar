'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Admin/Layout';
import ManajemenMenu from '@/components/Sections/Admin_page/Admin/menu';

export default function AdminMenuPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/Admin/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Layout onLogout={() => {
      localStorage.removeItem('adminLoggedIn');
      router.push('/Admin/login');
    }}>
      <ManajemenMenu />
    </Layout>
  );
}
