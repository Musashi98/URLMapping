// My imports
const URLPair = require("../models/URLPair");
const CustomError = require("../utils/CustomError");
const catchErrors = require("../utils/catchErrors");

// GET handlers

module.exports.getMatch = catchErrors(async (req, res) => {
  console.log("Request made!");

  res.status(200).send("Hello from server!");
});
