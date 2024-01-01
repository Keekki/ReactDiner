const fs = require("node:fs/promises");

const { v4: uuidv4 } = require("uuid");

const bodyParser = require("body-parser");
const express = require("express");

const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
  "645518468833-n717gm661pgi1rstp2veuctrnl0cmfte.apps.googleusercontent.com",
  "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",
  "http://127.0.0.1:5173/callback"
);

const nodemailer = require("nodemailer"); // Adding nodemailer to send a confirmation email

const app = express();

app.use(bodyParser.json());
app.use(express.static("./public"));
app.use("/images", express.static("public/images"));
app.use("/assets/videos", express.static("public/videos")); // Serve static files from the videos directory

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api/dishes", async (req, res) => {
  const meals = await fs.readFile("./data/available-dishes.json", "utf8");
  res.json(JSON.parse(meals));
});

app.get("/api/orders", async (req, res) => {
  const meals = await fs.readFile("./data/orders.json", "utf8");
  res.json(JSON.parse(meals));
});

app.post("/api/orders", async (req, res) => {
  const orderData = req.body.order;

  if (
    orderData === undefined ||
    orderData === null ||
    orderData.items === null ||
    orderData.items === []
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"] === undefined ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  const newOrder = {
    ...orderData,
    id: uuidv4(),
  };

  const orders = await fs.readFile("./data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);

  await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));

  let mailOptions = {
    from: "frimonreactdine@gmail.com",
    to: newOrder.customer.email,
    subject: "Order Confirmation",
    text: "Your order has been placed!\n\nALERT! This is a mock message from a throwaway account created\n\nonly to present a functionality in the ReactDine app!!\n\nNOTHING HAS BEEN ORDERED!",
  };

  // Path to the file where the refresh token will be stored
  const REFRESH_TOKEN_PATH = "./refreshToken.txt";

  const getTokensAndSetCredentials = async () => {
    let refreshToken = "";
    try {
      refreshToken = await fs.readFile(REFRESH_TOKEN_PATH, "utf8");
    } catch (err) {
      console.error("Error reading refresh token from file: ", err);
      return;
    }

    oauth2Client.setCredentials({ refresh_token: refreshToken });

    let accessToken;
    try {
      accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            console.error("Error during getAccessToken", err);
            reject("Failed to create access token :(");
          }
          resolve(token);
        });
      });
    } catch (error) {
      console.error("Error getting access token: ", error);
      return;
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "frimonreactdine@gmail.com",
        clientId:
          "645518468833-n717gm661pgi1rstp2veuctrnl0cmfte.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };

  getTokensAndSetCredentials();

  res.status(201).json({ message: "Order created!" });
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.get("/healthCheck", (req, res) => {
  res.status(200).send("all good");
});

module.exports = app;
