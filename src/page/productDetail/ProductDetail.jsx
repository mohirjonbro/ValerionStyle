import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaTruck, FaShieldAlt, FaStar, FaStarHalfAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import "./ProductDetail.css";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) {
    return (
      <div className="detail-not-found">
        <h2>Mahsulot topilmadi</h2>
        <p>Iltimos, bosh sahifadan mahsulotni tanlang</p>
        <button onClick={() => navigate("/")}>
          <FaArrowLeft /> Bosh sahifa
        </button>
      </div>
    );
  }

  // Generate sizes based on category
  const getSizes = () => {
    if (product.category === "oyoq-kiyim") {
      return [37, 38, 39, 40, 41, 42, 43, 44];
    } else if (product.category === "aksessuar") {
      return null; // No sizes for accessories
    }
    return ["XS", "S", "M", "L", "XL", "XXL"];
  };

  const sizes = getSizes();

  // Random rating between 4.0 - 5.0
  const rating = (4 + Math.random()).toFixed(1);
  const reviewCount = Math.floor(50 + Math.random() * 200);

  const handleBuy = () => {
    if (sizes && !selectedSize) {
      alert("Iltimos, o'lcham tanlang!");
      return;
    }
    navigate("/card", { state: { product: { ...product, size: selectedSize } } });
  };

  const renderStars = () => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating - full >= 0.5;
    for (let i = 0; i < full; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (hasHalf) stars.push(<FaStarHalfAlt key="half" />);
    return stars;
  };

  return (
    <div className="product-detail">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
        <span>Orqaga</span>
      </button>

      <div className="detail-container">
        {/* Left: Image Section */}
        <div className="detail-image-section">
          <div className="main-image-wrapper">
            <div className="image-badge">
              {product.category === "kiyim" && "👕 Kiyim"}
              {product.category === "oyoq-kiyim" && "👟 Oyoq kiyim"}
              {product.category === "aksessuar" && "🎒 Aksessuar"}
            </div>
            <img
              src={product.img}
              alt={product.title}
              className="main-image"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x600?text=Rasm+topilmadi";
              }}
            />
            <div className="image-overlay"></div>
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="detail-info-section">
          <div className="detail-category-tag">
            {product.category === "kiyim" && "Kiyimlar"}
            {product.category === "oyoq-kiyim" && "Oyoq kiyimlar"}
            {product.category === "aksessuar" && "Aksessuarlar"}
          </div>

          <h1 className="detail-title">{product.title}</h1>

          {/* Rating */}
          <div className="detail-rating">
            <div className="stars">{renderStars()}</div>
            <span className="rating-number">{rating}</span>
            <span className="review-count">({reviewCount} ta sharh)</span>
          </div>

          <p className="detail-description">{product.description}</p>

          {/* Price */}
          <div className="detail-price-block">
            <span className="detail-price">{product.price}</span>
          </div>

          {/* Sizes */}
          {sizes && (
            <div className="detail-sizes">
              <h4>O'lcham tanlang:</h4>
              <div className="sizes-grid">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="detail-actions">
            <button className="buy-btn" onClick={handleBuy}>
              <FaShoppingCart />
              Savatga qo'shish
            </button>
          </div>

          {/* Delivery & Service Info */}
          <div className="detail-features">
            <div className="feature-item">
              <FaClock />
              <div>
                <strong>Доставка</strong>
                <span>12-15 kun (дней)</span>
              </div>
            </div>
            <div className="feature-item">
              <FaTruck />
              <div>
                <strong>Карго +</strong>
                <span>Xitoydan yetkazib berish</span>
              </div>
            </div>
            <div className="feature-item">
              <FaCheckCircle />
              <div>
                <strong>Надёжный сервис</strong>
                <span>Ishonchli xizmat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
