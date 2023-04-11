import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function SingleStation({ station, onClose }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      onClose={handleClose}
      style={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <Typography>
        <DialogTitle>{station?.fi_name || "Loading..."}</DialogTitle>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <DialogContent>
              <div>
                <strong>ID:</strong> {station?.id || "Loading..."}
              </div>
              <div>
                <strong>Finnish Name:</strong>{" "}
                {station?.fi_name || "Loading..."}
              </div>
              <div>
                <strong>Swedish Name:</strong>{" "}
                {station?.se_name || "Loading..."}
              </div>
              <div>
                <strong>English Name:</strong>{" "}
                {station?.en_name || "Loading..."}
              </div>
              <div>
                <strong>Finnish Address:</strong>{" "}
                {station?.fi_address || "Loading..."}
              </div>
              <div>
                <strong>Swedish Address:</strong>{" "}
                {station?.se_address || "Loading..."}
              </div>
              <div>
                <strong>Finnish City:</strong>{" "}
                {station?.fi_city || "Loading..."}
              </div>
              <div>
                <strong>Swedish City:</strong>{" "}
                {station?.se_city || "Loading..."}
              </div>
              <div>
                <strong>Operator:</strong>{" "}
                {station?.operator_name || "Loading..."}
              </div>
              <div>
                <strong>Capacity:</strong> {station?.capacity || "Loading..."}
              </div>
            </DialogContent>
          </div>
          <div>
            <MapContainer
              center={[station?.latitude, station?.longitude]}
              zoom={13}
              style={{
                height: "800px",
                width: "900px",
                margin: "0 auto",
                marginRight: "35px",
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              />
              <Marker position={[station?.latitude, station?.longitude]}>
                <Popup>{station?.fi_name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
        <DialogActions>
          <Button
            style={{
              marginRight: "35px",
            }}
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Typography>
    </Dialog>
  );
}
