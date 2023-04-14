import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { format } from "date-fns";
import { Button } from "@mui/material";
import { JourneyMap } from "./JourneyRoutes";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export const Journey = () => {
  const [journeys, setJourneys] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState(null);

  const pageSize = 200;

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/journeys?page=${page}&size=${pageSize}&orderby=${orderBy}&sort=${sortDirection}`
        );
        const data = await response.json();
        if (data.success) {
          console.log(data);
          setJourneys(data.journeys);
          setTotalRows(data.totalRowCount);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJourneys();
  }, [page, pageSize, orderBy, sortDirection]);

  useEffect(() => {
    if (!openDialog) {
      setSelectedJourney(null);
    }
  }, [openDialog]);

  const handleSortModelChange = (params) => {
    if (params.length > 0) {
      setOrderBy(params[0].field);
      setSortDirection(params[0].sort);
    }
  };

  const handleViewJourney = (id) => {
    const journey = journeys.find((journey) => journey.id === id);
    setSelectedJourney(journey);
    setOpenDialog(true);
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
    {
      field: "departure_time",
      headerName: "Departure Time",
      width: 200,
      valueFormatter: (params) =>
        format(new Date(params.value), " HH:mm yyyy-MM-dd "),
    },

    {
      field: "departure_station_name",
      headerName: "Departure Station",
      width: 200,
    },
    {
      field: "departure_station_id",
      headerName: "Departure Station ID",
      width: 200,
    },
    {
      field: "return_time",
      headerName: "Return Time",
      width: 200,
      valueFormatter: (params) =>
        format(new Date(params.value), " HH:mm yyyy-MM-dd "),
    },
    { field: "return_station_name", headerName: "Return Station", width: 200 },
    {
      field: "return_station_id",
      headerName: "Return Station ID",
      width: 200,
    },
    {
      field: "duration",
      headerName: "Duration (minutes)",
      width: 150,
      valueFormatter: (params) => (params.value / 60).toFixed(2),
    },
    {
      field: "covered_distance",
      headerName: "Covered Distance (km)",
      width: 200,
      valueFormatter: (params) => (params.value / 1000).toFixed(2),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Button variant="contained" onClick={() => handleViewJourney(id)}>
            View map
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
      <div style={{ height: 1100, width: "100%" }}>
        <DataGrid
          slots={{
            toolbar: () => (
              <React.Fragment>
                <QuickSearchToolbar />
              </React.Fragment>
            ),
          }}
          disableNextPage={true}
          rows={journeys}
          columns={columns}
          pagination
          pageSize={pageSize}
          rowCount={totalRows}
          onSortModelChange={handleSortModelChange}
          sortModel={[{ field: orderBy, sort: sortDirection }]}
        />

        {selectedJourney && (
          <JourneyMap
            journey={selectedJourney}
            open={openDialog}
            onClose={() => setOpenDialog(false)}
          />
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={{ fontSize: 30, padding: 10 }}
        >
          <FaArrowLeft />
        </Button>
        <Button
          disabled={page * pageSize >= totalRows}
          onClick={() => setPage(page + 1)}
          style={{ fontSize: 30, padding: 10, marginLeft: 10 }}
        >
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
};
