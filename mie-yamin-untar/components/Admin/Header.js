import React from 'react';
import styles from '../../styles/Admin.module.css';
import { FaUserCircle } from 'react-icons/fa'; // Ikon User

// Judul akan berubah berdasarkan halaman
const getPageTitle = (pathname) => {
  switch (pathname) {
    case '/Admin':
      return 'ADMIN DASHBOARD';
    case '/Admin/menu':
      return 'Manajemen Menu';
    case '/Admin/pesanan':
      return 'Manajemen Pesanan';
    case '/Admin/pelanggan':
      return 'Manajemen Pelanggan';
    case '/Admin/laporan':
      return 'Laporan';
    case '/Admin/pengaturan':
      return 'Pengaturan';
    // ... tambahkan case lain
    default:
      return 'Admin Panel';
  }
};

export default function Header({ pathname, onLogout }) {
  const title = getPageTitle(pathname);

  return (
    <header className={styles.header}>
      <h1 style={{ textAlign: 'center', flex: 1 }}>{title}</h1>
      <div className={styles.userProfile}>
        <span>Admin UMKM Delicious</span>
        <div className={styles.userAvatar}>AD</div>
      </div>
    </header>
  );
}
