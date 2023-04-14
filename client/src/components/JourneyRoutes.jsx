import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const JourneyMap = ({ journey, onClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const departureLatLng = [
    journey?.departure_station_latitude,
    journey?.departure_station_longitude,
  ];
  const returnLatLng = [
    journey?.return_station_latitude,
    journey?.return_station_longitude,
  ];

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      onClose={handleClose}
      style={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <DialogTitle>
        {journey?.departure_station_name || "Loading..."} to{" "}
        {journey?.return_station_name || "Loading..."}
      </DialogTitle>

      <DialogContent>
        <MapContainer
          center={departureLatLng}
          zoom={14}
          style={{
            height: "800px",
            width: "900px",
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline
            positions={[departureLatLng, returnLatLng]}
            color="blue"
            weight={3}
            dashArray="10"
          />
          <Marker
            position={departureLatLng}
            title={journey.departure_station_name}
          />
          <Marker position={returnLatLng} title={journey.return_station_name} />
        </MapContainer>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
