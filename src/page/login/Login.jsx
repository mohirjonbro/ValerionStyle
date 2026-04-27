import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import React, { useState } from "react";

const Login = ({ setSignet, setIsAdmin }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitted = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSignet(true);
        setIsAdmin(data.user.role === "admin");
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", data.user.role === "admin" ? "true" : "false");
        localStorage.setItem("username", data.user.username);
        
        alert(`Xush kelibsiz ${data.user.username}! ✅`);
        navigate("/");
      } else {
        alert(data.message || "Login yoki parol noto'g'ri ❌");
      }
    } catch (err) {
      console.error("Connection error:", err);
      
      // Frontend Fallback: If server is down, allow login for the primary admin account
      if (name === "sardor" && password === "1234") {
        console.log("Offline mode: Logged in as sardor");
        setSignet(true);
        setIsAdmin(true);
        
        localStorage.setItem("token", "offline-token");
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("username", "sardor");
        
        alert("Server hozircha o'chiq, lekin siz Offline Admin rejimida kirdingiz! ⚠️");
        navigate("/");
      } else {
        alert("Server bilan aloqa yo'q. Iltimos, serverni yoqing yoki keyinroq urinib ko'ring. ⏳");
      }
    }
  };

  return (
    <div className="cyber-wrap">
      <div className="login-sec">
        <form className="login-form" onSubmit={submitted}>
          <h1>CYBER</h1>
          <h2>Log-in to your account</h2>

          <label>Username</label>
          <input
            className="username-inp"
            type="text"
            placeholder="Your username"
            onChange={(e) => setName(e.target.value)}
          />

          <label>Password</label>
          <input
            className="pass-inp"
            type="password"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="log-in" type="submit">
            Log-in
          </button>

          <p className="res-pass">
            Reset password{" "}
            <Link to="/forget">
              <span className="for-pass">Forgot your password ?</span>
            </Link>
          </p>

          <p>
            Account yo‘qmi?{" "}
            <Link to="/register">
              <span>Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;