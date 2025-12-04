import React, { useState, useEffect } from 'react';
import styles from '../../../../styles/Admin.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ManajemenPesanan() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [menus, setMenus] = useState([]);
  const [newOrder, setNewOrder] = useState({
    userName: '',
    items: [],
    paymentMethod: 'cash',
    deliveryAddress: { street: '', city: '', postalCode: '', notes: '' },
    phoneNumber: '',
    specialInstructions: ''
  });

  // Fetch orders from API
  const fetchOrders = async (page = 1, search = '', status = '') => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/orders?page=${page}&limit=10&search=${search}&status=${status}`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.pagination.pages);
        setCurrentPage(data.pagination.page);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      setError('Error fetching orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch menus for add order modal
  const fetchMenus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/menus?page=1&limit=100`);
      const menusData = await response.json();

      if (menusData.success) setMenus(menusData.data);
    } catch (err) {
      console.error('Error fetching menus:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (showAddModal) {
      fetchMenus();
    }
  }, [showAddModal]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrders(1, searchTerm, selectedStatus);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    fetchOrders(1, searchTerm, status);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowEditModal(true);
  };

  const handleDelete = async (orderId) => {
    if (!confirm('Are you sure you want to delete this order?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchOrders(currentPage, searchTerm, selectedStatus); // Refresh the list
        alert('Order deleted successfully');
      } else {
        alert('Failed to delete order');
      }
    } catch (err) {
      alert('Error deleting order: ' + err.message);
    }
  };

  const handleUpdateOrder = async (updatedOrder) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders/${editingOrder._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedOrder)
      });

      if (response.ok) {
        setShowEditModal(false);
        setEditingOrder(null);
        fetchOrders(currentPage, searchTerm, selectedStatus); // Refresh the list
        alert('Order updated successfully');
      } else {
        alert('Failed to update order');
      }
    } catch (err) {
      alert('Error updating order: ' + err.message);
    }
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
      });

      if (response.ok) {
        setShowAddModal(false);
        setNewOrder({
          userName: '',
          items: [],
          paymentMethod: 'cash',
          deliveryAddress: { street: '', city: '', postalCode: '', notes: '' },
          phoneNumber: '',
          specialInstructions: ''
        });
        fetchOrders(currentPage, searchTerm, selectedStatus); // Refresh the list
        alert('Order added successfully');
      } else {
        alert('Failed to add order');
      }
    } catch (err) {
      alert('Error adding order: ' + err.message);
    }
  };

  const handleAddItem = (menuId) => {
    const menu = menus.find(m => m._id === menuId);
    if (!menu) return;

    const existingItem = newOrder.items.find(item => item.menuId === menuId);
    if (existingItem) {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.map(item =>
          item.menuId === menuId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      setNewOrder({
        ...newOrder,
        items: [...newOrder.items, {
          menuId: menu._id,
          name: menu.name,
          price: menu.price,
          quantity: 1
        }]
      });
    }
  };

  const handleRemoveItem = (menuId) => {
    setNewOrder({
      ...newOrder,
      items: newOrder.items.filter(item => item.menuId !== menuId)
    });
  };

  const calculateTotal = () => {
    return newOrder.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const getTotalQuantity = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const statusOptions = [
    { id: '', name: 'Semua Status' },
    { id: 'pending', name: 'Menunggu' },
    { id: 'confirmed', name: 'Dikonfirmasi' },
    { id: 'preparing', name: 'Diproses' },
    { id: 'ready', name: 'Siap' },
    { id: 'delivered', name: 'Selesai' },
    { id: 'cancelled', name: 'Dibatalkan' }
  ];

  if (loading && orders.length === 0) {
    return (
      <div className={styles.card}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Loading orders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.card}>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {/* Search and Filters */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Search
          </button>
        </form>

        <select
          value={selectedStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', minWidth: '150px' }}
        >
          {statusOptions.map(status => (
            <option key={status.id} value={status.id}>{status.name}</option>
          ))}
        </select>

        <button
          onClick={() => setShowAddModal(true)}
          style={{ padding: '0.5rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Tambah Pesanan
        </button>
      </div>

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
            {orders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id.slice(-6).toUpperCase()}</td>
                <td>{order.userId?.name || 'N/A'}</td>
                <td>{getMenuNames(order.items)}</td>
                <td>{getTotalQuantity(order.items)}</td>
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
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.actionButton} ${styles.edit}`}
                      onClick={() => handleEdit(order)}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.delete}`}
                      onClick={() => handleDelete(order._id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button
            onClick={() => fetchOrders(currentPage - 1, searchTerm, selectedStatus)}
            disabled={currentPage === 1}
            style={{ margin: '0 0.5rem', padding: '0.5rem 1rem' }}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => fetchOrders(currentPage + 1, searchTerm, selectedStatus)}
            disabled={currentPage === totalPages}
            style={{ margin: '0 0.5rem', padding: '0.5rem 1rem' }}
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            width: '500px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto'
          }}>
            <h3>Edit Order Status</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleUpdateOrder({
                status: formData.get('status'),
                specialInstructions: formData.get('specialInstructions')
              });
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Order ID:</label>
                <input
                  type="text"
                  value={`#${editingOrder._id.slice(-6).toUpperCase()}`}
                  disabled
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', background: '#f5f5f5' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Customer:</label>
                <input
                  type="text"
                  value={editingOrder.userId?.name || 'N/A'}
                  disabled
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', background: '#f5f5f5' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Status:</label>
                <select
                  name="status"
                  defaultValue={editingOrder.status}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                >
                  <option value="pending">Menunggu</option>
                  <option value="confirmed">Dikonfirmasi</option>
                  <option value="preparing">Diproses</option>
                  <option value="ready">Siap</option>
                  <option value="delivered">Selesai</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Special Instructions:</label>
                <textarea
                  name="specialInstructions"
                  defaultValue={editingOrder.specialInstructions || ''}
                  rows="3"
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong>Order Items:</strong>
                <div style={{ marginTop: '0.5rem', maxHeight: '150px', overflow: 'auto' }}>
                  {editingOrder.items?.map((item, index) => (
                    <div key={index} style={{ padding: '0.25rem 0', borderBottom: '1px solid #eee' }}>
                      {item.name} x{item.quantity} - {formatPrice(item.price * item.quantity)}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                  Total: {formatPrice(editingOrder.totalAmount)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  style={{ padding: '0.5rem 1rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Update Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            width: '600px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto'
          }}>
            <h3>Tambah Pesanan Baru</h3>
            <form onSubmit={handleAddOrder}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Pelanggan:</label>
                <input
                  type="text"
                  placeholder="Nama Pelanggan"
                  value={newOrder.userName}
                  onChange={(e) => setNewOrder({ ...newOrder, userName: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Menu:</label>
                <div style={{ marginTop: '0.5rem', maxHeight: '200px', overflow: 'auto', border: '1px solid #ddd', padding: '0.5rem' }}>
                  {menus.map(menu => (
                    <div key={menu._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span>{menu.name} - {formatPrice(menu.price)}</span>
                      <button
                        type="button"
                        onClick={() => handleAddItem(menu._id)}
                        style={{ padding: '0.25rem 0.5rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
                      >
                        Tambah
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Item Pesanan:</label>
                <div style={{ marginTop: '0.5rem', maxHeight: '150px', overflow: 'auto' }}>
                  {newOrder.items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.25rem 0', borderBottom: '1px solid #eee' }}>
                      <span>{item.name} x{item.quantity} - {formatPrice(item.price * item.quantity)}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.menuId)}
                        style={{ padding: '0.25rem 0.5rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                  {newOrder.items.length > 0 && (
                    <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                      Total: {formatPrice(calculateTotal())}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Metode Pembayaran:</label>
                <select
                  value={newOrder.paymentMethod}
                  onChange={(e) => setNewOrder({ ...newOrder, paymentMethod: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                >
                  <option value="cash">Tunai</option>
                  <option value="transfer">Transfer</option>
                  <option value="qris">QRIS</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Alamat Pengiriman:</label>
                <input
                  type="text"
                  placeholder="Jalan"
                  value={newOrder.deliveryAddress.street}
                  onChange={(e) => setNewOrder({
                    ...newOrder,
                    deliveryAddress: { ...newOrder.deliveryAddress, street: e.target.value }
                  })}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
                <input
                  type="text"
                  placeholder="Kota"
                  value={newOrder.deliveryAddress.city}
                  onChange={(e) => setNewOrder({
                    ...newOrder,
                    deliveryAddress: { ...newOrder.deliveryAddress, city: e.target.value }
                  })}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
                <input
                  type="text"
                  placeholder="Kode Pos"
                  value={newOrder.deliveryAddress.postalCode}
                  onChange={(e) => setNewOrder({
                    ...newOrder,
                    deliveryAddress: { ...newOrder.deliveryAddress, postalCode: e.target.value }
                  })}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
                <textarea
                  placeholder="Catatan"
                  value={newOrder.deliveryAddress.notes}
                  onChange={(e) => setNewOrder({
                    ...newOrder,
                    deliveryAddress: { ...newOrder.deliveryAddress, notes: e.target.value }
                  })}
                  rows="2"
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Nomor Telepon:</label>
                <input
                  type="tel"
                  value={newOrder.phoneNumber}
                  onChange={(e) => setNewOrder({ ...newOrder, phoneNumber: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Instruksi Khusus:</label>
                <textarea
                  value={newOrder.specialInstructions}
                  onChange={(e) => setNewOrder({ ...newOrder, specialInstructions: e.target.value })}
                  rows="3"
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '0.5rem 1rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.5rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Tambah Pesanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
