const path = require("path");
const express = require("express");
const volleyball = require("volleyball");
const api = require("./api");

const app = express();
module.exports = app;

if (process.env.NODE_ENV !== "test") {
  app.use(volleyball);
}
app.use(express.json());

app.use("/api", api);
