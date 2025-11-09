import React from 'react';
import styles from '../../../../styles/Admin.module.css';

export default function PengaturanToko() {
  return (
    <div className={styles.settingsGrid}>
      {/* Kolom Kiri: Form Informasi */}
      <div className={styles.card}>
        <form className={styles.settingsForm}>
          <div className={styles.formGroup}>
            <label htmlFor="namaToko">Nama Toko</label>
            <input type="text" id="namaToko" defaultValue="UMKM Delicious" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" defaultValue="info@umkmdelicious.com" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="telepon">Telepon</label>
            <input type="text" id="telepon" defaultValue="+6281234567890" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="alamat">Alamat</label>
            <textarea id="alamat" rows="4" defaultValue="Jl. Contoh No. 123, Jakarta" />
          </div>
          <button type="submit" className={styles.loginButton}>
            Simpan Perubahan
          </button>
        </form>
      </div>

      {/* Kolom Kanan: Jam Operasional */}
      <div className={styles.card}>
        <div className={styles.operationalHours}>
          <div className={styles.dayEntry}>
            <strong>Senin - Jumat:</strong>
            <span>08:00 - 22:00</span>
          </div>
          <div className={styles.dayEntry}>
            <strong>Sabtu:</strong>
            <span>09:00 - 23:00</span>
          </div>
          <div className={styles.dayEntry}>
            <strong>Minggu:</strong>
            <span>Tutup</span>
          </div>
          <button 
            className={styles.loginButton} 
            style={{marginTop: '20px', background: 'var(--primary-orange)'}}>
            Edit Jam Operasional
          </button>
        </div>
      </div>
    </div>
  );
}