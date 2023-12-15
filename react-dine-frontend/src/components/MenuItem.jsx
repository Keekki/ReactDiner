import React, { useContext } from "react";
import CartContext from "./CartContext.jsx";
import "../styling/MenuItem.css";

const MenuItem = ({ item }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="menu-item">
      <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
      <h2>{item.name}</h2>
      <p className="item-description">{item.description}</p>
      <p className="item-price">${item.price}</p>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  );
};

export default MenuItem;
