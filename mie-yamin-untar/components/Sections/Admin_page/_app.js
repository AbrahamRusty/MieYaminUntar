import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Admin/Layout';
import LoginPage from './Admin/login';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  
  // Cek apakah halaman saat ini adalah halaman admin
  const isAdminPage = router.pathname.startsWith('/Admin');
  const isLoginPage = router.pathname === '/Admin/login';

  // Simulasi login/logout
  const handleLogin = () => {
    setIsLoggedIn(true);
    router.push('/Admin'); // Alihkan ke dashboard setelah login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push('/Admin/login'); // Alihkan ke login setelah logout
  };

  // Efek untuk melindungi rute
  useEffect(() => {
    // Jika kita di halaman admin (tapi BUKAN login) DAN kita belum login
    if (isAdminPage && !isLoginPage && !isLoggedIn) {
      router.push('/Admin/login'); // Paksa ke login
    }
    // Jika kita di halaman login TAPI kita SUDAH login
    if (isLoginPage && isLoggedIn) {
      router.push('/Admin'); // Paksa ke dashboard
    }
  }, [router.pathname, isLoggedIn, isAdminPage, isLoginPage, router]);

  // 1. Jika ini halaman login, tampilkan TANPA layout
  if (isLoginPage) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // 2. Jika ini halaman admin lain DAN kita belum login, tampilkan loading (atau null)
  // Ini mencegah flash konten admin sebelum redirect
  if (isAdminPage && !isLoggedIn) {
    return null; // atau <LoadingScreen />
  }

  // 3. Jika ini halaman admin DAN kita sudah login, tampilkan DENGAN layout
  if (isAdminPage && isLoggedIn) {
    return (
      <Layout onLogout={handleLogout}>
        <Component {...pageProps} />
      </Layout>
    );
  }

  // 4. Jika ini bukan halaman admin (misal: halaman publik), tampilkan biasa
  return <Component {...pageProps} />;
}

export default MyApp;