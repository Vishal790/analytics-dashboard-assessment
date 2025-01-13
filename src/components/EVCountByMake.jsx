import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Papa from "papaparse";

function EVCountByMake() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV data
    Papa.parse("/ev_data.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  }, []);

  const makeCounts = data.reduce((acc, row) => {
    acc[row.Make] = (acc[row.Make] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(makeCounts),
    datasets: [
      {
        label: "EV Count by Make",
        data: Object.values(makeCounts),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="text-xl font-semibold mb-4 text-red-500">
        EV Count by Make
      </h2>
      <Bar data={chartData} />
    </div>
  );
}

export default EVCountByMake;
