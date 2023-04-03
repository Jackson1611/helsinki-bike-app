import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function App() {
  const [data, setData] = useState([]);
  const pageSize = 50;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/journeys");
      const data = await response.json();
      setData(data);
      console.log(data);
    }

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "departure_time", headerName: "Departure Time", width: 200 },
    { field: "return_time", headerName: "Return Time", width: 200 },
    {
      field: "departure_station_id",
      headerName: "Departure Station ID",
      width: 200,
    },
    {
      field: "departure_station_name",
      headerName: "Departure Station Name",
      width: 300,
    },
    { field: "return_station_id", headerName: "Return Station ID", width: 200 },
    {
      field: "return_station_name",
      headerName: "Return Station Name",
      width: 300,
    },
    { field: "covered_distance", headerName: "Covered Distance", width: 200 },
    { field: "duration", headerName: "Duration", width: 150 },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: 1000,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DataGrid rows={data} columns={columns} pageSize={pageSize} />
    </div>
  );
}

export default App;
