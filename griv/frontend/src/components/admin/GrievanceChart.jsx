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

// Register required elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GrievanceChart = ({ grievances }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Process grievances data to calculate counts of resolved and pending grievances
    const resolvedCount = grievances.filter(
      (grievance) => grievance.status === "resolved"
    ).length;
    const pendingCount = grievances.filter(
      (grievance) => grievance.status === "pending"
    ).length;
    const totalGrievances = grievances.length;

    // Set the data for the chart
    setChartData({
      labels: ["Resolved", "Pending"], // X-axis labels
      datasets: [
        {
          label: "Grievances", // Legend label
          data: [resolvedCount, pendingCount], // Corresponding Y-axis data
          backgroundColor: ["#4caf50", "#ff9800"], // Colors for the bars
          borderColor: ["#388e3c", "#f57c00"], // Border colors
          borderWidth: 1,
          barThickness: 30, // Adjust the bar width
        },
      ],
      totalGrievances,
    });
  }, [grievances]);

  return (
    <div>
      {chartData ? (
        <>
          <h4 className="text-center mb-4">
            Total Grievances: {chartData.totalGrievances}
          </h4>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Grievance Overview", // Chart title
                },
                legend: {
                  display: true,
                  position: "top", // Position of legend
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Grievance Status", // X-axis label
                  },
                },
                y: {
                  type: "linear", // Use linear scale for Y-axis
                  title: {
                    display: true,
                    text: "Number of Grievances", // Y-axis label
                  },
                  beginAtZero: true, // Ensure Y-axis starts at zero
                },
              },
            }}
          />
        </>
      ) : (
        <div>Loading chart...</div>
      )}
    </div>
  );
};

export default GrievanceChart;
