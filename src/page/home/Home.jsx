import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { fetchWithCache } from "../../utils/apiHelper";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "Barchasi" },
    { id: "kiyim", label: "Kiyimlar" },
    { id: "oyoq-kiyim", label: "Oyoq kiyimlar" },
    { id: "aksessuar", label: "Aksessuarlar" },
  ];

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      const data = await fetchWithCache("http://localhost:5000/api/products", "cached_products");
      
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProductsData();
  }, []);

  const handleBuy = (product) => {
    navigate("/card", { state: { product } });
  };

  const handleDetail = (product) => {
    navigate("/product", { state: { product } });
  };

  const handleImgError = (e) => {
    e.target.src = "https://via.placeholder.com/500x500?text=Rasm+topilmadi";
  };

  // Filter products based on search term and category
  const filteredProducts = Array.isArray(products) ? products.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  return (
    <div className="home-page">
      <div className="home-controls">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Mahsulotlarni qidirish..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="categories-container">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <h2>Yuklanmoqda...</h2>
        </div>
      ) : (
        <div className="cards">
        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <h2>Mahsulotlar topilmadi 🔍</h2>
            <p>Boshqa so'z bilan qidirib ko'ring.</p>
          </div>
        ) : (
          filteredProducts.map((item, index) => (
            <div className="card" key={index}>
            <div className="card-top" onClick={() => handleDetail(item)} style={{ cursor: "pointer" }}>
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              onError={handleImgError}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3>{item.title}</h3>
            </div>
            <p className="desc">{item.description}</p>

            <div className="card-bottom">
              <span className="price">{item.price}</span>
              <button onClick={() => handleBuy(item)}>
                Sotib olish
              </button>
            </div>
            </div>
          ))
        )}
        </div>
      )}
    </div>
  );
}

export default Home;