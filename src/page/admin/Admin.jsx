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
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [adminProducts, setAdminProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    img: "",
    category: "kiyim"
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

  // Define default products (same as in Home.jsx)
  const allDefaultProducts = [
    {
      title: "Белый свитер",
      description: "Issiq va qulay oq sviter",
      price: "320 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Черный свитер",
      description: "Zamonaviy qora sviter",
      price: "350 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Зеленый костюм",
      description: "Sport va kundalik mos kostyum",
      price: "780 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1594932224828-b4b057b69b6d?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Синий костюм",
      description: "Qulay va stilni saqlovchi kostyum",
      price: "780 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Джинсы темные",
      description: "Oddiy va qulay ko'k jins",
      price: "450 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Джинсы светлые",
      description: "Yorqin rangdagi zamonaviy jins",
      price: "460 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Кепка",
      description: "Yozgi sport kepkalar",
      price: "120 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1588850561427-de2805a814c8?q=80&w=500&auto=format&fit=crop",
      category: "aksessuar"
    },
    {
      title: "Куртка коричневая",
      description: "Issiq va zamonaviy kurtka",
      price: "780 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Кроссовки белые",
      description: "Qulay va zamonaviy krossovka",
      price: "550 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1571609834229-97463665a6e5?q=80&w=500&auto=format&fit=crop",
      category: "oyoq-kiyim"
    },
    {
      title: "Кроссовки серые",
      description: "Sport va kundalik uchun krossovka",
      price: "550 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=500&auto=format&fit=crop",
      category: "oyoq-kiyim"
    },
    {
      title: "Худи серый",
      description: "Kundalik kiyish uchun hoodie",
      price: "380 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Худи черный",
      description: "Oddiy va qulay qora hoodie",
      price: "380 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1509942700367-aba912c7c7f3?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Shark Backpack",
      description: "Zamonaviy shark dizaynli ryukzak",
      price: "420 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop",
      category: "aksessuar"
    },
    {
      title: "Purple Shark Backpack",
      description: "Keng va mustahkam ryukzak",
      price: "420 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=500&auto=format&fit=crop",
      category: "aksessuar"
    },
    {
      title: "Sport Sneakers White",
      description: "Yengil va qulay sport krossovka",
      price: "550 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500&auto=format&fit=crop",
      category: "oyoq-kiyim"
    },
    {
      title: "Sport Sneakers Grey",
      description: "Kundalik va sport uchun mos",
      price: "550 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=500&auto=format&fit=crop",
      category: "oyoq-kiyim"
    },
    {
      title: "Street Hoodie White",
      description: "Issiq va yumshoq hoodie",
      price: "380 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Street Hoodie Black",
      description: "Minimal dizaynli qora hoodie",
      price: "380 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Winter Beanie",
      description: "Qish uchun issiq shapka",
      price: "120 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1576871337622-98d48d455353?q=80&w=500&auto=format&fit=crop",
      category: "aksessuar"
    },
    {
      title: "Marvel Cap",
      description: "Zamonaviy street kepka",
      price: "140 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500&auto=format&fit=crop",
      category: "aksessuar"
    },
    {
      title: "Winter Boots",
      description: "Sovuq ob-havo uchun oyoq kiyim",
      price: "480 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1520639889313-727216be35fe?q=80&w=500&auto=format&fit=crop",
      category: "oyoq-kiyim"
    },
    {
      title: "Sport Tracksuit",
      description: "Hoodie va shimdan iborat kostyum",
      price: "780 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1483721074892-4a85814592a6?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Casual Pants",
      description: "Keng va qulay shim",
      price: "320 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1624371414361-e6e9021b3584?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Knitted Sweater",
      description: "Kuz-qish uchun sviter",
      price: "350 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Leather Jacket Black",
      description: "Erkaklar uchun zamonaviy qora charm kurtka",
      price: "890 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Leather Jacket Brown",
      description: "Klassik jigarrang charm kurtka",
      price: "890 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Zip Hoodie Grey",
      description: "Fermuarli qulay kulrang hoodie",
      price: "420 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Zip Hoodie Black",
      description: "Minimal uslubdagi qora hoodie",
      price: "420 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Classic Shirt White",
      description: "Rasmiy va kundalik uchun oq ko'ylak",
      price: "360 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Striped Shirt",
      description: "Chiziqli zamonaviy erkaklar ko'ylagi",
      price: "380 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Knitted Sweater Navy",
      description: "Issiq va yumshoq to'q ko'k sviter",
      price: "370 000 so'm + Карго",
      img: "https://image.hm.com/assets/hm/a0/9c/a09c65c521c8084c25e211017af97443976d0db8.jpg?imwidth=2160",
      category: "kiyim"
    },
    {
      title: "Knitted Sweater Black",
      description: "Klassik qora sviter",
      price: "370 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Sport Shoes Black",
      description: "Kundalik va sport uchun qulay oyoq kiyim",
      price: "560 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop",
      category: "oyoq-kiyim"
    },
    {
      title: "Street Sneakers White",
      description: "Oq rangli trenddagi krossovka",
      price: "580 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500&auto=format&fit=crop",
      category: "oyoq-kiyim"
    },
    {
      title: "USA Hoodie Navy",
      description: "USA printli sport hoodie",
      price: "400 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "USA Hoodie Grey",
      description: "Issiq va qulay kulrang hoodie",
      price: "400 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1510022208032-4740e74f1b53?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Adidas Krossovkalar",
      description: "Adidas Classic | Qulay va yengil",
      price: "570 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=500&auto=format&fit=crop",
      category: "oyoq-kiyim"
    },
    {
      title: "Nike Krossovkalar",
      description: "Nike SB | Kundalik va sport uchun",
      price: "590 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop",
      category: "oyoq-kiyim"
    },
    {
      title: "Erkaklar Hoodie",
      description: "Paxta + flis | Issiq va qulay",
      price: "400 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1556821840-4103a4290074?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Qishki Kurtka (Puxovik)",
      description: "Shamol o'tkazmaydi | Juda issiq",
      price: "820 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1539533113208-fa804b86862b?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "USA Flag Sviter",
      description: "Trikotaj | Klassik dizayn",
      price: "370 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Erkaklar Shimlari",
      description: "Model: Klassik / Casual",
      price: "340 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1473966968600-fa804b86862b?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Klassik Palto",
      description: "Qalin mato | Klassik uslub",
      price: "950 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Aksessuarlar",
      description: "Sharf / Kepka / Ko'zoynak",
      price: "120 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=500&auto=format&fit=crop",
      category: "aksessuar"
    },
    {
      title: "Erkaklar clutch sumkasi",
      description: "Premium eko-teri | Ixcham dizayn",
      price: "320 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=500&auto=format&fit=crop",
      category: "aksessuar"
    },
    {
      title: "Klassik erkaklar sharf",
      description: "Yumshoq va issiq mato",
      price: "180 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=500&auto=format&fit=crop",
      category: "aksessuar"
    },
    {
      title: "Zipli erkaklar sviteri",
      description: "Qalin va issiq | Oldi fermuarli",
      price: "420 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1578939612197-03484b1b9e1b?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Tugmali erkaklar kardigani",
      description: "Yumshoq material | Smart-casual",
      price: "460 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=500&auto=format&fit=crop",
      category: "kiyim"
    },
    {
      title: "Premium erkaklar soati",
      description: "Luxury dizayn | Suvga chidamli",
      price: "1 250 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=500&auto=format&fit=crop",
      category: "aksessuar"
    },
    {
      title: "Erkaklar kepkasi",
      description: "Yengil va qulay | Quyoshdan himoya",
      price: "150 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=500&auto=format&fit=crop",
      category: "aksessuar"
    },
    {
      title: "Premium erkaklar krossovkasi",
      description: "Yengil va mustahkam taglik",
      price: "680 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=500&auto=format&fit=crop",
      category: "oyoq-kiyim"
    },
    {
      title: "Erkaklar casual poyabzali",
      description: "Minimal dizayn | Qulay taglik",
      price: "720 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=500&auto=format&fit=crop",
      category: "oyoq-kiyim"
    }
  ];

  // Load products from localStorage on component mount
  useEffect(() => {
    // Load admin-added products
    const savedProducts = localStorage.getItem("products");
    const adminProds = savedProducts ? JSON.parse(savedProducts) : [];
    setAdminProducts(adminProds);

    // Load edited default products (if any)
    const editedDefaults = localStorage.getItem("editedDefaultProducts");
    const defaultProds = editedDefaults ? JSON.parse(editedDefaults) : allDefaultProducts;
    setDefaultProducts(defaultProds);

    // Combine both
    setProducts([...defaultProds, ...adminProds]);
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
    
    const updatedAdminProducts = [...adminProducts, productToAdd];
    setAdminProducts(updatedAdminProducts);
    localStorage.setItem("products", JSON.stringify(updatedAdminProducts));
    
    // Update combined products
    setProducts([...defaultProducts, ...updatedAdminProducts]);
    
    alert("Product added successfully ✅");
    setNewProduct({ title: "", description: "", price: "", img: "", category: "kiyim" });
    setShowAddProduct(false);
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

  // Delete product - handles both default and admin products
  const deleteProduct = (index) => {
    if (window.confirm("Delete this product?")) {
      const productToDelete = products[index];
      
      // Check if it's a default product
      const isDefaultProduct = index < defaultProducts.length;
      
      if (isDefaultProduct) {
        // Remove from default products
        const updatedDefaultProducts = defaultProducts.filter((_, i) => i !== index);
        setDefaultProducts(updatedDefaultProducts);
        localStorage.setItem("editedDefaultProducts", JSON.stringify(updatedDefaultProducts));
      } else {
        // Remove from admin products
        const adminIndex = index - defaultProducts.length;
        const updatedAdminProducts = adminProducts.filter((_, i) => i !== adminIndex);
        setAdminProducts(updatedAdminProducts);
        localStorage.setItem("products", JSON.stringify(updatedAdminProducts));
      }
      
      // Update combined list
      setProducts([...defaultProducts.filter((_, i) => !isDefaultProduct || i !== index), 
                   ...adminProducts.filter((_, i) => isDefaultProduct || i !== (index - defaultProducts.length))]);
      
      alert("Product deleted ✅");
    }
  };

  // Start editing a product - navigate to edit page
  const startEditProduct = (index) => {
    const productToEdit = products[index];
    const isDefaultProduct = index < defaultProducts.length;
    
    navigate("/admin/edit-product", {
      state: {
        product: productToEdit,
        productIndex: index,
        isDefaultProduct: isDefaultProduct,
        defaultProductsCount: defaultProducts.length
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
            </div>
            <div className="stat-card">
              <h3>Total Products</h3>
              <p className="stat-number">{products.length}</p>
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
                        <td className="password-cell">{user.password}</td>
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
