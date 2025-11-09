import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../../styles/Admin.module.css';
import {
  FiGrid, FiShoppingCart, FiPackage,
  FiUsers, FiBarChart2, FiSettings, FiLogOut
} from 'react-icons/fi'; // Contoh ikon

// Hook helper untuk cek link aktif
const useActiveLink = (href) => {
  const pathname = usePathname();
  return pathname === href ? styles.active : '';
};

const NavLink = ({ href, icon, children }) => {
  const activeClass = useActiveLink(href);
  return (
    <Link href={href} className={`${styles.navLink} ${activeClass}`}>
      {icon}
      {children}
    </Link>
  );
};

export default function Sidebar({ onLogout }) {
  return (
    <aside className={styles.sidebar}>
      {/* Ganti dengan Logo Anda */}
      <div className={styles.logo}>Mie Yamin</div>

      <nav className={styles.nav}>
        <NavLink href="/Admin" icon={<FiGrid size={20} />}>
          Dashboard
        </NavLink>
        <NavLink href="/Admin/menu" icon={<FiPackage size={20} />}>
          Menu
        </NavLink>
        <NavLink href="/Admin/pesanan" icon={<FiShoppingCart size={20} />}>
          Pesanan
        </NavLink>
        <NavLink href="/Admin/pelanggan" icon={<FiUsers size={20} />}>
          Users
        </NavLink>
        <NavLink href="/Admin/laporan" icon={<FiBarChart2 size={20} />}>
          Laporan
        </NavLink>
        <NavLink href="/Admin/pengaturan" icon={<FiSettings size={20} />}>
          Pengaturan
        </NavLink>
      </nav>

      <button className={styles.logoutButton} onClick={onLogout}>
        <FiLogOut size={20} style={{ marginRight: '10px' }} />
        Keluar
      </button>
    </aside>
  );
}
