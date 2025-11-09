import React from 'react';
import Sidebar from './Sidebar';
import styles from '../../styles/Admin.module.css';

export default function Layout({ children, onLogout }) {
  return (
    <div className={styles.layout}>
      <Sidebar onLogout={onLogout} />
      <main className={styles.mainContainer}>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
