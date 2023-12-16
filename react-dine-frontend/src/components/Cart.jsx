import React, { useContext, useRef, useEffect } from "react";
import CartContext from "./CartContext";
import "../styling/Cart.css";

const Cart = ({ closeCart }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const cartRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        closeCart();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeCart]);

  const total = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  return (
    <div ref={cartRef} className="cart">
      {cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <button onClick={() => removeFromCart(item.id)}>🗑️</button>
        </div>
      ))}
      <p>Total: ${total.toFixed(2)}</p>
      <button>Order</button>
    </div>
  );
};

export default Cart;
