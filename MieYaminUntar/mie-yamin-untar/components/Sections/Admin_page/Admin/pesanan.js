import React from 'react';
import styles from '../../../../styles/Admin.module.css';

// Data dummy untuk pesanan
const pesananData = [
  { id: '#ORD-1256', pelanggan: 'Budi Santoso', menu: 'Nasi Goreng Spesial', jumlah: 2, total: 'Rp 50.000', status: 'Selesai', tanggal: '2024-01-15' },
  { id: '#ORD-1257', pelanggan: 'Sari Indah', menu: 'Ayam Bakar Madu', jumlah: 1, total: 'Rp 35.000', status: 'Diproses', tanggal: '2024-01-15' },
  { id: '#ORD-1258', pelanggan: 'Rizki Pratama', menu: 'Es Jeruk Segar', jumlah: 3, total: 'Rp 36.000', status: 'Menunggu', tanggal: '2024-01-15' },
  { id: '#ORD-1259', pelanggan: 'Dewi Lestari', menu: 'Mie Ayam Jamur', jumlah: 1, total: 'Rp 20.000', status: 'Selesai', tanggal: '2024-01-14' },
];

const StatusBadge = ({ status }) => {
  let statusClass = '';
  if (status === 'Selesai') statusClass = styles.statusSelesai;
  else if (status === 'Diproses') statusClass = styles.statusDiproses;
  else if (status === 'Menunggu') statusClass = styles.statusMenunggu;

  return <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>;
};

export default function ManajemenPesanan() {
  return (
    <div className={styles.card}>
      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>ID Pesanan</th>
              <th>Pelanggan</th>
              <th>Menu</th>
              <th>Jumlah</th>
              <th>Total</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pesananData.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.pelanggan}</td>
                <td>{order.menu}</td>
                <td>{order.jumlah}</td>
                <td>{order.total}</td>
                <td><StatusBadge status={order.status} /></td>
                <td>{order.tanggal}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={`${styles.actionButton} ${styles.edit}`}>Edit</button>
                    <button className={`${styles.actionButton} ${styles.delete}`}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
