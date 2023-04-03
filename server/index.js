const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/dbconfig");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3080;

//
app.get("/", (req, res) => {
  res.send(`<h1>it worked<h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
