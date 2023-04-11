const express = require("express");
const router = express.Router();
const { getAllStations, getStationById } = require("../controllers/station");

router.get("/", getAllStations);
router.get("/:id", getStationById);

module.exports = router;
