import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ShopPage.css";

// 🤖 TELEGRAM BOT
const BOT_TOKEN = "8198969144:AAGHj8bm5FWGZx25RHW6CCKSQAIrWEGIPAg";
const CHAT_ID = "8069385823";

const ShopPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  // 👤 USER INFO
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // 🛒 CART - User-specific cart for each user
  const [cart, setCart] = useState(() => {
    const currentUser = localStorage.getItem("username");
    const cartKey = "cart_" + (currentUser || "guest");
    const saved = localStorage.getItem(cartKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Helper function to get current user's cart key
  const getCartKey = () => {
    const currentUser = localStorage.getItem("username");
    return "cart_" + (currentUser || "guest");
  };

  // ➕ FAQAT 1 MARTA QO'SHILADI
  useEffect(() => {
    if (!product) return;

    setCart((prev) => {
      const exists = prev.find((item) => item.title === product.title);
      if (exists) return prev;

      const updated = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem(getCartKey(), JSON.stringify(updated));
      return updated;
    });

    navigate("/card", { replace: true });
  }, [product, navigate]);

  // ➕ / ➖
  const increase = (title) => {
    const updated = cart.map((item) =>
      item.title === title
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updated);
    localStorage.setItem(getCartKey(), JSON.stringify(updated));
  };

  const decrease = (title) => {
    const updated = cart
      .map((item) =>
        item.title === title
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updated);
    localStorage.setItem(getCartKey(), JSON.stringify(updated));
  };

  const deleteItem = (title) => {
    const updated = cart.filter((item) => item.title !== title);
    setCart(updated);
    localStorage.setItem(getCartKey(), JSON.stringify(updated));
  };

  // 💰 HISOB
  const totalPrice = cart.reduce((sum, item) => {
    const price = Number(item.price.replace(/\D/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const totalQuantity = cart.reduce((s, i) => s + i.quantity, 0);

  // 📤 TELEGRAMGA YUBORISH
  const sendToTelegram = async () => {
    if (!name || !phone || !address) {
      alert("Iltimos, barcha ma'lumotlarni to'ldiring");
      return;
    }

    let text = `🛒 YANGI BUYURTMA\n\n`;
    text += `👤 Ism: ${name}\n`;
    text += `📞 Telefon: ${phone}\n`;
    text += `📍 Manzil: ${address}\n\n`;

    cart.forEach((item, i) => {
      text += `${i + 1}. ${item.title}\n`;
      if (item.size) text += `📐 O'lcham: ${item.size}\n`;
      text += `💰 ${item.price}\n`;
      text += `📦 Soni: ${item.quantity}\n\n`;
    });

    text += `💵 Umumiy: ${totalPrice.toLocaleString()} so'm`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    });

    alert("Buyurtma yuborildi ✅");
    localStorage.removeItem(getCartKey());
    setCart([]);
    setName("");
    setPhone("");
    setAddress("");
  };

  return (
    <div className="shop">
      {/* HEADER */}
      <header className="shop-header">
        <h1>Savatcha</h1>
        <p>Mahsulotlar soni: {totalQuantity}</p>
      </header>

      {/* EMPTY STATE */}
      {cart.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <h2>Savatingiz hali bo'sh</h2>
          <p>Mahsulotlarni ko'rib, xarid qilishni boshlang!</p>
          <button className="shop-now-btn" onClick={() => navigate("/")}>
            Xarid qilish
          </button>
        </div>
      )}

      {/* CART */}
      <div className="cart">
        {cart.map((item) => (
          <div className="cart-item" key={item.title}>
            <img src={item.img} alt={item.title} />

            <div className="cart-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.size && <p style={{ color: '#6366f1', fontWeight: 600 }}>O'lcham: {item.size}</p>}
              <strong>{item.price}</strong>
              <p>Soni: {item.quantity}</p>
            </div>

            <div className="actions">
              <button onClick={() => decrease(item.title)}>−</button>
              <button onClick={() => increase(item.title)}>+</button>
              <button onClick={() => deleteItem(item.title)}>🗑</button>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <div className="total">
              Umumiy: {totalPrice.toLocaleString()} so'm
            </div>

            <div className="form">
              <input
                placeholder="Ismingiz"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                placeholder="Manzil"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button className="order-btn" onClick={sendToTelegram}>
              Buyurtma berish
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
