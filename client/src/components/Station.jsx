import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SingleStation } from "./SingleStaion";

export function Station() {
  const [stations, setStations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedStation, setSelectedStation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/stations")
      .then((response) => response.json())
      .then((data) => {
        setStations(data.stations);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!openDialog) {
      setSelectedStation(null);
    }
  }, [openDialog]);

  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
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

  const handleViewStation = (id) => {
    const station = stations.find((station) => station.id === id);
    setSelectedStation(station);
    setOpenDialog(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "fi_name", headerName: "Finnish Name", width: 200 },
    { field: "se_name", headerName: "Swedish Name", width: 200 },
    { field: "en_name", headerName: "English Name", width: 200 },
    { field: "fi_address", headerName: "Finnish Address", width: 200 },
    { field: "se_address", headerName: "Swedish Address", width: 200 },
    { field: "fi_city", headerName: "Finnish City", width: 150 },
    { field: "se_city", headerName: "Swedish City", width: 150 },
    { field: "capacity", headerName: "Capacity", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Button variant="contained" onClick={() => handleViewStation(id)}>
            View station
          </Button>
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
      <Typography variant="h3">Stations</Typography>

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
