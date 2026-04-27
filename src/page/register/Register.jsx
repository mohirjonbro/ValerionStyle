import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 loading state
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Register muvaffaqiyatli ✅");
        
        // Avtomatik login qilish
        const userData = data.user || { username: name, role: 'user' };
        localStorage.setItem("token", data.token || "mock-token");
        localStorage.setItem("username", userData.username);
        localStorage.setItem("isAdmin", "false");
        
        if (typeof setSignet === 'function') setSignet(true);
        if (typeof setIsAdmin === 'function') setIsAdmin(false);

        navigate("/");
      } else {
        alert(data.message || "Xatolik yuz berdi ❌");
      }
    } catch (err) {
      console.error("Registration error:", err);
      // Suppress the scary error and explain what to do
      alert("Server hozircha band yoki o'chiq. Iltimos keyinroq urinib ko'ring. ⏳");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={registerUser}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Yuklanmoqda..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;