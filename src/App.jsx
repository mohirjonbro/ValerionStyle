import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./page/home/Home";
import About from "./page/about/About";
import Services from "./page/services/Services";
import Contact from "./page/contact/Contact";
import Shoop_page from "./page/Shoop_page";
import MyGoods from "./page/myGoods/MyGoods";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./page/login/Login";
import ForgotPassword from "./page/forgotPassword/ForgotPassword";
import Register from "./page/register/Register";

const App = () => {
  const [signet, setSignet] = useState(false);

  return (
    <div>
      <Header />

      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login setSignet={setSignet} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/foget" element={<ForgotPassword />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={signet ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/about"
          element={signet ? <About /> : <Navigate to="/login" />}
        />
        <Route
          path="/services"
          element={signet ? <Services /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={signet ? <Contact /> : <Navigate to="/login" />}
        />
        <Route
          path="/card"
          element={signet ? <Shoop_page /> : <Navigate to="/login" />}
        />
        <Route
          path="/my"
          element={signet ? <MyGoods /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;