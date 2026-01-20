import React, { useState } from "react";
import "./Contact.css";

const BOT_TOKEN = "8371787004:AAEubGzjF3gnQkDi4behUhAqA-xbaS4xIbA"; // Telegram bot token
const CHAT_ID = "8069385823"; // Chat ID

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = `Yangi xabar:\nIsm: ${formData.name}\nTelefon: ${formData.phone}\nXabar: ${formData.message}`;

    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.ok) {
        setStatus("Xabaringiz yuborildi! Tez orada siz bilan bog'lanamiz.");
      } else {
        setStatus("Xabar yuborilmadi, iltimos qayta urinib ko'ring.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Xatolik yuz berdi, iltimos qayta urinib ko'ring.");
    }

    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2>Biz bilan bog'laning</h2>
        <p>Kiyim yoki aksessuar bo‘yicha savol va buyurtmalar bo‘lsa, bizga xabar yuboring.</p>

        {status && <p className="status-message">{status}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ismingiz</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Telefon raqamingiz</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Xabaringiz</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required></textarea>
          </div>
          <button type="submit">Yuborish</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
