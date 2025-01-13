import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Papa from "papaparse";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function ElectricRangeDistribution() {
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

  const rangeCounts = data.reduce((acc, row) => {
    const range = row["Electric Range"];
    if (range) {
      const rangeValue = Math.floor(range / 50) * 50;
      acc[rangeValue] = (acc[rangeValue] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(rangeCounts),
    datasets: [
      {
        label: "Electric Range Distribution",
        data: Object.values(rangeCounts),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="text-xl font-semibold mb-4 text-red-500">
        Electric Range Distribution
      </h2>
      <Bar data={chartData} />
    </div>
  );
}

export default ElectricRangeDistribution;
