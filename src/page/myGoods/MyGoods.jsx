import React, { useState, useEffect } from 'react';
import "./MyGoods.css";

const MyGoods = () => {
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem('my_stored_cards');
    return savedCards ? JSON.parse(savedCards) : [];
  });
  
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState(''); // Narx o'rniga username

  const BOT_TOKEN = "8198969144:AAGHj8bm5FWGZx25RHW6CCKSQAIrWEGIPAg";
  const CHAT_ID = "8069385823";

  useEffect(() => {
    localStorage.setItem('my_stored_cards', JSON.stringify(cards));
  }, [cards]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCard = (e) => {
    e.preventDefault();
    if (!image || !title || !username) return alert("Barcha maydonlarni to'ldiring!");
    
    // Username'dan '@' belgisini olib tashlash (agar bo'lsa) link to'g'ri ishlashi uchun
    const cleanUsername = username.startsWith('@') ? username.substring(1) : username;

    const newCard = { 
      id: Date.now(), 
      image, 
      title, 
      tgUser: username, // Ko'rinishi uchun @ bilan
      link: `https://t.me/${cleanUsername}` // Telegram profil linki
    };

    setCards([newCard, ...cards]);
    setTitle(''); 
    setUsername(''); 
    setImage(null);
  };

  const handlePurchase = (card) => {
    const message = `🛍 *Yangi buyurtma!*\n\n` +
                    `📦 *Mahsulot:* ${card.title}\n` +
                    `👤 *Mijoz:* ${card.tgUser}\n` + // Narx o'rniga mijoz useri
                    `🔗 *Profil:* ${card.link}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      }),
    });

    window.open(card.link, "_blank");
  };

  const deleteCard = (id) => {
    const filtered = cards.filter(card => card.id !== id);
    setCards(filtered);
  };

  return (
    <div className="container">
      <h1>Mahsulot Qo'shish</h1>
      
      <form className="upload-form" onSubmit={addCard}>
        <input 
          type="text" 
          placeholder="Mahsulot nomi" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}  
        />
        <input 
          type="text" 
          placeholder="Telegram usernamingiz (masalan: @sunnatillo)" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="Preview" className="preview-img" style={{width: '100px', marginTop: '10px'}} />}
        <button type="submit">Kartochka yaratish</button>
      </form>

      <div className="cards">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <img src={card.image} alt={card.title} />
            <h3>{card.title}</h3>
            <p className="desc">Mahsulot egasi bilan bog'lanish uchun pastdagi tugmani bosing.</p>
            <div className="card-bottom">
              <span className="price">{card.tgUser}</span>
              <button onClick={() => handlePurchase(card)}>Bog'lanish</button>
            </div>
            <button 
              onClick={() => deleteCard(card.id)} 
              style={{marginTop: '10px', background: '#ff4d4d', fontSize: '12px'}}
            >
              O'chirish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyGoods;