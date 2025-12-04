import React, { useState, useEffect } from 'react';
import styles from '../../../../styles/Admin.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ManajemenUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch users from API
  const fetchUsers = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/users?page=${page}&limit=10&search=${search}`);
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
        setTotalPages(data.pagination.pages);
        setCurrentPage(data.pagination.page);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('Error fetching users: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1, searchTerm);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchUsers(currentPage, searchTerm); // Refresh the list
        alert('User deleted successfully');
      } else {
        alert('Failed to delete user');
      }
    } catch (err) {
      alert('Error deleting user: ' + err.message);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });

      if (response.ok) {
        setShowEditModal(false);
        setEditingUser(null);
        fetchUsers(currentPage, searchTerm); // Refresh the list
        alert('User updated successfully');
      } else {
        alert('Failed to update user');
      }
    } catch (err) {
      alert('Error updating user: ' + err.message);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      const data = await response.json();

      if (data.success || response.ok) {
        alert('User created successfully');
        setShowAddModal(false);
        fetchUsers(currentPage, searchTerm);
      } else {
        alert(data.error || 'Failed to create user');
      }
    } catch (err) {
      alert('Error creating user: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID');
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'platinum': return '#8B5CF6';
      case 'gold': return '#F59E0B';
      case 'silver': return '#6B7280';
      default: return '#374151';
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className={styles.card}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Loading users...
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
      {/* Header with Add Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Manajemen Users</h3>
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
          Tambah User
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '1rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', flex: 1 }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Search
          </button>
        </form>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Membership Tier</th>
              <th>Status Email</th>
              <th>Tanggal Daftar</th>
              <th>Aksi</th>
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
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.actionButton} ${styles.edit}`}
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.delete}`}
                      onClick={() => handleDelete(user._id)}
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
            onClick={() => fetchUsers(currentPage - 1, searchTerm)}
            disabled={currentPage === 1}
            style={{ margin: '0 0.5rem', padding: '0.5rem 1rem' }}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => fetchUsers(currentPage + 1, searchTerm)}
            disabled={currentPage === totalPages}
            style={{ margin: '0 0.5rem', padding: '0.5rem 1rem' }}
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingUser && (
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
            width: '400px',
            maxWidth: '90%'
          }}>
            <h3>Edit User</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleUpdateUser({
                name: formData.get('name'),
                email: formData.get('email'),
                membershipTier: formData.get('membershipTier'),
                isEmailVerified: formData.get('isEmailVerified') === 'true'
              });
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingUser.name || ''}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingUser.email}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Membership Tier:</label>
                <select
                  name="membershipTier"
                  defaultValue={editingUser.membershipTier || 'none'}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                >
                  <option value="none">None</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="platinum">Platinum</option>
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Email Verified:</label>
                <select
                  name="isEmailVerified"
                  defaultValue={editingUser.isEmailVerified ? 'true' : 'false'}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
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
                  Update
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
            width: '400px',
            maxWidth: '90%'
          }}>
            <h3>Add New User</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddUser({
                name: formData.get('name'),
                email: formData.get('email'),
                membershipTier: formData.get('membershipTier') || 'none'
              });
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  required
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  required
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Membership Tier:</label>
                <select
                  name="membershipTier"
                  defaultValue="none"
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                >
                  <option value="none">None</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="platinum">Platinum</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '0.5rem 1rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.5rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
