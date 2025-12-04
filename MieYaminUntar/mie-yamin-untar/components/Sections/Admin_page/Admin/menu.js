import React, { useState, useEffect } from 'react';
import styles from '../../../../styles/Admin.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ManajemenMenu() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingMenu, setEditingMenu] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch menus from API
  const fetchMenus = async (page = 1, search = '', category = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
        ...(category && { category })
      });

      const response = await fetch(`${API_BASE_URL}/api/admin/menus?${params}`);
      const data = await response.json();

      if (data.success) {
        setMenus(data.data);
        setTotalPages(data.pagination.pages);
        setCurrentPage(data.pagination.page);
      } else {
        setError(data.error || 'Gagal mengambil data menu');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil data');
      console.error('Fetch menus error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus(currentPage, searchTerm, selectedCategory);
  }, [currentPage, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchMenus(1, searchTerm, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    fetchMenus(1, searchTerm, category);
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setShowEditModal(true);
  };

  const handleDelete = async (menuId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus menu ini?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/menu/${menuId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        alert('Menu berhasil dihapus');
        fetchMenus(currentPage, searchTerm, selectedCategory);
      } else {
        alert(data.error || 'Gagal menghapus menu');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menghapus menu');
      console.error('Delete menu error:', err);
    }
  };

  const handleUpdateMenu = async (updatedMenu) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/menu/${editingMenu._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedMenu)
      });

      const data = await response.json();

      if (data.success) {
        alert('Menu berhasil diperbarui');
        setShowEditModal(false);
        setEditingMenu(null);
        fetchMenus(currentPage, searchTerm, selectedCategory);
      } else {
        alert(data.error || 'Gagal memperbarui menu');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat memperbarui menu');
      console.error('Update menu error:', err);
    }
  };

  const handleAddMenu = async (newMenu) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMenu)
      });

      const data = await response.json();

      if (data.success) {
        alert('Menu berhasil ditambahkan');
        setShowAddModal(false);
        fetchMenus(currentPage, searchTerm, selectedCategory);
      } else {
        alert(data.error || 'Gagal menambahkan menu');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menambahkan menu');
      console.error('Add menu error:', err);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const categories = [
    { id: '', name: 'Semua Kategori' },
    { id: 'mie', name: 'Mie' },
    { id: 'bihun', name: 'Bihun' },
    { id: 'kuetiaw', name: 'Kuetiaw' },
    { id: 'topping', name: 'Topping' },
    { id: 'minuman', name: 'Minuman' }
  ];

  if (loading && menus.length === 0) {
    return (
      <div className={styles.card}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Memuat data menu...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.card}>
        <div style={{ textAlign: 'center', padding: '20px', color: '#EF4444' }}>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {/* Header with Add Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Manajemen Menu</h3>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Tambah Menu
        </button>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flex: 1, minWidth: '300px' }}>
          <input
            type="text"
            placeholder="Cari menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cari
          </button>
        </form>

        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minWidth: '150px'
          }}
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Nama Menu</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Status</th>
              <th>Popular</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu._id}>
                <td>{menu.name}</td>
                <td style={{ textTransform: 'capitalize' }}>{menu.category}</td>
                <td>{formatPrice(menu.price)}</td>
                <td>
                  <span style={{color: menu.isAvailable ? '#16A34A' : '#EF4444'}}>
                    {menu.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                  </span>
                </td>
                <td>
                  <span style={{color: menu.isPopular ? '#FFD700' : '#666'}}>
                    {menu.isPopular ? '★ Popular' : '☆ Normal'}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.actionButton} ${styles.edit}`}
                      onClick={() => handleEdit(menu)}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.delete}`}
                      onClick={() => handleDelete(menu._id)}
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
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              margin: '0 5px',
              border: '1px solid #ddd',
              backgroundColor: currentPage === 1 ? '#f5f5f5' : 'white',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Sebelumnya
          </button>

          <span style={{ margin: '0 10px' }}>
            Halaman {currentPage} dari {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              margin: '0 5px',
              border: '1px solid #ddd',
              backgroundColor: currentPage === totalPages ? '#f5f5f5' : 'white',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Selanjutnya
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingMenu && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '500px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto'
          }}>
            <h3>Edit Menu</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleUpdateMenu({
                name: formData.get('name'),
                description: formData.get('description'),
                price: parseFloat(formData.get('price')),
                category: formData.get('category'),
                isAvailable: formData.get('isAvailable') === 'true',
                isPopular: formData.get('isPopular') === 'true'
              });
            }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Nama Menu:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingMenu.name}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Deskripsi:</label>
                <textarea
                  name="description"
                  defaultValue={editingMenu.description || ''}
                  rows="3"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Harga:</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={editingMenu.price}
                  required
                  min="0"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Kategori:</label>
                <select
                  name="category"
                  defaultValue={editingMenu.category}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="mie">Mie</option>
                  <option value="bihun">Bihun</option>
                  <option value="kuetiaw">Kuetiaw</option>
                  <option value="topping">Topping</option>
                  <option value="minuman">Minuman</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Status:</label>
                <select
                  name="isAvailable"
                  defaultValue={editingMenu.isAvailable ? 'true' : 'false'}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="true">Tersedia</option>
                  <option value="false">Tidak Tersedia</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Popular:</label>
                <select
                  name="isPopular"
                  defaultValue={editingMenu.isPopular ? 'true' : 'false'}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="false">Normal</option>
                  <option value="true">Popular</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingMenu(null);
                  }}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Simpan
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
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '500px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto'
          }}>
            <h3>Tambah Menu Baru</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddMenu({
                name: formData.get('name'),
                description: formData.get('description'),
                price: parseFloat(formData.get('price')),
                category: formData.get('category'),
                isAvailable: formData.get('isAvailable') === 'true',
                isPopular: formData.get('isPopular') === 'true'
              });
            }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Nama Menu:</label>
                <input
                  type="text"
                  name="name"
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Deskripsi:</label>
                <textarea
                  name="description"
                  rows="3"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Harga:</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Kategori:</label>
                <select
                  name="category"
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="mie">Mie</option>
                  <option value="bihun">Bihun</option>
                  <option value="kuetiaw">Kuetiaw</option>
                  <option value="topping">Topping</option>
                  <option value="minuman">Minuman</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Status:</label>
                <select
                  name="isAvailable"
                  defaultValue="true"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="true">Tersedia</option>
                  <option value="false">Tidak Tersedia</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Popular:</label>
                <select
                  name="isPopular"
                  defaultValue="false"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="false">Normal</option>
                  <option value="true">Popular</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
