import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { format } from "date-fns";
import { Button, Typography } from "@mui/material";

export const Journey = () => {
  const [journeys, setJourneys] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const pageSize = 17;
  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/journeys?page=${page}&size=${pageSize}&orderby=${orderBy}&sort=${sortDirection}`
        );
        const data = await response.json();
        if (data.success) {
          setJourneys(data.journeys);
          setTotalRows(data.totalRowCount);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJourneys();
  }, [page, pageSize, orderBy, sortDirection]);

  const handleSortModelChange = (params) => {
    if (params.length > 0) {
      setOrderBy(params[0].field);
      setSortDirection(params[0].sort);
    }
  };
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
      <div style={{ height: 1000, width: "100%" }}>
        <DataGrid
          rows={journeys}
          columns={columns}
          pagination
          pageSize={pageSize}
          rowCount={totalRows}
          hideFooterPagination
          onSortModelChange={handleSortModelChange}
          sortModel={[{ field: orderBy, sort: sortDirection }]}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={{ fontSize: 30, padding: 10 }}
        >
          <BsArrowLeft />
        </button>
        <button
          disabled={page * pageSize >= totalRows}
          onClick={() => setPage(page + 1)}
          style={{ fontSize: 30, padding: 10, marginLeft: 10 }}
        >
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
};
