import React, { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import "../styling/Menu.css";

const Menu = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://reactdinebackend.onrender.com/api/dishes")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  const mainDishes = [
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "d7",
    "d8",
    "d9",
    "d10",
    "d11",
    "d13",
    "d14",
    "d16",
    "d17",
    "d18",
    "d20",
  ];
  const desserts = ["d12", "d15", "d19"];

  return (
    <div className="menu">
      <h2 className="menu-header">Main dishes</h2>
      {items
        .filter((item) => mainDishes.includes(item.id))
        .map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      <h2 className="menu-header">Desserts</h2>
      {items
        .filter((item) => desserts.includes(item.id))
        .map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
    </div>
  );
};

export default Menu;
