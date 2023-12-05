import React from "react";
import "../styling/MenuItem.css";

const MenuItem = ({ item }) => {
  return (
    <div className="menu-item">
      <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
      <h2>{item.name}</h2>
      <p className="item-description">{item.description}</p>
      <p className="item-price">${item.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default MenuItem;
