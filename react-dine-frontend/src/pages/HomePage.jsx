import React from "react";
import { Link } from "react-router-dom";
import "../styling/HomePage.css";

import Carbonara from "../assets/carbonara.png";

const HomePage = () => {
  return (
    <div className="home">
      <div className="container">
        <h1>Welcome to Our Authentic React Restaurant!</h1>
      </div>
      <Link to="/menu" className="menu-button">
        Check Menu
      </Link>
      <img src={Carbonara} alt="Carbonara" className="menu-pic" />
    </div>
  );
};

export default HomePage;
