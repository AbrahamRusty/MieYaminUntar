import React from 'react';
import StatCard from '../../../../components/Admin/StatCard';
import styles from '../../../../styles/Admin.module.css';
import { FiDownload, FiCalendar } from 'react-icons/fi';

export default function LaporanAnalitik() {
  return (
    <>
      {/* Kontrol Header Halaman */}
      <div className={styles.pageControls}>
        <div className={styles.controlGroup}>
          <FiCalendar />
          <select className={styles.selectInput}>
            <option>7 Hari Terakhir</option>
            <option>30 Hari Terakhir</option>
            <option>Bulan Ini</option>
            <option>Tahun Ini</option>
          </select>
        </div>
        <button className={styles.loginButton} style={{ padding: '10px 20px' }}>
          <FiDownload size={16} style={{ marginRight: '8px' }} />
          Export PDF
        </button>
      </div>

      {/* Kartu Statistik (dari dashboard-7.jpg) */}
      <div className={styles.statGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '30px' }}>
        <StatCard title="TOTAL PENDAPATAN" value="Rp 24.8 Jt" percentage="+8% dari bulan lalu" />
        <StatCard title="TOTAL PESANAN" value="1,248" percentage="+12% dari bulan lalu" />
        <StatCard title="RATA-RATA NILAI PESANAN" value="Rp 89.500" percentage="+5% dari bulan lalu" />
      </div>

      {/* Placeholder Grafik */}
      <div className={styles.card}>
        <div className={styles.chartPlaceholder}>
          <p>Grafik penjualan akan ditampilkan di sini</p>
          <span>(Membutuhkan library seperti Chart.js atau Recharts untuk implementasi)</span>
        </div>
      </div>
    </>
  );
}