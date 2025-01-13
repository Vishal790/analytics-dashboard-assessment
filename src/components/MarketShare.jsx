import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import Papa from "papaparse";
import { color } from "chart.js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const MarketShare = () => {
  const [insightData, setInsightData] = useState([]);

  useEffect(() => {
    Papa.parse("/ev_data.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const years = result.data.map((row) => row["Model Year"]);
        const counts = years.reduce((acc, year) => {
          acc[year] = (acc[year] || 0) + 1;
          return acc;
        }, {});
        setInsightData(Object.entries(counts).sort((a, b) => a[0] - b[0]));
      },
    });
  }, []);

  const chartData = {
    labels: insightData.map(([year]) => year),
    datasets: [
      {
        label: "Market Share by Year",
        data: insightData.map(([year, count]) => count),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Model Year",
          font: { size: 14, weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of EVs",
          font: { size: 14, weight: "bold" },
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="chart-container text-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">
        EV Market Share by Year
      </h2>
      <div style={{ height: "400px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MarketShare;
