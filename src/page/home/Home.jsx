import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  // Load products from localStorage (admin added products)
  const storedProducts = localStorage.getItem("products");
  const products = storedProducts ? JSON.parse(storedProducts) : [];

  const handleBuy = (product) => {
    navigate("/card", { state: { product } });
  };

  // Agar rasm yuklanmay qolsa, zaxira rasm qo'yish funksiyasi
  const handleImgError = (e) => {
    e.target.src = "https://via.placeholder.com/500x500?text=Rasm+topilmadi";
  };

  return (
    <div className="cards">
      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <h2>Mahsulotlar hali qo'shilmagan</h2>
          <p>Admin panelda yangi mahsulotlar qo'shing</p>
        </div>
      ) : (
        products.map((item, index) => (
          <div className="card" key={index}>
            <img 
              src={item.img} 
              alt={item.title} 
              loading="lazy" 
              onError={handleImgError}
              style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }} 
            />
            <h3>{item.title}</h3>
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
  );
}

export default Home;
