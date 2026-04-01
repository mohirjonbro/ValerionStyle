import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Oops! Sahifa topilmadi</h2>
        <p>Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan bo'lishi mumkin.</p>
        <Link to="/" className="home-btn">Bosh sahifaga qaytish</Link>
      </div>
    </div>
  );
};

export default NotFound;
