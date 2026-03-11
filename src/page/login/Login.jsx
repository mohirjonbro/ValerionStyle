import { Link } from "react-router-dom";
import "./Login.css";
import React, { useState } from "react";

const Login = ({ setSignet }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitted = (e) => {
    e.preventDefault();

    const savedName = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (name === savedName && password === savedPassword) {
      setSignet(true);
    } else {
      alert("Parol yoki login noto'g'ri ❌");
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