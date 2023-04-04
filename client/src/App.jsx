import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(1);
  const pageSize = 17;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3001/journeys?page=${page}&size=${pageSize}`
      );
      const data = await response.json();
      setData(data.journeys);
      setTotalRows(data.totalRowCount);
      console.log(data);
    }

    fetchData();
  }, [page]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "departure_time", headerName: "Departure Time", width: 200 },
    { field: "return_time", headerName: "Return Time", width: 200 },
    {
      field: "departure_station_id",
      headerName: "Departure Station ID",
      width: 150,
    },
    {
      field: "departure_station_name",
      headerName: "Departure Station Name",
      width: 200,
    },
    { field: "return_station_id", headerName: "Return Station ID", width: 200 },
    {
      field: "return_station_name",
      headerName: "Return Station Name",
      width: 200,
    },
    { field: "covered_distance", headerName: "Covered Distance", width: 200 },
    { field: "duration", headerName: "Duration", width: 150 },
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ backgroundColor: "#f2f2f2", width: "20%" }}>
        {/* Navigation bar content here */}
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
        <div style={{ width: "80%", height: "1000px" }}>
          <DataGrid
            rows={data}
            pagination
            columns={columns}
            pageSize={pageSize}
            rowCount={totalRows}
            onPageChange={(newPage) => setPage(newPage)}
            hideFooterPagination
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            style={{ fontSize: 16, padding: 10 }}
          >
            Previous Page
          </button>
          <button
            disabled={page * pageSize >= totalRows}
            onClick={() => setPage(page + 1)}
            style={{ fontSize: 16, padding: 10, marginLeft: 10 }}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
