import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
  GridLogicOperator,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export function Station() {
  const [stations, setStations] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/staitons")
      .then((response) => response.json())
      .then((data) => {
        setStations(data.stations);
        setFilteredStations(data.stations);
      })
      .catch((error) => console.error(error));
  }, []);

  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
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
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "fi_name", headerName: "Finnish Name", width: 200 },
    { field: "se_name", headerName: "Swedish Name", width: 200 },
    { field: "en_name", headerName: "English Name", width: 200 },
    { field: "fi_address", headerName: "Finnish Address", width: 200 },
    { field: "se_address", headerName: "Swedish Address", width: 200 },
    { field: "fi_city", headerName: "Finnish City", width: 150 },
    { field: "se_city", headerName: "Swedish City", width: 150 },
    { field: "operator_name", headerName: "Operator", width: 200 },
    { field: "capacity", headerName: "Capacity", width: 150 },
    { field: "longitude", headerName: "Longitude", width: 150 },
    { field: "latitude", headerName: "Latitude", width: 150 },
  ];

  return (
    <div style={{ height: 1000, width: "100%" }}>
      <h1>Stations</h1>
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
    </div>
  );
}
