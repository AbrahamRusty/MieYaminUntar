import React from 'react';
import styles from '../../../../styles/Admin.module.css';
import { FiDownload } from 'react-icons/fi';

// Data dummy
const customerData = [
  { id: 'CUS-001', nama: 'Budi Santoso', email: 'budi.s@example.com', telepon: '08123456789', total: 'Rp 450.000' },
  { id: 'CUS-002', nama: 'Sari Indah', email: 'sari.indah@example.com', telepon: '08223456789', total: 'Rp 1.200.000' },
  { id: 'CUS-003', nama: 'Rizki Pratama', email: 'rizki.p@example.com', telepon: '08323456789', total: 'Rp 210.000' },
  { id: 'CUS-004', nama: 'Dewi Lestari', email: 'dewi.l@example.com', telepon: '08423456789', total: 'Rp 95.000' },
];

export default function ManajemenPelanggan() {
  return (
    <div className={styles.card}>
      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>ID Pelanggan</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Total Belanja</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.nama}</td>
                <td>{customer.email}</td>
                <td>{customer.telepon}</td>
                <td>{customer.total}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={`${styles.actionButton} ${styles.edit}`}>View</button>
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