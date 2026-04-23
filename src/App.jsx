import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./page/home/Home";
import About from "./page/about/About";
import Services from "./page/services/Services";
import Contact from "./page/contact/Contact";
import Shoop_page from "./page/Shoop_page";
import MyGoods from "./page/myGoods/MyGoods";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./page/login/Login";
import ForgotPassword from "./page/forgotPassword/ForgotPassword";
import Register from "./page/register/Register";
import Admin from "./page/admin/Admin";
import EditProduct from "./page/admin/EditProduct";
import NotFound from "./page/notFound/NotFound";
import ProductDetail from "./page/productDetail/ProductDetail";
import Footer from "./components/Footer";

const App = () => {
  const [signet, setSignet] = useState(() => {
    // Check if user is already logged in
    return localStorage.getItem("username") !== null;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    // Check if current user is admin
    return localStorage.getItem("isAdmin") === "true";
  });

  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register", "/foget"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideHeader && (
        <Header 
          signet={signet} 
          setSignet={setSignet} 
          isAdmin={isAdmin} 
          setIsAdmin={setIsAdmin} 
        />
      )}

      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login setSignet={setSignet} setIsAdmin={setIsAdmin} />} />
        <Route path="/register" element={<Register setSignet={setSignet} setIsAdmin={setIsAdmin} />} />
        <Route path="/foget" element={<ForgotPassword />} />

        {/* Admin Panel */}
        <Route
          path="/admin"
          element={isAdmin ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/edit-product"
          element={isAdmin ? <EditProduct /> : <Navigate to="/login" />}
        />

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
        <Route
          path="/product"
          element={signet ? <ProductDetail /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!shouldHideHeader && <Footer />}
    </div>
  );
};

export default App;