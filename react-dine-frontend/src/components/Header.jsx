import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styling/Header.css";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className={`header ${isHomePage ? "homepage" : "other"}`}>
      <Link to="/" className="logo-link">
        <div className="logo">React Dine</div>
      </Link>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
