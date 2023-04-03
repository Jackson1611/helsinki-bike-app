const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "city-bike",
  password: process.env.PASSWORD,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
