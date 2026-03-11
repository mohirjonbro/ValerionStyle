import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Server xatosi");
      }

      const data = await res.json();
      setMessage(data.message || "Reset link yuborildi ✅");
    } catch (error) {
      console.error(error);
      setMessage("Server bilan bog‘lanishda xatolik ❌");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email kiriting"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>
      </form>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}

      <p style={{ marginTop: "20px" }}>
        Hisobingiz yo‘qmi?{" "}
        <Link to="/register">
          <span className="for-pass">Register</span>
        </Link>
      </p>
    </div>
  );
}

export default ForgotPassword;