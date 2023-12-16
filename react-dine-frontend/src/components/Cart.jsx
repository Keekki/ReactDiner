import React, { useContext, useRef, useEffect } from "react";
import CartContext from "./CartContext";
import "../styling/Cart.css";

const Cart = ({ closeCart }) => {
  const { cartItems, removeFromCart, items } = useContext(CartContext);
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

  const total = Object.keys(cartItems).reduce(
    (total, itemId) =>
      total +
      cartItems[itemId] * items.find((item) => item.id === itemId).price,
    0
  );
  //TODO:: removing an item removes all of the same items, fix it
  return (
    <div ref={cartRef} className="cart">
      <h2>Your Cart</h2>
      {Object.keys(cartItems).map((itemId) => {
        const item = items.find((item) => item.id === itemId);
        const itemTotal = item.price * cartItems[itemId];
        return (
          <div key={itemId}>
            <h3>
              {item.name} x{cartItems[itemId]}
            </h3>
            <p>${itemTotal.toFixed(2)}</p>
            <button onClick={() => removeFromCart(itemId)}>🗑️</button>
          </div>
        );
      })}
      <p>Total: ${total.toFixed(2)}</p>
      <button>Order</button>
    </div>
  );
};

export default Cart;