const express = require("express");
const router = express.Router();
const { getAllJourneys } = require("../controllers/journey");

// Route to get all journeys
router.get("/", getAllJourneys);

module.exports = router;
