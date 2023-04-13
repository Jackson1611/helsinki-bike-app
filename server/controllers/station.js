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

    // Get the current largest id from the database
    const getMaxIdQuery = `SELECT MAX(id) FROM station`;
    const maxIdResult = await db.query(getMaxIdQuery);
    const maxId = maxIdResult.rows[0].max || 0;

    // Get the current largest fid from the database
    const getMaxFidQuery = `SELECT MAX(fid) FROM station`;
    const maxFidResult = await db.query(getMaxFidQuery);
    const maxFid = maxFidResult.rows[0].max || 0;

    // Generate id and fid by incrementing the by 1
    const id = maxId + 1;
    const fid = maxFid + 1;

    const stationQueryString = `
      INSERT INTO station (
        fid,
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *
    `;
    const stationResult = await db.query(stationQueryString, [
      fid,
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

const deleteStation = async (req, res) => {
  const stationId = req.params.id; // Get the id from the request parameters

  try {
    // Check if the station with the given id exists in the database
    const checkStationQuery = `SELECT * FROM station WHERE id = $1`;
    const checkStationResult = await db.query(checkStationQuery, [stationId]);

    if (checkStationResult.rows.length === 0) {
      // If no station found with the given id, return an error response
      return res
        .status(404)
        .json({ success: false, message: "Station not found" });
    }

    // Delete the station with the given id
    const deleteStationQuery = `DELETE FROM station WHERE id = $1 RETURNING *`;
    const deleteStationResult = await db.query(deleteStationQuery, [stationId]);

    const deletedStation = deleteStationResult.rows[0];

    res.status(200).json({
      success: true,
      message: "Station deleted successfully",
      station: deletedStation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllStations,
  getStationById,
  createStation,
  deleteStation,
};
