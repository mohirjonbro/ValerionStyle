import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  
  // Product management states
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "kiyim"
  });
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "user"
  });

  // Verify admin access and load users
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    
    if (adminStatus !== "true") {
      window.location.href = "/login";
      return;
    }

    setIsAdminVerified(true);
    
    // Set current user from localStorage
    const username = localStorage.getItem("username");
    if (username) {
      setCurrentUser({ username });
    }

    // Load users from API
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/users");
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Users API error:", data.message);
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders");
      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("Orders API error:", data.message);
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Products API error:", data.message);
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
  };

  // Delete user function
  const deleteUser = async (user) => {
    if (window.confirm(`Delete user ${user.username}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/users/${user._id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          fetchUsers();
          alert("User deleted successfully ✅");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Order management
  const updateOrderStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchOrders();
        alert(`Buyurtma holati yangilandi: ${status} ✅`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Buyurtmani o'chirib tashlamoqchimisiz?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          fetchOrders();
          alert("Buyurtma o'chirildi ❌");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Clear all users
  const clearAllUsers = async () => {
    if (window.confirm("Barcha foydalanuvchilarni o'chirib tashlamoqchimisiz? (Admin qoladi)")) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/clear-all", {
          method: "DELETE"
        });
        if (response.ok) {
          fetchUsers();
          alert("Foydalanuvchilar o'chirildi ✅");
        } else {
          alert("Xatolik yuz berdi ❌");
        }
      } catch (err) {
        console.error(err);
        alert("Server bilan aloqa yo'q ❌");
      }
    }
  };

  // Clear all products
  const clearAllProducts = async () => {
    if (window.confirm("Barcha mahsulotlarni o'chirib tashlamoqchimisiz?")) {
      try {
        const response = await fetch("http://localhost:5000/api/products/clear-all", {
          method: "DELETE"
        });
        if (response.ok) {
          fetchProducts();
          alert("Mahsulotlar o'chirildi ✅");
        } else {
          alert("Xatolik yuz berdi ❌");
        }
      } catch (err) {
        console.error(err);
        alert("Server bilan aloqa yo'q ❌");
      }
    }
  };

  // Add new product via API
  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    if (!newProduct.title || !newProduct.price) {
      alert("Title and Price are required!");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        fetchProducts();
        alert("Product added successfully ✅");
        setNewProduct({ title: "", description: "", price: "", img: "", category: "kiyim" });
        setShowAddProduct(false);
      } else {
        alert("Error adding product ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };
  
  // Add new user via API
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) {
      alert("Username and Password are required!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchUsers();
        alert("User added successfully ✅");
        setNewUser({ username: "", password: "", role: "user" });
        setShowAddUser(false);
      } else {
        const data = await response.json();
        alert(data.message || "Error adding user ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({
          ...prev,
          img: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete product
  const deleteProduct = async (product) => {
    if (window.confirm(`Delete product ${product.title}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          fetchProducts();
          alert("Product deleted ✅");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Start editing a product - navigate to edit page
  const startEditProduct = (index) => {
    const productToEdit = products[index];
    const isDefaultProduct = false; // Now all products are handled equally from DB
    
    navigate("/admin/edit-product", {
      state: {
        product: productToEdit,
        productIndex: index,
        isDefaultProduct: isDefaultProduct
      }
    });
  };

  return (
    <div className="admin-container">
      {!isAdminVerified ? (
        <div className="loading-admin">
          <p>Verifying admin access...</p>
        </div>
      ) : (
        <>
          <div className="admin-header">
            <h1>👤 Admin Panel</h1>
            {currentUser && (
              <div className="current-user-info">
                <span>Logged in as: <strong>{currentUser.username}</strong></span>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-number">{users.length}</p>
              <div className="stat-detail">
                <span>{users.filter(u => u.role === 'admin').length} Admins</span>
                <span>{users.filter(u => u.role !== 'admin').length} Users</span>
              </div>
            </div>
            <div className="stat-card">
              <h3>Total Products</h3>
              <p className="stat-number">{products.length}</p>
            </div>
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p className="stat-number">{orders.length}</p>
            </div>
          </div>

          {/* Users Table */}
          <div className="users-section">
            <div className="section-header">
              <h2>Registered Users ({users.length})</h2>
              <div className="section-actions">
                <button className="add-product-btn" onClick={() => setShowAddUser(!showAddUser)}>
                  {showAddUser ? "Cancel" : "+ Add User"}
                </button>
                {users.length > 0 && (
                  <button className="clear-btn" onClick={clearAllUsers}>
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {showAddUser && (
              <div className="add-product-form" style={{ marginBottom: '20px' }}>
                <h3>Add New User</h3>
                <form onSubmit={handleAddUser}>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      required
                    />
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="category-select"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button type="submit" className="submit-product-btn">
                    Create User
                  </button>
                </form>
              </div>
            )}

            {users.length === 0 ? (
              <div className="empty-state">
                <p>No registered users found</p>
              </div>
            ) : (
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Role</th>
                      <th>Registration Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(users) && users.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="username-cell">{user.username}</td>
                        <td className="password-cell">{user.password}</td>
                        <td>
                          <span className={`role-badge ${user.role || 'user'}`}>
                            {user.role || 'user'}
                          </span>
                        </td>
                        <td>
                          {user.registeredAt 
                            ? new Date(user.registeredAt).toLocaleString() 
                            : "N/A"}
                        </td>
                        <td>
                          <button 
                            className="delete-btn"
                            onClick={() => deleteUser(user)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Orders Section */}
          <div className="users-section">
            <div className="section-header">
              <h2>🛒 Customer Orders</h2>
            </div>

            {orders.length === 0 ? (
              <div className="empty-state">
                <p>No orders received yet</p>
              </div>
            ) : (
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="password-cell" style={{ fontSize: '0.7rem' }}>{order._id}</td>
                        <td className="username-cell">
                          {order.customerDetails.name}<br/>
                          <small style={{ color: 'var(--text-dim)' }}>{order.customerDetails.phone}</small>
                        </td>
                        <td>
                          {order.items.map((item, i) => (
                            <div key={i} style={{ fontSize: '0.8rem' }}>
                              • {item.title} ({item.quantity}) {item.size && `[${item.size}]`}
                            </div>
                          ))}
                        </td>
                        <td style={{ fontWeight: 'bold', color: '#10b981' }}>
                          {order.totalPrice.toLocaleString()} so'm
                        </td>
                        <td>
                          <span className={`status-badge ${order.status || 'pending'}`}>
                            {order.status || 'pending'}
                          </span>
                        </td>
                        <td>
                          {new Date(order.createdAt).toLocaleString()}
                        </td>
                        <td>
                          <div className="order-actions">
                            <button 
                              className="accept-btn" 
                              onClick={() => updateOrderStatus(order._id, 'completed')}
                              title="Qabul qilish"
                            >
                              ✓
                            </button>
                            <button 
                              className="reject-btn" 
                              onClick={() => deleteOrder(order._id)}
                              title="O'chirish"
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Products Section */}
          <div className="products-section">
            <div className="section-header">
              <h2>📦 Product Management</h2>
              <div className="section-actions">
                <button 
                  className="add-product-btn"
                  onClick={() => setShowAddProduct(!showAddProduct)}
                >
                  {showAddProduct ? "Cancel" : "+ Add Product"}
                </button>
                {products.length > 0 && (
                  <button className="clear-btn" onClick={clearAllProducts}>
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {showAddProduct && (
              <div className="add-product-form">
                <h3>Add New Product</h3>
                <form onSubmit={handleAddProduct}>
                  <input
                    type="text"
                    placeholder="Product Title"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                    required
                  />
                  <textarea
                    placeholder="Product Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Price (e.g., 320 000 so'm)"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      required
                    />
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="category-select"
                    >
                      <option value="kiyim">Kiyim</option>
                      <option value="oyoq-kiyim">Oyoq kiyim</option>
                      <option value="aksessuar">Aksessuar</option>
                    </select>
                  </div>
                  <div className="image-upload-section">
                    <label className="upload-label">
                      <span>Upload Image from Computer</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input"
                      />
                    </label>
                    <p className="or-text">- OR -</p>
                    <input
                      type="url"
                      placeholder="Image URL"
                      value={newProduct.img}
                      onChange={(e) => setNewProduct({...newProduct, img: e.target.value})}
                    />
                  </div>
                  {newProduct.img && (
                    <div className="admin-img-preview">
                      <p>Image Preview:</p>
                      <img src={newProduct.img} alt="Product preview" />
                    </div>
                  )}
                  <button type="submit" className="submit-product-btn">
                    Add Product
                  </button>
                </form>
              </div>
            )}

            {products.length === 0 ? (
              <div className="empty-state">
                <p>No custom products added yet</p>
              </div>
            ) : (
              <div className="products-table">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {product.img ? (
                            <img src={product.img} alt={product.title} className="product-thumb" />
                          ) : (
                            <div className="no-image">No Image</div>
                          )}
                        </td>
                        <td className="username-cell">{product.title}</td>
                        <td className="category-cell">{product.category}</td>
                        <td>{product.price}</td>
                        <td className="actions-cell">
                          <button 
                            className="edit-btn"
                            onClick={() => startEditProduct(index)}
                          >
                            Edit
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => deleteProduct(product)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
