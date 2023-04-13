import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button, Alert } from "@mui/material";
import { SingleStation } from "./SingleStaion";
import { AddStation } from "./AddStation";

export function Station() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://localhost:3001/stations")
      .then((response) => response.json())
      .then((data) => {
        setStations(data.stations);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!openDialog) {
      setSelectedStation(null);
    }
  }, [openDialog]);

  //save new station
  const saveStation = (customer) => {
    fetch("http://localhost:3001/stations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => fetchData())
      .then(setShowSuccessAlert(true))
      .catch((err) => console.error(err));
  };

  const handleViewStation = (id) => {
    const station = stations.find((station) => station.id === id);
    console.log(id);
    setSelectedStation(station);
    setOpenDialog(true);
  };

  //delete station
  const handleDeleteStation = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`http://localhost:3001/stations/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => fetchData())
        .then(setShowDeleteAlert(true))
        .catch((err) => console.error(err));
    } else {
      alert("Nothing deleted.");
    }
  };

  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        <AddStation saveStation={saveStation} />
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput) =>
            searchInput
              .split(",")
              .map((value) => value.trim())
              .filter((value) => value !== "")
          }
        />
      </Box>
    );
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "fi_name", headerName: "Finnish Name", width: 200 },
    { field: "se_name", headerName: "Swedish Name", width: 200 },
    { field: "en_name", headerName: "English Name", width: 200 },
    { field: "fi_address", headerName: "Finnish Address", width: 200 },
    { field: "se_address", headerName: "Swedish Address", width: 200 },
    { field: "fi_city", headerName: "Finnish City", width: 120 },
    { field: "se_city", headerName: "Swedish City", width: 120 },
    { field: "capacity", headerName: "Capacity", width: 90 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <React.Fragment>
            <Button
              variant="contained"
              onClick={() => handleViewStation(id)}
              style={{ marginRight: "8px" }}
            >
              View station
            </Button>
            <Button
              variant="contained"
              onClick={() => handleDeleteStation(id)}
              color="secondary"
            >
              Delete
            </Button>
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <div
      style={{
        height: 1100,
        width: 1800,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {showSuccessAlert && (
        <Alert
          severity="success"
          onClose={() => setShowSuccessAlert(false)}
          sx={{ mt: 2 }}
        >
          Station added successfully!
        </Alert>
      )}
      {showDeleteAlert && (
        <Alert
          severity="error"
          onClose={() => setShowDeleteAlert(false)}
          sx={{ mt: 2 }}
        >
          Station deleted successfully!
        </Alert>
      )}
      <DataGrid
        slots={{
          toolbar: () => (
            <React.Fragment>
              <QuickSearchToolbar />
            </React.Fragment>
          ),
        }}
        rows={stations}
        columns={columns}
      />

      {selectedStation && (
        <SingleStation
          station={selectedStation}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      )}
    </div>
  );
}
