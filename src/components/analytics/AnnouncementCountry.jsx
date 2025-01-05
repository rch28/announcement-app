import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import Bar chart from react-chartjs-2
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false, // Disable server-side rendering
});

const AnnouncementImpressionCountry = ({ ann_id }) => {
  const access_token = Cookies.get("access_token");
  const [data, setData] = useState([]);
  const [groupId,setGroupId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Country");
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_BASE_URL}/analytics/announcement/${ann_id}/impression/country-city/?type=${selectedFilter}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          }
        );
        const responseData = await response.json()
        if (!response.ok) {
          if (response.status === 403) {
            setPermission(false);
            setGroupId(responseData.group_id)
          } else {
            console.error("Failed to fetch data");
          }
          setLoading(false);
          return;
        }

        setData(responseData); // Set fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [access_token, ann_id, selectedFilter]);

  const capitalizeFirstLetter = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Chart Data
  const barChartData = {
    labels: data.map((item) => capitalizeFirstLetter(item.label)),
    datasets: [
      {
        label: `${selectedFilter}`,
        data: data.map((item) => item.count),
        backgroundColor: "rgba(5, 155, 255, 1)",
      },
    ],
  };

  return (
    <div className="w-[500px] h-fit shadow-custom-all p-10 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-lg capitalize">{selectedFilter} Bar Chart</h1>
        <div className="ml-auto">
          <select
            id="filter"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 rounded bg-purple-500 text-white"
          >
            <option value="Country" className="bg-white text-black">
              Country
            </option>
            <option value="City" className="bg-white text-black">
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
          <Link
            href={`/payment/checkout?group_id=${groupId}`}
            className="text-red-500 font-bold"
          >
            Upgrade to Premium
          </Link>
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 font-bold">No data available</p>
        </div>
      ) : (
        <Bar data={barChartData} options={{ responsive: true }} />
      )}
    </div>
  );
};

export default AnnouncementImpressionCountry;
