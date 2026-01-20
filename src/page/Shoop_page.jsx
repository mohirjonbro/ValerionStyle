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

  // 🛒 CART
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ➕ FAQAT 1 MARTA QO‘SHILADI
  useEffect(() => {
    if (!product) return;

    setCart((prev) => {
      const exists = prev.find((item) => item.title === product.title);
      if (exists) return prev;

      const updated = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updated));
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
    localStorage.setItem("cart", JSON.stringify(updated));
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
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const deleteItem = (title) => {
    const updated = cart.filter((item) => item.title !== title);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
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
      alert("Iltimos, barcha ma’lumotlarni to‘ldiring");
      return;
    }

    let text = `🛒 YANGI BUYURTMA\n\n`;
    text += `👤 Ism: ${name}\n`;
    text += `📞 Telefon: ${phone}\n`;
    text += `📍 Manzil: ${address}\n\n`;

    cart.forEach((item, i) => {
      text += `${i + 1}. ${item.title}\n`;
      text += `💰 ${item.price}\n`;
      text += `📦 Soni: ${item.quantity}\n\n`;
    });

    text += `💵 Umumiy: ${totalPrice.toLocaleString()} so‘m`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    });

    alert("Buyurtma  yuborildi ✅");
    localStorage.removeItem("cart");
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

      {/* EMPTY */}
      {cart.length === 0 && <div className="empty">Savat bo‘sh</div>}

      {/* CART */}
      <div className="cart">
        {cart.map((item) => (
          <div className="cart-item" key={item.title}>
            <img src={item.img} alt={item.title} />

            <div className="cart-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
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
              Umumiy: {totalPrice.toLocaleString()} so‘m
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
