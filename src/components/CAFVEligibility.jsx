import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Papa from "papaparse";

ChartJS.register(ArcElement, Tooltip, Legend);

const CAFVEligibility = () => {
  const [eligibilityData, setEligibilityData] = useState({
    eligible: 0,
    ineligible: 0,
    unknown: 0,
  });

  useEffect(() => {
    Papa.parse("/ev_data.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const eligibilityCount = { eligible: 0, ineligible: 0, unknown: 0 };
        result.data.forEach((row) => {
          const eligibility =
            row["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
          if (eligibility === "Clean Alternative Fuel Vehicle Eligible") {
            eligibilityCount.eligible++;
          } else if (eligibility === "Not eligible due to low battery range") {
            eligibilityCount.ineligible++;
          } else {
            eligibilityCount.unknown++;
          }
        });
        setEligibilityData(eligibilityCount);
      },
    });
  }, []);

  const chartData = {
    labels: ["Eligible", "Ineligible", "Unknown"],
    datasets: [
      {
        data: [
          eligibilityData.eligible,
          eligibilityData.ineligible,
          eligibilityData.unknown,
        ],
        backgroundColor: ["#4CAF50", "#FF5733", "#FFC107"],
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
      <h2 className="text-center text-lg mb-2 ">
        CAFV Eligibility Distribution
      </h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default CAFVEligibility;
