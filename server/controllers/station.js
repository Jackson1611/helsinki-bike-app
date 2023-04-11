const db = require("../db/dbconfig");

// Controller function to get all journeys from database
const getAllStations = async (req, res) => {
  try {
    const stationsQueryString = "SELECT * FROM station";
    const stationsResult = await db.query(stationsQueryString);
    const stations = stationsResult.rows;

    res.status(200).json({
      success: true,
      stations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getStationById = async (req, res) => {
  const stationId = req.params.id;

  try {
    const stationQueryString = "SELECT * FROM station WHERE id = $1";
    const stationResult = await db.query(stationQueryString, [stationId]);

    if (stationResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Station not found" });
    }

    const station = stationResult.rows[0];

    res.status(200).json({
      success: true,
      station,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { getAllStations, getStationById };
