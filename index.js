// Node modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes modules
const mappingRoutes = require("./routes/MappingRoutes");
app.use("/mapping", mappingRoutes);

// Usual error 400
app.use("*", (req, res) => {
  console.log("Error code 400: Requested a non existing route");

  res.status(400).send("Requested a non existing route");
});

// Error responder
app.use((err, req, res, next) => {
  const { message, status } = err;

  console.log("Error code " + status + ": " + message);

  res.status(status).json({ error: message });
});

// Server configuration
const SERVICE_PORT = process.env.SERVICE_PORT || 5000;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

mongoose
  .connect(`${DB_URL}/${DB_NAME}`, { useNewUrlParser: true })
  .then(() => {
    console.log("Connection to the database succesfully established");
    app.listen(SERVICE_PORT, () => {
      console.log(`Server running on port ${SERVICE_PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
