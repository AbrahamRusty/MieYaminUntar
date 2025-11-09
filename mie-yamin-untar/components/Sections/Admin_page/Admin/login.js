import React from 'react';
import styles from '../../../../styles/Admin.module.css';

// Props 'onLogin' akan disuntikkan dari _app.js
export default function LoginPage({ onLogin }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di aplikasi nyata, Anda akan memvalidasi username/password
    // Di sini kita langsung panggil onLogin() untuk simulasi
    onLogin();
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1>Admin Login</h1>
        <p>Selamat datang di Panel Admin Mie Yamin</p>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
