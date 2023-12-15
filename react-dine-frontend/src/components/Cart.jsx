import React, { useContext } from "react";
import CartContext from "./CartContext";
import "../styling/Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext); // Get the cartItems and removeFromCart from the CartContext

  const total = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <button onClick={() => removeFromCart(item.id)}>🗑️</button>
        </div>
      ))}
      <p>Total: $${total.toFixed(2)}</p>
      <button>Order</button>
    </div>
  );
};

export default Cart;
