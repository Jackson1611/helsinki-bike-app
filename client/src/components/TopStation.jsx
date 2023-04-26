import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export const TopStation = () => {
  const [open, setOpen] = useState(false);
  const [departureStations, setDepartureStations] = useState([]);
  const [returnStations, setReturnStations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/journeys/top_journey"
        );
        const data = await response.json();
        setDepartureStations(data.popularDepartureStations);
        setReturnStations(data.popularReturnStations);
      } catch (error) {
        console.error("Error fetching top stations:", error);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ marginRight: 15, fontSize: "16px" }}
        variant="outlined"
        size="medium"
        onClick={handleClickOpen}
      >
        Top Stations
      </Button>
      <div style={{ display: "flex" }}>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Top Stations</DialogTitle>

          <DialogContent style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: 16 }}>
              <Typography variant="h6">
                Top 5 Most Popular Departure Stations:
              </Typography>
              {departureStations.map((station, index) => (
                <Typography key={index}>
                  {station.departure_station_name}: {station.count} journeys
                </Typography>
              ))}
            </div>
            <div style={{ flex: 1, marginLeft: 16 }}>
              <Typography variant="h6">
                Top 5 Most Popular Return Stations:
              </Typography>
              {returnStations.map((station, index) => (
                <Typography key={index}>
                  {station.return_station_name}: {station.count} journeys
                </Typography>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
