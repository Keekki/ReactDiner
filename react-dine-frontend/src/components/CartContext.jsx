import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children, items }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (item) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [item.id]: (prevItems[item.id] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const { [itemId]: _, ...rest } = prevItems;
      return rest;
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, items }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
