import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Menu from "./pages/Menu";
import Cart from "./components/Cart";
import AboutUs from "./pages/AboutUs";
import { CartProvider } from "./components/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
