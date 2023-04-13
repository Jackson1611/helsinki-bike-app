const express = require("express");
const router = express.Router();
const {
  getAllStations,
  getStationById,
  createStation,
  deleteStation,
} = require("../controllers/station");

router.get("/", getAllStations);
router.get("/:id", getStationById);
router.post("/", createStation);
router.delete("/:id", deleteStation);
module.exports = router;
