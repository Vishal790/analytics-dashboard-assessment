import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Papa from "papaparse";

function EVCountByYear() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("/ev_data.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  }, []);

  const yearCounts = data.reduce((acc, row) => {
    acc[row["Model Year"]] = (acc[row["Model Year"]] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(yearCounts),
    datasets: [
      {
        label: "EV Count by Model Year",
        data: Object.values(yearCounts),
        backgroundColor: "#FF5722",
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="text-xl font-semibold mb-4 text-red-500">
        EV Count by Model Year
      </h2>
      <Bar data={chartData} />
    </div>
  );
}

export default EVCountByYear;
