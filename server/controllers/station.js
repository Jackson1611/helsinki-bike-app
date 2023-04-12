const db = require("../db/dbconfig");

// Controller function to get all stations from database
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

// Controller function to get a station by ID from database
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

// Controller function to add a new station to the database
const createStation = async (req, res) => {
  const newStation = req.body;

  try {
    const {
      id,
      fi_name,
      se_name,
      en_name,
      fi_address,
      se_address,
      fi_city,
      se_city,
      operator_name,
      capacity,
      longitude,
      latitude,
    } = newStation;

    const stationQueryString = `
      INSERT INTO station (
        id,
        fi_name,
        se_name,
        en_name,
        fi_address,
        se_address,
        fi_city,
        se_city,
        operator_name,
        capacity,
        longitude,
        latitude
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
    `;
    const stationResult = await db.query(stationQueryString, [
      id,
      fi_name,
      se_name,
      en_name,
      fi_address,
      se_address,
      fi_city,
      se_city,
      operator_name,
      capacity,
      longitude,
      latitude,
    ]);

    const station = stationResult.rows[0];

    res.status(201).json({
      success: true,
      message: "Station added successfully",
      station,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { getAllStations, getStationById, createStation };
