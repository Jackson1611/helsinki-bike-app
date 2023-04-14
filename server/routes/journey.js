const express = require("express");
const router = express.Router();
const {
  getAllJourneys,
  getPopularStations,
} = require("../controllers/journey");

router.get("/", getAllJourneys);
router.get("/top_journey", getPopularStations);

module.exports = router;
