import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Admin.css";

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    img: "",
    category: "kiyim"
  });

  useEffect(() => {
    // Get product data from location state
    if (location.state && location.state.product) {
      setProduct(location.state.product);
      setFormData({
        title: location.state.product.title || "",
        description: location.state.product.description || "",
        price: location.state.product.price || "",
        img: location.state.product.img || "",
        category: location.state.product.category || "kiyim"
      });
    } else {
      // No product data, redirect to admin
      navigate("/admin");
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          img: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price) {
      alert("Title and Price are required!");
      return;
    }

    const { productIndex, isDefaultProduct } = location.state;

    if (isDefaultProduct) {
      // Update default product
      const editedDefaults = localStorage.getItem("editedDefaultProducts");
      let defaultProducts = editedDefaults ? JSON.parse(editedDefaults) : [];
      
      // If no edited defaults exist yet, we need to get the original defaults
      if (!editedDefaults) {
        // This shouldn't happen as we pass the full defaultProducts array
        alert("Error: Default products not found");
        return;
      }

      defaultProducts[productIndex] = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        img: formData.img,
        category: formData.category
      };

      localStorage.setItem("editedDefaultProducts", JSON.stringify(defaultProducts));
    } else {
      // Update admin product
      const adminProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const adminIndex = productIndex - location.state.defaultProductsCount;
      
      adminProducts[adminIndex] = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        img: formData.img,
        category: formData.category
      };

      localStorage.setItem("products", JSON.stringify(adminProducts));
    }

    alert("Product updated successfully ✅");
    navigate("/admin");
  };

  if (!product) {
    return <div className="loading-admin"><p>Loading...</p></div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>✏️ Edit Product</h1>
        <button className="clear-btn" onClick={() => navigate("/admin")}>
          Back to Admin
        </button>
      </div>

      <div className="products-section">
        <div className="add-product-form" style={{ marginTop: 0 }}>
          <h3>Edit: {product.title}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
            />
            <div className="form-row">
              <input
                type="text"
                name="price"
                placeholder="Price (e.g., 320 000 so'm)"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
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
                  onChange={handleImageChange}
                  className="file-input"
                />
              </label>
              <p className="or-text">- OR -</p>
              <input
                type="url"
                name="img"
                placeholder="Image URL"
                value={formData.img}
                onChange={handleChange}
              />
            </div>
            {formData.img && (
              <div className="admin-img-preview">
                <p>Image Preview:</p>
                <img src={formData.img} alt="Product preview" />
              </div>
            )}
            <button type="submit" className="submit-product-btn">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
