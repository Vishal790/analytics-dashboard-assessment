import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Papa from "papaparse";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EVPriceVsRange = () => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    Papa.parse("/ev_data.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const data = result.data
          .filter((row) => row["Base MSRP"] && row["Electric Range"])
          .map((row) => ({
            range: row["Electric Range"],
            price: row["Base MSRP"],
          }));

        // Grouping data by electric range bins for better visualization
        const rangeBins = [0, 100, 200, 300, 400, 500];
        const priceData = rangeBins.map((binStart, index) => {
          const binEnd = rangeBins[index + 1] || Infinity;
          const filteredData = data.filter(
            (item) => item.range >= binStart && item.range < binEnd
          );

          const avgPrice =
            filteredData.reduce((acc, item) => acc + item.price, 0) /
              filteredData.length || 0;
          return { range: `${binStart}-${binEnd}`, price: avgPrice };
        });

        setBarData(priceData);
      },
    });
  }, []);

  const chartData = {
    labels: barData.map((item) => item.range),
    datasets: [
      {
        label: "Average Price (MSRP)",
        data: barData.map((item) => item.price),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "EV Price vs Electric Range",
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="text-red-500 text-xl font-semibold mb-4">
        EV Price vs Electric Range
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EVPriceVsRange;
