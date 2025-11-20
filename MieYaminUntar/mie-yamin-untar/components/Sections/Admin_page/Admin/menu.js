import React from 'react';
import styles from '../../../../styles/Admin.module.css';

// Data dummy
const menuItems = [
  { nama: 'Nasi Goreng Spesial', kategori: 'Makanan', harga: 'Rp 25.000', stok: 15, status: 'Tersedia' },
  { nama: 'Ayam Bakar Madu', kategori: 'Makanan', harga: 'Rp 35.000', stok: 8, status: 'Tersedia' },
  { nama: 'Es Jeruk Segar', kategori: 'Minuman', harga: 'Rp 12.000', stok: 0, status: 'Habis' },
  { nama: 'Mie Ayam Jamur', kategori: 'Makanan', harga: 'Rp 20.000', stok: 12, status: 'Tersedia' },
];

export default function ManajemenMenu() {
  return (
    <div className={styles.card}>
      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Nama Menu</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.nama}>
                <td>{item.nama}</td>
                <td>{item.kategori}</td>
                <td>{item.harga}</td>
                <td>{item.stok}</td>
                <td>
                  <span style={{color: item.status === 'Habis' ? '#EF4444' : '#16A34A'}}>
                    {item.status}
                  </span>
                </td>
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