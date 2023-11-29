import React from "react";
import { Link } from "react-router-dom";
import "../styling/Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <div className="logo">Restaurant Logo</div>
      </Link>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
