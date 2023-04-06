import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { format } from "date-fns";

function App() {
  const [journeys, setJourneys] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(17);
  const [orderBy, setOrderBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

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
      field: "return_time",
      headerName: "Return Time",
      width: 200,
      valueFormatter: (params) =>
        format(new Date(params.value), " HH:mm yyyy-MM-dd "),
    },
    { field: "return_station_name", headerName: "Return Station", width: 200 },
    { field: "duration", headerName: "Duration", width: 150 },
    { field: "covered_distance", headerName: "Covered Distance", width: 200 },
  ];
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          backgroundColor: "#f2f2f2",
          width: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Navigation bar content here */}
        <h1>Helsinki bike app</h1>
      </div>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{}}>
          <h1>Journeys</h1>
        </div>

        <div style={{ width: "80%", height: "1012px" }}>
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
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
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
    </div>
  );
}

export default App;
