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
      if (file.size > 5 * 1024 * 1024) {
        alert("Rasm hajmi juda katta! (Max: 5MB)");
        return;
      }
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

  const removeSelectedImage = () => {
    setFormData(prev => ({
      ...prev,
      img: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price) {
      alert("Title and Price are required!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Product updated successfully ✅");
        navigate("/admin");
      } else {
        alert("Error updating product ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
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
              {!formData.img ? (
                <>
                  <label className="upload-label">
                    <div className="upload-icon">📁</div>
                    <span>Rasm yuklash (Kompyuterdan)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                    />
                  </label>
                  <p className="or-text">- YOKI -</p>
                  <input
                    type="url"
                    name="img"
                    placeholder="Rasm URL manzili (http://...)"
                    value={formData.img}
                    onChange={handleChange}
                    className="url-input"
                  />
                </>
              ) : (
                <div className="admin-img-preview-active">
                  <img src={formData.img} alt="Product preview" />
                  <button type="button" className="remove-img-btn" onClick={removeSelectedImage}>
                    O'chirish ✕
                  </button>
                </div>
              )}
            </div>
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
