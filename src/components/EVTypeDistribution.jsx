import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Papa from "papaparse";

function EVTypeDistribution() {
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

  const typeCounts = data.reduce((acc, row) => {
    acc[row["Electric Vehicle Type"]] =
      (acc[row["Electric Vehicle Type"]] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        data: Object.values(typeCounts),
        backgroundColor: ["#FF5733", "#33FF57", "#5733FF", "#FF33A1"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div
      className="chart-container mx-auto"
      style={{ width: "250px", height: "250px" }}
    >
      <h2 className="text-center text-lg mb-2 text-red-500">
        EV Type Distribution
      </h2>
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default EVTypeDistribution;