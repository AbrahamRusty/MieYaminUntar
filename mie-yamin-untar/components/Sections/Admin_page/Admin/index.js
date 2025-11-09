import React from 'react';
import StatCard from '../../../../components/Admin/StatCard';
import styles from '../../../../styles/Admin.module.css';

// Data dummy
const pesananTerbaru = [
  { id: '#ORD-1256', pelanggan: 'Budi Santoso', total: 'Rp 85.000', status: 'Selesai' },
  { id: '#ORD-1255', pelanggan: 'Sari Indah', total: 'Rp 120.000', status: 'Selesai' },
  { id: '#ORD-1254', pelanggan: 'Rizki Pratama', total: 'Rp 65.000', status: 'Selesai' },
];

const produkPopuler = [
    { nama: 'Nasi Goreng Spesial', kategori: 'Makanan', terjual: 156, pendapatan: 'Rp 2.340.000' },
    { nama: 'Es Jeruk Segar', kategori: 'Minuman', terjual: 142, pendapatan: 'Rp 1.420.000' },
    { nama: 'Ayam Bakar Madu', kategori: 'Makanan', terjual: 128, pendapatan: 'Rp 3.200.000' },
];

const StatusBadge = ({ status }) => {
    let statusClass = '';
    if (status === 'Selesai') statusClass = styles.statusSelesai;
    // Tambahkan 'Diproses' atau 'Menunggu' jika perlu
    
    return <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>
}

export default function AdminDashboard() {
  return (
    <>
      {/* Bagian Statistik (dari dashboard-1.jpg) */}
      <div className={styles.statGrid}>
        <StatCard title="TOTAL PESANAN" value="1,248" percentage="+12% dari bulan lalu" />
        <StatCard title="PENDAPATAN" value="Rp 24.8 Jt" percentage="+8% dari bulan lalu" />
        <StatCard title="PELANGGAN" value="856" percentage="+5% dari bulan lalu" />
        <StatCard title="PRODUK" value="42" percentage="2 produk habis" />
      </div>

      {/* Bagian Konten (dari dashboard-2.jpg & 3.jpg) */}
      <div className={styles.contentGrid}>
        {/* Pesanan Terbaru */}
        <div className={styles.card}>
          <div className={styles.tableWrapper}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>ID Pesanan</th>
                  <th>Pelanggan</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pesananTerbaru.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.pelanggan}</td>
                    <td>{order.total}</td>
                    <td><StatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Produk Terpopuler */}
        <div className={styles.card}>
          <div className={styles.tableWrapper}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Kategori</th>
                  <th>Terjual</th>
                  <th>Pendapatan</th>
                </tr>
              </thead>
              <tbody>
                {produkPopuler.map((produk) => (
                  <tr key={produk.nama}>
                    <td>{produk.nama}</td>
                    <td>{produk.kategori}</td>
                    <td>{produk.terjual}</td>
                    <td>{produk.pendapatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}