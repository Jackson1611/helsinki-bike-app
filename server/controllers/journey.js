const db = require("../db/dbconfig");

// Controller function to get all journeys from database
const getAllJourneys = async (req, res) => {
  try {
    let { size, page } = req.query;
    size = Number(size) || process.env.DEFAULT_PAGE_SIZE;
    page = Number(page) || process.env.DEFAULT_PAGE_INDEX;

    const countQueryString = `SELECT COUNT(*) FROM journey_temp`;
    const journeysQueryString = `SELECT * FROM journey_temp LIMIT $1 OFFSET $2`;

    const countResult = await db.query(countQueryString);
    const totalRowCount = Number(countResult.rows[0].count);

    const offset = (page - 1) * size;
    const queryParams = [size, offset];
    const journeysResult = await db.query(journeysQueryString, queryParams);
    const journeys = journeysResult.rows;

    res.status(200).json({
      success: true,
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

module.exports = { getAllJourneys };
