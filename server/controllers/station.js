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

module.exports = { getAllStations };
