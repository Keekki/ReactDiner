import React from "react";
import { Link } from "react-router-dom";
import "../styling/HomePage.css";

const HomePage = () => {
  return (
    <div className="home">
      <h1>Welcome to Our Restaurant!</h1>
      <p>Enjoy our delicious dishes and amazing service.</p>
      <Link to="/menu" className="menu-button">
        Check Menu
      </Link>
    </div>
  );
};

export default HomePage;
