const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "bike_app",
  max: 2,
  password: process.env.PASSWORD,
});

const rowsPerPage = 50;
const pageNumber = 3;

const offset = (pageNumber - 1) * rowsPerPage;

const query = {
  text: "SELECT * FROM journey_temp LIMIT $1 OFFSET $2",
  values: [rowsPerPage, offset],
};
module.exports = {
  query: (text, params) => pool.query(text, params),
};
