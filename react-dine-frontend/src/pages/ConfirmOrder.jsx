import React from "react";

const ConfirmOrder = () => {
  const orderData = JSON.parse(localStorage.getItem("order"));
  const order = orderData ? orderData.order : null;

  if (!order) {
    return <div>Redirecting to order form...</div>;
  }

  const handleConfirmOrder = () => {
    // Handle the order confirmation
  };

  return (
    <div>
      <h1>Confirm Your Order</h1>
      <p>Name: {order.customer.name}</p>
      <p>Email: {order.customer.email}</p>
      <p>Street: {order.customer.street}</p>
      <p>Postal Code: {order.customer["postal-code"]}</p>
      <p>City: {order.customer.city}</p>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            {item.id}: {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
};

export default ConfirmOrder;
