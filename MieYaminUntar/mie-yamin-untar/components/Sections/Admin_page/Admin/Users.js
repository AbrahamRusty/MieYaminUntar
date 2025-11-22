import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/Admin.module.css';
import { FiDownload } from 'react-icons/fi';

export default function ManajemenPelanggan() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/admin/users', {
          credentials: 'include',  // include cookies for session if necessary
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return <div className={styles.card}>Loading users...</div>;
  }

  if (error) {
    return <div className={styles.card}>Error: {error}</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>ID Pelanggan</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Google ID</th>
              <th>Wallet Address</th>
              <th>Membership Tier</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name || '-'}</td>
                <td>{user.email}</td>
                <td>{user.googleId || '-'}</td>
                <td>{user.walletAddress || '-'}</td>
                <td>{user.membershipTier || 'none'}</td>
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
