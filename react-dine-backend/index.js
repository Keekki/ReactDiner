const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// server/index.js
const path = require("path");
const express = require("express");

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});
