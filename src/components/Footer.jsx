import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTelegram, FaFacebook } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Valerion Style</h3>
            <p>Zamonaviy moda va aksessuarlar olami. Biz bilan o'z uslubingizni yarating.</p>
          </div>
          <div className="footer-section">
            <h4>Tezkor Linklar</h4>
            <nav className="footer-nav">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/services">Services</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>
          <div className="footer-section">
            <h4>Biz bilan bog'laning</h4>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://t.me/sunnatillo" target="_blank" rel="noreferrer"><FaTelegram /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Valerion Style. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
