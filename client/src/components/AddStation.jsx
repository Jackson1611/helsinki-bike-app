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
    longitude: 24.93545,
    latitude: 60.16952,
  });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
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
      longitude: 24.93545,
      latitude: 60.16952,
    });
  };

  const handleInputChange = (e) => {
    setNewStation({ ...newStation, [e.target.name]: e.target.value });
  };

  const addStation = () => {
    const validationErrors = validateInputs(newStation);
    if (Object.keys(validationErrors).length === 0) {
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
    } else {
      setErrors(validationErrors);
    }
  };

  // Function to validate input fields
  const validateInputs = (inputs) => {
    const errors = {};
    const requiredFields = [
      "fi_name",
      "se_name",
      "en_name",
      "fi_address",
      "se_address",
      "fi_city",
      "se_city",
      "operator_name",
      "capacity",
    ];

    // Check for required fields
    requiredFields.forEach((field) => {
      if (!inputs[field]) {
        errors[field] = "This field is required";
      }
    });

    // Check for numeric value in capacity field
    if (inputs.capacity && isNaN(inputs.capacity)) {
      errors.capacity = "Please enter a valid number";
    }

    return errors;
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
                error={errors.fi_name}
                helperText={errors.fi_name}
              />
              <TextField
                margin="dense"
                name="se_name"
                value={newStation.se_name}
                label="Name (Swedish)"
                fullWidth
                onChange={handleInputChange}
                error={errors.se_name}
                helperText={errors.se_name}
              />
              <TextField
                margin="dense"
                name="en_name"
                value={newStation.en_name}
                label="Name (English)"
                fullWidth
                onChange={handleInputChange}
                error={errors.en_name}
                helperText={errors.en_name}
              />
              <TextField
                margin="dense"
                name="fi_address"
                value={newStation.fi_address}
                label="Address (Finnish)"
                fullWidth
                onChange={handleInputChange}
                error={errors.fi_address}
                helperText={errors.fi_address}
              />
              <TextField
                margin="dense"
                name="se_address"
                value={newStation.se_address}
                label="Address (Swedish)"
                fullWidth
                onChange={handleInputChange}
                error={errors.se_address}
                helperText={errors.se_address}
              />
              <TextField
                margin="dense"
                name="fi_city"
                value={newStation.fi_city}
                label="City (Finnish)"
                fullWidth
                onChange={handleInputChange}
                error={errors.fi_city}
                helperText={errors.fi_city}
              />
              <TextField
                margin="dense"
                name="se_city"
                value={newStation.se_city}
                label="City (Swedish)"
                fullWidth
                onChange={handleInputChange}
                error={errors.se_city}
                helperText={errors.se_city}
              />
              <TextField
                margin="dense"
                name="operator_name"
                value={newStation.operator_name}
                label="Operator"
                fullWidth
                onChange={handleInputChange}
                error={errors.operator_name}
                helperText={errors.operator_name}
              />
              <TextField
                margin="dense"
                name="capacity"
                value={newStation.capacity}
                label="Capacity"
                fullWidth
                onChange={handleInputChange}
                error={errors.capacity}
                helperText={errors.capacity}
              />
            </div>
            <div style={{ flex: 1, marginLeft: "20px", paddingTop: "8px" }}>
              <MapContainer
                center={[newStation.latitude, newStation.longitude]}
                style={{ height: "700px", width: "100%" }}
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
