import React, { useContext } from "react";
import CartContext from "./CartContext";
import "../styling/Cart.css";

const Cart = () => {
  const { cartItems } = useContext(CartContext); // Get the cartItems from the CartContext

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
