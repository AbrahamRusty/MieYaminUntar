<<<<<<< Updated upstream
import React, { useEffect, useState } from "react";

export default function AdminMenuPage() {
  const [menuCategories, setMenuCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  // Fetch menu data from backend with correct /api prefix
  const fetchMenu = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/menus");
      if (!response.ok) {
        throw new Error("Failed to fetch menu data");
      }
      const data = await response.json();
      setMenuCategories(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

=======
import React, { useEffect, useState } from 'react';

const AdminMenu = () => {
  const [menu, setMenu] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [addingCategoryId, setAddingCategoryId] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  });

>>>>>>> Stashed changes
  useEffect(() => {
    fetchMenu();
  }, []);

<<<<<<< Updated upstream
  // Handle input change in form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open add menu item form
  const openAddForm = () => {
    setFormData({
      category: "",
      title: "",
      description: "",
      price: "",
      imageUrl: "",
    });
    setEditItem(null);
    setShowForm(true);
  };

  // Open edit form with existing item data
  const openEditForm = (category, item) => {
    setFormData({
      category,
=======
  const fetchMenu = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/menu');
      const data = await res.json();
      setMenu(data);
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (categoryId, item) => {
    setEditingItem({ categoryId, itemId: item._id });
    setFormData({
      category: categoryId,
>>>>>>> Stashed changes
      title: item.title,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
    });
<<<<<<< Updated upstream
    setEditItem({ category, item });
    setShowForm(true);
  };

  // Handle form submit for add or edit with correct /api prefix
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.title) {
      alert("Category and Title are required");
      return;
    }
    try {
      if (editItem) {
        // PUT request to update item
        const res = await fetch(
          `http://localhost:3001/api/menus/${editItem.item?._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              category: formData.category,
              updatedItem: {
                title: formData.title,
                description: formData.description,
                price: formData.price,
                imageUrl: formData.imageUrl,
              },
            }),
          }
        );
        if (!res.ok) throw new Error("Failed to update menu item");
      } else {
        // POST request to add new item
        const res = await fetch("http://localhost:3001/api/menus", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: formData.category,
            item: {
              title: formData.title,
              description: formData.description,
              price: formData.price,
              imageUrl: formData.imageUrl,
            },
          }),
        });
        if (!res.ok) throw new Error("Failed to add menu item");
      }
      setShowForm(false);
      fetchMenu();
    } catch (err) {
      alert(err.message || "Error occurred");
    }
  };

  // Handle delete menu item with correct /api prefix
  const handleDelete = async (itemId) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;
    try {
      const res = await fetch(`http://localhost:3001/api/menus/${itemId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete menu item");
      fetchMenu();
    } catch (err) {
      alert(err.message || "Error occurred");
    }
  };

  // Close modal when clicking outside form content
  const handleOverlayClick = (e) => {
    if (e.target.id === "modalOverlay") {
      setShowForm(false);
=======
  };

  const handleCancel = () => {
    setEditingItem(null);
    setAddingCategoryId(null);
    setFormData({
      category: '',
      title: '',
      description: '',
      price: '',
      imageUrl: '',
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/menu/${editingItem.categoryId}/item/${editingItem.itemId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: formData.price,
          imageUrl: formData.imageUrl,
        }),
      });
      if (res.ok) {
        await fetchMenu();
        handleCancel();
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (categoryId, itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/menu/${categoryId}/item/${itemId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchMenu();
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleAddClick = (categoryId) => {
    setAddingCategoryId(categoryId);
    setFormData({
      category: categoryId,
      title: '',
      description: '',
      price: '',
      imageUrl: '',
    });
  };

  const handleAdd = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/menu/${addingCategoryId}/item`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: formData.price,
          imageUrl: formData.imageUrl,
        }),
      });
      if (res.ok) {
        await fetchMenu();
        handleCancel();
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
>>>>>>> Stashed changes
    }
  };

  return (
<<<<<<< Updated upstream
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menu Management</h1>
      <button
        className="mb-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
        onClick={openAddForm}
      >
        Tambah Menu
      </button>

      {loading && <p>Loading menu data...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && menuCategories.length === 0 && <p>No menu data available.</p>}

      {!loading &&
        !error &&
        menuCategories.map((category) => (
          <div key={category.category} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{category.category}</h2>
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map((item) => (
                  <tr key={item._id}>
                    <td className="border px-4 py-2">{item.title}</td>
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">{item.price}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-12 object-contain"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="mr-2 px-2 py-1 bg-orange-400 hover:bg-orange-500 text-black rounded"
                        onClick={() => openEditForm(category.category, item)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => handleDelete(item._id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      {showForm && (
        <div
          id="modalOverlay"
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4">
              {editItem ? "Edit Menu Item" : "Tambah Menu Item"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  className="block font-semibold mb-1"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                  required
                  disabled={editItem !== null} // disable category change while editing
                >
                  <option value="">Select Category</option>
                  {menuCategories.map((c) => (
                    <option key={c.category} value={c.category}>
                      {c.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block font-semibold mb-1" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  className="block font-semibold mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                  rows={3}
                />
              </div>
              <div className="mb-2">
                <label className="block font-semibold mb-1" htmlFor="price">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1" htmlFor="imageUrl">
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded"
                >
                  {editItem ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
=======
    <div>
      <h2>Admin Menu Management</h2>
      {menu.map(category => (
        <div key={category._id} style={{ marginBottom: '30px' }}>
          <h3>{category.category}</h3>
          <button onClick={() => handleAddClick(category._id)}>Add New Item</button>
          <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {category.items.map(item => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>
                    <img src={item.imageUrl} alt={item.title} style={{ width: '80px' }} />
                  </td>
                  <td>
                    <button onClick={() => handleEditClick(category._id, item)}>Edit</button>
                    <button onClick={() => handleDelete(category._id, item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {addingCategoryId === category._id && (
                <tr>
                  <td>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                  </td>
                  <td>
                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
                  </td>
                  <td>
                    <input type="text" name="price" value={formData.price} onChange={handleInputChange} required />
                  </td>
                  <td>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required />
                  </td>
                  <td>
                    <button onClick={handleAdd}>Add</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}

      {editingItem && (
        <div style={{ marginTop: '20px' }}>
          <h3>Edit Item</h3>
          <form onSubmit={e => { e.preventDefault(); handleUpdate(); }}>
            <div>
              <label>Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Description:</label>
              <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Price:</label>
              <input type="text" name="price" value={formData.price} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Image URL:</label>
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
>>>>>>> Stashed changes
        </div>
      )}
    </div>
  );
<<<<<<< Updated upstream
}
=======
};

export default AdminMenu;
>>>>>>> Stashed changes
