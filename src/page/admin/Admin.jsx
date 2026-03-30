import React, { useState, useEffect } from "react";
import "./Admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  
  // Product management states
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    img: ""
  });

  // Verify admin access and load users
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    
    if (adminStatus !== "true") {
      // Not an admin, redirect to login
      window.location.href = "/login";
      return;
    }

    setIsAdminVerified(true);

    const storedUsers = localStorage.getItem("registeredUsers");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUsers(parsedUsers);
      
      // Get current logged in user info
      const currentUsername = localStorage.getItem("username");
      const foundUser = parsedUsers.find(u => u.username === currentUsername);
      if (foundUser) {
        setCurrentUser(foundUser);
      }
    }
  }, []);

  // Load products from backend on component mount
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching admin products:", err));
  }, []);

  // Delete user function
  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    alert("User deleted successfully ✅");
  };

  // Clear all users
  const clearAllUsers = () => {
    if (window.confirm("Are you sure you want to delete all users?")) {
      setUsers([]);
      localStorage.removeItem("registeredUsers");
      alert("All users deleted ❌");
    }
  };

  // Add new product via API
  const handleAddProduct = (e) => {
    e.preventDefault();
    
    if (!newProduct.title || !newProduct.price) {
      alert("Title and Price are required!");
      return;
    }
    
    const productToAdd = {
      ...newProduct,
      id: Date.now().toString()
    };
    
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productToAdd)
    })
    .then(res => res.json())
    .then(data => {
      setProducts([...products, data]);
      alert("Product added successfully ✅");
      setNewProduct({ title: "", description: "", price: "", img: "" });
      setShowAddProduct(false);
    })
    .catch(err => alert("Error adding product! Is json-server running?"));
  };

  // Delete product via API
  const deleteProduct = (index) => {
    if (window.confirm("Delete this product?")) {
      const productToDelete = products[index];
      
      fetch(`http://localhost:5000/products/${productToDelete.id}`, {
        method: "DELETE"
      })
      .then(() => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        alert("Product deleted ✅");
      })
      .catch(err => alert("Error deleting product!"));
    }
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
            </div>
            <div className="stat-card">
              <h3>Active Session</h3>
              <p className="stat-number">{currentUser ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Users Table */}
          <div className="users-section">
            <div className="section-header">
              <h2>Registered Users</h2>
              {users.length > 0 && (
                <button className="clear-btn" onClick={clearAllUsers}>
                  Clear All
                </button>
              )}
            </div>

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
                      <th>Registration Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="username-cell">{user.username}</td>
                        <td className="password-cell">••••••••</td>
                        <td>
                          {user.registeredAt 
                            ? new Date(user.registeredAt).toLocaleString() 
                            : "N/A"}
                        </td>
                        <td>
                          <button 
                            className="delete-btn"
                            onClick={() => deleteUser(index)}
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

          {/* Registration Info */}
          <div className="info-section">
            <h3>ℹ️ How it works:</h3>
            <ul>
              <li>User data is stored in browser's localStorage</li>
              <li>Each registration creates a new user entry</li>
              <li>You can delete individual users or clear all</li>
              <li>Data persists across browser sessions</li>
            </ul>
          </div>

          {/* Products Section */}
          <div className="products-section">
            <div className="section-header">
              <h2>📦 Product Management</h2>
              <button 
                className="add-product-btn"
                onClick={() => setShowAddProduct(!showAddProduct)}
              >
                {showAddProduct ? "Cancel" : "+ Add Product"}
              </button>
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
                  <input
                    type="text"
                    placeholder="Price (e.g., 320 000 so'm)"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    required
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={newProduct.img}
                    onChange={(e) => setNewProduct({...newProduct, img: e.target.value})}
                  />
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
                      <th>Description</th>
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
                        <td>{product.description || "-"}</td>
                        <td>{product.price}</td>
                        <td>
                          <button 
                            className="delete-btn"
                            onClick={() => deleteProduct(index)}
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
