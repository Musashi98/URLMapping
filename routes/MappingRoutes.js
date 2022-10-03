const express = require("express");
const mappingController = require("../controllers/MappingController");

const router = express.Router();

// GET routes

router.get("/", mappingController.getMatch);

module.exports = router;
