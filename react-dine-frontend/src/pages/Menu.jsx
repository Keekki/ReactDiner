import React, { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import "../styling/Menu.css";

const Menu = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/dishes")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="menu">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Menu;
