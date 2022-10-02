const express = require("express");
const mappingController = require("../controllers/MappingController");

const router = express.Router();

router.get("/:url", mappingController.getMatch);

module.exports = router;
