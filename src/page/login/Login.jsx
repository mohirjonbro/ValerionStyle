import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import React, { useState } from "react";

const Login = ({ setSignet, setIsAdmin }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitted = (e) => {
    e.preventDefault();

    // Check if admin credentials
    const ADMIN_USERNAME = "sardor";
    const ADMIN_PASSWORD = "1234";

    if (name === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Admin login
      setIsAdmin(true);
      setSignet(true);
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("username", name);
      localStorage.setItem("password", password);
      alert("Welcome Admin Sardor! ✅");
      
      // Redirect admin to admin panel immediately
      navigate("/admin");
    } else {
      // Regular user login
      const savedName = localStorage.getItem("username");
      const savedPassword = localStorage.getItem("password");

      if (name === savedName && password === savedPassword) {
        setIsAdmin(false);
        setSignet(true);
        localStorage.setItem("isAdmin", "false");
        alert("Xush kelibsiz! ✅");
        
        // Redirect regular user to home page
        navigate("/");
      } else {
        // Check if user exists in registered users
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        const foundUser = registeredUsers.find(u => u.username === name && u.password === password);
        
        if (foundUser) {
          setIsAdmin(false);
          setSignet(true);
          localStorage.setItem("isAdmin", "false");
          alert("Xush kelibsiz! ✅");
          
          // Redirect regular user to home page
          navigate("/");
        } else {
          alert("Parol yoki login noto'g'ri ❌");
          return;
        }
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