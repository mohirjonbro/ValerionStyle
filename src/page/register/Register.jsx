import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 loading state
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    setLoading(true); // loading boshlanadi

    setTimeout(() => {
      // Get existing users or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      
      // Create new user object with timestamp
      const newUser = {
        username: name,
        password: password,
        registeredAt: new Date().toISOString()
      };
      
      // Add new user to array
      existingUsers.push(newUser);
      
      // Save back to localStorage
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
      localStorage.setItem("username", name);
      localStorage.setItem("password", password);

      alert("Register muvaffaqiyatli ✅");

      setLoading(false); // loading tugadi
      navigate("/");
    }, 1500); // 1.5 sekund loading
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