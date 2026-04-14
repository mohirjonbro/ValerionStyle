import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { TiShoppingCart } from "react-icons/ti";
import "./Header.css";

function Header({ signet, setSignet, isAdmin: isAdminProp, setIsAdmin }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  // 🔥 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");

    setSignet(false);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <NavLink to="/" onClick={closeMenu}>
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className={`nav ${open ? "active" : ""}`}>
        {isAdminProp && (
          <NavLink to="/admin" onClick={closeMenu} className="admin-link">
            👤 Admin Panel
          </NavLink>
        )}

        <NavLink to="/my" onClick={closeMenu}>My Goods</NavLink>
        <NavLink to="/" onClick={closeMenu} end>Home</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        <NavLink to="/card" onClick={closeMenu} className="cart-link">
          <TiShoppingCart />
        </NavLink>

        {/* 🔥 LOGOUT BUTTON */}
        {signet && (
          <button onClick={handleLogout} className="logout-btn">
            Chiqish
          </button>
        )}
      </nav>

      {/* Burger Button */}
      <button className="menu-btn" onClick={toggleMenu}>
        {open ? "✖" : "☰"}
      </button>
    </header>
  );
}

export default Header;