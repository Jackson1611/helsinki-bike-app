const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/dbconfig");
require("dotenv").config();

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3080;

//
app.get("/journeys", (req, res) => {
  const page = parseInt(req.query.page) || 100;
  const pageSize = parseInt(req.query.pageSize) || 10000;
  const offset = (page - 1) * pageSize;

  const query = {
    text: "SELECT * FROM journey_temp LIMIT $1 OFFSET $2",
    values: [pageSize, offset],
  };

  db.query(query, (err, result) => {
    if (err) console.error(err);
    else res.json(result.rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
