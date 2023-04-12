const express = require("express");
const router = express.Router();
const {
  getAllStations,
  getStationById,
  createStation,
} = require("../controllers/station");

router.get("/", getAllStations);
router.get("/:id", getStationById);
router.post("/", createStation);

module.exports = router;
