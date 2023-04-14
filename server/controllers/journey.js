const db = require("../db/dbconfig");

// Controller function to get all journeys from database
const getAllJourneys = async (req, res) => {
  try {
    let { size, page, orderby, sort } = req.query;
    size = Number(size) || process.env.DEFAULT_PAGE_SIZE;
    page = Number(page) || process.env.DEFAULT_PAGE_INDEX;
    orderby = orderby || "departure_time";
    sort = sort || "ASC";

    const countQueryString = `SELECT COUNT(*) FROM journey`;
    const journeysQueryString = `SELECT * FROM journey ORDER BY ${orderby} ${sort} LIMIT $1 OFFSET $2 `;

    const countResult = await db.query(countQueryString);
    const totalRowCount = Number(countResult.rows[0].count);

    const offset = (page - 1) * size;
    const queryParams = [size, offset];
    const journeysResult = await db.query(journeysQueryString, queryParams);
    const journeys = journeysResult.rows;

    res.status(200).json({
      success: true,
      orderby,
      message: `Journey data in page ${page} retrieved successfully`,
      totalRowCount,
      currentPage: page,
      size,
      journeys,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getPopularStations = async (req, res) => {
  try {
    // Query for top 5 most popular departure stations
    const popularDepartureStationsQueryString = `
      SELECT departure_station_name, COUNT(*) as count 
      FROM journey_temp 
      GROUP BY departure_station_name 
      ORDER BY count DESC 
      LIMIT 5`;
    const popularDepartureStationsResult = await db.query(
      popularDepartureStationsQueryString
    );
    const popularDepartureStations = popularDepartureStationsResult.rows;

    // Query for top 5 most popular return stations
    const popularReturnStationsQueryString = `
      SELECT return_station_name, COUNT(*) as count 
      FROM journey_temp 
      GROUP BY return_station_name 
      ORDER BY count DESC 
      LIMIT 5`;
    const popularReturnStationsResult = await db.query(
      popularReturnStationsQueryString
    );
    const popularReturnStations = popularReturnStationsResult.rows;

    res.status(200).json({
      success: true,
      message: `Top 5 most popular departure and return stations retrieved successfully`,
      popularDepartureStations,
      popularReturnStations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { getAllJourneys, getPopularStations };
