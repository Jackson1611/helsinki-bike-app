import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Journey } from "./components/Journey";
import { Station } from "./components/Station";
import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "./assets/logo.png";

function App() {
  return (
    <BrowserRouter>
      <AppBar
        position="static"
        style={{
          width: 1800,
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <img
                src={logo}
                alt="Helsinki Bike"
                height={35}
                style={{ marginTop: "5px" }}
              />
            </Link>
          </Typography>

          <div style={{ display: "flex" }}>
            <Typography variant="h6" component="div">
              <Link
                to="/journeys"
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginLeft: "16px",
                }}
              >
                Journeys
              </Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link
                to="/stations"
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginLeft: "16px",
                }}
              >
                Stations
              </Link>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Journey />} />
        <Route path="/journeys" element={<Journey />} />
        <Route path="/stations" element={<Station />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
