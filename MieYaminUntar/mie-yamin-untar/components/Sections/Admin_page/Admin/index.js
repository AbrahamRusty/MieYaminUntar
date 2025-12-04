import React, { useState, useEffect } from 'react';
import StatCard from '../../../../components/Admin/StatCard';
import styles from '../../../../styles/Admin.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingMenus, setLoadingMenus] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [errorOrders, setErrorOrders] = useState(null);
  const [errorMenus, setErrorMenus] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await fetch(`${API_BASE_URL}/admin/users?page=1&limit=10`);
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
      } else {
        setErrorUsers('Failed to fetch users');
      }
    } catch (err) {
      setErrorUsers('Error fetching users: ' + err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const response = await fetch(`${API_BASE_URL}/admin/orders?page=1&limit=10`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        setErrorOrders('Failed to fetch orders');
      }
    } catch (err) {
      setErrorOrders('Error fetching orders: ' + err.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Fetch menus
  const fetchMenus = async () => {
    try {
      setLoadingMenus(true);
      const response = await fetch(`${API_BASE_URL}/admin/menus?page=1&limit=10`);
      const data = await response.json();

      if (data.success) {
        setMenus(data.data);
      } else {
        setErrorMenus('Failed to fetch menus');
      }
    } catch (err) {
      setErrorMenus('Error fetching menus: ' + err.message);
    } finally {
      setLoadingMenus(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchMenus();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#16A34A';
      case 'preparing': return '#F59E0B';
      case 'ready': return '#3B82F6';
      case 'confirmed': return '#8B5CF6';
      case 'pending': return '#6B7280';
      case 'cancelled': return '#EF4444';
      default: return '#374151';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Selesai';
      case 'preparing': return 'Diproses';
      case 'ready': return 'Siap';
      case 'confirmed': return 'Dikonfirmasi';
      case 'pending': return 'Menunggu';
      case 'cancelled': return 'Dibatalkan';
      default: return status;
    }
  };

  const getMenuNames = (items) => {
    if (!items || items.length === 0) return 'N/A';
    if (items.length === 1) return items[0].name;
    return `${items[0].name} +${items.length - 1} item lainnya`;
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'platinum': return '#8B5CF6';
      case 'gold': return '#F59E0B';
      case 'silver': return '#6B7280';
      default: return '#374151';
    }
  };

  return (
    <>
      {/* Bagian Statistik */}
      <div className={styles.statGrid}>
        <StatCard title="TOTAL PESANAN" value="1,248" percentage="+12% dari bulan lalu" />
        <StatCard title="PENDAPATAN" value="Rp 24.8 Jt" percentage="+8% dari bulan lalu" />
        <StatCard title="PELANGGAN" value="856" percentage="+5% dari bulan lalu" />
        <StatCard title="PRODUK" value="42" percentage="2 produk habis" />
      </div>

      {/* Bagian Konten */}
      <div>
        {/* Tabel Users */}
        <div className={styles.card} style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '20px' }}>Manajemen Users</h3>
          {loadingUsers ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading users...</div>
          ) : errorUsers ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {errorUsers}</div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Membership Tier</th>
                    <th>Status Email</th>
                    <th>Tanggal Daftar</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name || 'N/A'}</td>
                      <td>{user.email}</td>
                      <td>
                        <span style={{ color: getTierColor(user.membershipTier) }}>
                          {user.membershipTier || 'none'}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: user.isEmailVerified ? '#16A34A' : '#EF4444' }}>
                          {user.isEmailVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td>{formatDate(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tabel Pesanan */}
        <div className={styles.card} style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '20px' }}>Manajemen Pesanan</h3>
          {loadingOrders ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading orders...</div>
          ) : errorOrders ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {errorOrders}</div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>ID Pesanan</th>
                    <th>Pelanggan</th>
                    <th>Menu</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>#{order._id.slice(-6).toUpperCase()}</td>
                      <td>{order.userId?.name || 'N/A'}</td>
                      <td>{getMenuNames(order.items)}</td>
                      <td>{formatPrice(order.totalAmount)}</td>
                      <td>
                        <span style={{
                          color: getStatusColor(order.status),
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td>{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tabel Menu */}
        <div className={styles.card}>
          <h3 style={{ marginBottom: '20px' }}>Manajemen Menu</h3>
          {loadingMenus ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading menus...</div>
          ) : errorMenus ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {errorMenus}</div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Nama Menu</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Status</th>
                    <th>Popular</th>
                  </tr>
                </thead>
                <tbody>
                  {menus.map((menu) => (
                    <tr key={menu._id}>
                      <td>{menu.name}</td>
                      <td style={{ textTransform: 'capitalize' }}>{menu.category}</td>
                      <td>{formatPrice(menu.price)}</td>
                      <td>
                        <span style={{ color: menu.isAvailable ? '#16A34A' : '#EF4444' }}>
                          {menu.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: menu.isPopular ? '#FFD700' : '#666' }}>
                          {menu.isPopular ? '★ Popular' : '☆ Normal'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
