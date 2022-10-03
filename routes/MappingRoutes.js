const express = require("express");
const mappingController = require("../controllers/MappingController");

const router = express.Router();

// GET routes

router.get("/getShort/", mappingController.getShort);
router.get("/getLong/", mappingController.getLong);

// POST routes

router.get("/generateShort/", mappingController.generateShort);

module.exports = router;
