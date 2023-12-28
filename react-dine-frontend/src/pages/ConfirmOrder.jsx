import React from "react";
import {
  createTheme,
  ThemeProvider,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, Toaster } from "react-hot-toast";

// Create a mapping from item IDs to item names
const itemNameMap = {
  d1: "Mac & Cheese",
  d2: "Margherita Pizza",
  d3: "Caesar Salad",
  d4: "Spaghetti Carbonara",
  d5: "Veggie Burger",
  d6: "Grilled Chicken Sandwich",
  d7: "Steak Frites",
  d8: "Sushi Roll Platter",
  d9: "Chicken Curry",
  d10: "Vegan Buddha Bowl",
  d11: "Seafood Paella",
  d12: "Pancake Stack",
  d13: "Miso Ramen",
  d14: "Beef Tacos",
  d15: "Chocolate Brownie",
  d16: "Lobster Bisque",
  d17: "Mushroom Risotto",
  d18: "Eggplant Parmesan",
  d19: "Lemon Cheesecake",
  d20: "Falafel Wrap",
};

// Create a dark theme
const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "'Garamond', serif",
  },
});

// Style the order details
const OrderLabel = styled(Typography)({
  fontSize: "1.6rem",
  fontWeight: "bold",
  color: "orange",
});

const OrderValue = styled(Typography)({
  fontSize: "1.5rem",
});

// Style the order item list
const OrderItem = styled("li")({
  color: "#fff",
  fontSize: "1rem",
  margin: "0.5rem 0",
});

const ConfirmOrder = () => {
  const orderData = JSON.parse(localStorage.getItem("order"));
  const order = orderData ? orderData.order : null;

  if (!order) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClick = () => {
    toast.success("Your order has been placed!", {
      style: {
        position: "top-center",
        border: "1px solid orange",
        padding: "16px",
        color: "white",
        background: "black",
      },
      iconTheme: {
        primary: "orange",
        secondary: "black",
      },
      duration: 5000,
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="black" p={4} minHeight="100vh" color="white">
        <Typography variant="h4" gutterBottom>
          Confirm Your Order
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                backgroundColor: "black",
                color: "white",
                border: "1px solid orange",
              }}
            >
              <OrderLabel>Name:</OrderLabel>
              <OrderValue>{order.customer.name}</OrderValue>
              <OrderLabel>Email:</OrderLabel>
              <OrderValue>{order.customer.email}</OrderValue>
              <OrderLabel>Street:</OrderLabel>
              <OrderValue>{order.customer.street}</OrderValue>
              <OrderLabel>Postal Code:</OrderLabel>
              <OrderValue>{order.customer["postal-code"]}</OrderValue>
              <OrderLabel>City:</OrderLabel>
              <OrderValue>{order.customer.city}</OrderValue>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                backgroundColor: "black",
                color: "white",
                border: "1px solid orange",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: "1.6rem", fontWeight: "bold", color: "orange" }}
              >
                Order Items
              </Typography>
              <ul>
                {order.items.map((item) => (
                  <OrderItem
                    key={item.id}
                    sx={{ fontFamily: "Garamond", fontSize: "1.5rem" }}
                  >
                    {itemNameMap[item.id]}: x{item.quantity}
                  </OrderItem>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button
            type="submit"
            variant="outlined"
            onClick={handleClick}
            sx={{
              fontSize: "1.2rem",
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "transparent",
                color: "orange",
                borderColor: "orange",
                transition: "0.3s ease-in",
              },
            }}
          >
            Confirm Order
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ConfirmOrder;
