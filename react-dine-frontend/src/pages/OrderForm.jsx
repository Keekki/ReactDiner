import React, { useState, useContext } from "react";
import CartContext from "../components/CartContext";
import "../styling/OrderForm.css";

const OrderForm = () => {
  const { cartItems } = useContext(CartContext);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });

  const handleChange = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const order = {
      order: {
        customer: customer,
        items: Object.keys(cartItems).map((itemId) => ({
          id: itemId,
          quantity: cartItems[itemId],
        })),
      },
    };

    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Order created!") {
          // TODO: Redirect to the order confirmation page
        } else {
          console.error("Failed to create order:", data);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="order-form">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={customer.street}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            value={customer.postalCode}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={customer.city}
            onChange={handleChange}
            required
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default OrderForm;
