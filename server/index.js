const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const journeyRoutes = require("./routes/journey");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3080;

app.use("/journeys", journeyRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
