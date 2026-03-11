import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    localStorage.setItem("username", name);
    localStorage.setItem("password", password);

    alert("Register muvaffaqiyatli ✅");

    navigate("/"); // asosiy pagega o'tadi (yoki /login qilishingiz mumkin)
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={registerUser}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;