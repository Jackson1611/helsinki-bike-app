import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Journey } from "./components/Journey";
import { Station } from "./components/Station";
import { AppBar, Toolbar, Typography } from "@mui/material";

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
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/journeys"
              style={{ color: "white", textDecoration: "none" }}
            >
              Journey
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/stations"
              style={{ color: "white", textDecoration: "none" }}
            >
              Station
            </Link>
          </Typography>
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
