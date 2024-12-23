import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register necessary Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale);

const GroupImpressionCountry = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const [selectedFilter, setSelectedFilter] = useState("country");
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState(true); // Simulate permission state

  const countryData = {
    labels: ["2024-12-20", "2024-12-21", "2024-12-22"],
    datasets: [
      {
        label: "Country Data",
        data: [30, 45, 60],
        backgroundColor: "rgba(5, 155, 255, 1)",
      },
    ],
  };

  const cityData = {
    labels: ["2024-12-20", "2024-12-21", "2024-12-22"],
    datasets: [
      {
        label: "City Data",
        data: [15, 25, 35],
        backgroundColor: "rgba(5, 155, 255, 1)",
      },
    ],
  };

  const updateChart = (type) => {
    const data = type === "country" ? countryData : cityData;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data = data;
      chartInstanceRef.current.update();
    }
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: countryData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    updateChart(selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="w-[500px] h-fit shadow-custom-all p-10 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-lg">Dynamic Bar Chart</h1>
        <div className="ml-auto">
          <select
            id="filter"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 rounded bg-purple-500 text-white"
          >
            <option value="country" className="bg-white text-black">
              Country
            </option>
            <option value="city" className="bg-white text-black">
              City
            </option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin border-t-4 border-purple-500 border-solid rounded-full w-16 h-16"></div>
        </div>
      ) : !permission ? (
        <div className="flex justify-center items-center h-64">
          <a
            href={`/payment/checkout`}
            className="text-red-500 font-bold"
          >
            Upgrade to Premium
          </a>
        </div>
      ) : (
        <canvas ref={chartRef} className="max-h-96"></canvas>
      )}
    </div>
  );
};

export default GroupImpressionCountry;
