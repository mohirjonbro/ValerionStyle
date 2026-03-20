import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { TiShoppingCart } from "react-icons/ti";
import "./Header.css";

function Header() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if current user is admin on component mount
  React.useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Navigation */}
      <nav className={`nav ${open ? "active" : ""}`}>
        {isAdmin && (
          <Link to="/admin" onClick={closeMenu} className="admin-link">👤 Admin Panel</Link>
        )}
        <Link to="my" onClick={closeMenu}>My Goods</Link>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/services" onClick={closeMenu}>Services</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
        <Link to="/card" onClick={closeMenu}> <TiShoppingCart /> </Link>
      </nav>

      {/* Burger Button */}
      <button className="menu-btn" onClick={toggleMenu}>
        {open ? "✖" : "☰"}
      </button>
    </header>
  );
}

export default Header;
