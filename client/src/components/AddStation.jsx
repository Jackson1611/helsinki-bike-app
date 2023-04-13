import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

export function AddStation(props) {
  const [open, setOpen] = useState(false);
  const [newStation, setNewStation] = useState({
    fi_name: "",
    se_name: "",
    en_name: "",
    fi_address: "",
    se_address: "",
    fi_city: "",
    se_city: "",
    operator_name: "",
    capacity: "",
    longitude: 24.93545, // Default longitude for Helsinki
    latitude: 60.16952, // Default latitude for Helsinki
  });
  const [success, setSuccess] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setNewStation({ ...newStation, [e.target.name]: e.target.value });
  };

  const addStation = () => {
    props.saveStation(newStation);
    setNewStation({
      fi_name: "",
      se_name: "",
      en_name: "",
      fi_address: "",
      se_address: "",
      fi_city: "",
      se_city: "",
      operator_name: "",
      capacity: "",
      longitude: "",
      latitude: "",
    });
    handleClose();
    setSuccess(true);
  };

  const handleMarkerDragEnd = (e) => {
    setNewStation({
      ...newStation,
      latitude: e.target._latlng.lat,
      longitude: e.target._latlng.lng,
    });
  };

  return (
    <div>
      <Button
        style={{ marginRight: 15, fontSize: "16px" }}
        variant="outlined"
        size="medium"
        onClick={handleClickOpen}
      >
        Add station
      </Button>
      <div style={{ display: "flex" }}>
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
          <DialogTitle>New station</DialogTitle>
          <DialogContent style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <TextField
                autoFocus
                margin="dense"
                name="fi_name"
                value={newStation.fi_name}
                onChange={(event) => handleInputChange(event)}
                label="Finnish name"
                fullWidth
              />
              <TextField
                margin="dense"
                name="se_name"
                value={newStation.se_name}
                onChange={(event) => handleInputChange(event)}
                label="Swedish name"
                fullWidth
              />
              <TextField
                margin="dense"
                name="en_name"
                value={newStation.en_name}
                onChange={(event) => handleInputChange(event)}
                label="English name"
                fullWidth
              />
              <TextField
                margin="dense"
                name="fi_address"
                value={newStation.fi_address}
                onChange={(event) => handleInputChange(event)}
                label="Finish address"
                fullWidth
              />
              <TextField
                margin="dense"
                name="se_address"
                value={newStation.se_address}
                onChange={(event) => handleInputChange(event)}
                label="Swedish address"
                fullWidth
              />
              <TextField
                margin="dense"
                name="fi_city"
                value={newStation.fi_city}
                onChange={(event) => handleInputChange(event)}
                label="Finnish city"
                fullWidth
              />
              <TextField
                margin="dense"
                name="se_city"
                value={newStation.se_city}
                onChange={(event) => handleInputChange(event)}
                label="Swedish city"
                fullWidth
              />
              <TextField
                margin="dense"
                name="operator_name"
                value={newStation.operator_name}
                onChange={(event) => handleInputChange(event)}
                label="Operator name"
                fullWidth
              />
              <TextField
                margin="dense"
                name="capacity"
                value={newStation.capacity}
                onChange={(event) => handleInputChange(event)}
                label="Capacity"
                fullWidth
              />
            </div>
            <div style={{ flex: 1, marginLeft: "20px", paddingTop: "8px" }}>
              <MapContainer
                center={[newStation.latitude, newStation.longitude]}
                style={{ height: "630px", width: "100%" }}
                zoom={14}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[newStation.latitude, newStation.longitude]}
                  draggable
                  eventHandlers={{ dragend: handleMarkerDragEnd }}
                />
              </MapContainer>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={addStation} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
