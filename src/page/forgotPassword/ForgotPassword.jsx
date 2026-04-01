import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Simulate an API call
    setTimeout(() => {
      // In a real app, we'd check the database. 
      // Here we check if any user exists just for simulation.
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const userExists = existingUsers.length > 0;

      if (userExists) {
        setMessage(`Parolni tiklash havolasi ${email} manziliga muvaffaqiyatli yuborildi! ✅`);
      } else {
        setMessage("Tizimda hech qanday foydalanuvchi topilmadi. ❌");
      }
      setLoading(false);
      setEmail("");
    }, 1500);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h2>Forgot Password</h2>
        <p className="forgot-desc">Emailingizni kiriting va biz sizga parolni tiklash havolasini yuboramiz.</p>

        <form onSubmit={handleSubmit} className="forgot-form">
          <input
            type="email"
            placeholder="Email kiriting"
            className="forgot-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="forgot-btn"
            disabled={loading}
          >
            {loading ? "Yuborilmoqda..." : "Reset Password"}
          </button>
        </form>

        {message && <p className={`status-msg ${message.includes('muvaffaqiyatli') ? 'success' : 'error'}`}>{message}</p>}

        <p className="register-link">
          Hisobingiz yo‘qmi?{" "}
          <Link to="/register">
            <span>Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;