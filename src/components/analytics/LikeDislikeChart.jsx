'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { subDays, isWithinInterval, parseISO } from 'date-fns';
import Cookies from "js-cookie";
import Link from 'next/link';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

// ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

const LikeDislikeChart = ({ ann_id }) => {

  const [selectedFilter, setSelectedFilter] = useState('this_week');
  const [data,setData] = useState([]);
  const [groupId,setGroupId] = useState(null);
  const [permission, setPermission] = useState(true);
  const [loading, setLoading] = useState(true);
  const access_token = Cookies.get("access_token");

  useEffect(()=>{
    const fetchData = (async ()=>{
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/analytics/announcement/${ann_id}/like-dislike/?range=${selectedFilter}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      )

      const responseData = await response.json()
      if (!response.ok){
        if (response.status === 403) {
          setPermission(false)
          setGroupId(responseData.group_id)
        } else {
          console.log("Failed to fetch data");
        }
        setLoading(false);
        return;
      } else {
        setData(responseData)
      }
    });
    fetchData();
    setLoading(false);
  },[access_token,ann_id,selectedFilter]);

  const filterData = (data, filter) => {
    if (!data) return [];  // Ensure data is defined
    const now = new Date();
    return data.filter((item) =>
        item?.date && isWithinInterval(parseISO(item.date), {
            start: subDays(now, filter === 'this_week' ? 7 : filter === 'this_month' ? 30 : filter === '3_months' ? 90 : Infinity),
            end: now,
        })
    );
  };

  const getFilteredData = () => {
    if (!data.likes || !data.dislikes) {
        return { labels: [], datasets: [] };  // Return empty data if not available
    }

    const filteredLikes = filterData(data.likes, selectedFilter);
    const filteredDislikes = filterData(data.dislikes, selectedFilter);

    const labels = filteredLikes.map(item => item.date);
    const likeData = filteredLikes.map(item => item.count);
    const dislikeData = filteredDislikes.map(item => item.count);

    return {
        labels,
        datasets: [
            {
                label: 'Likes',
                data: likeData,
                fill: false,
                borderColor: 'rgb(5, 155, 255, 1)',
                tension: 0.1,
            },
            {
                label: 'Dislikes',
                data: dislikeData,
                fill: false,
                borderColor: 'rgb(243, 64, 57, 1)',
                tension: 0.1,
            },
        ],
    };
  };

  return (
    <div className="w-[500px] h-fit shadow-custom-all p-10 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-lg">Like/Dislike Trend</h1>
        <div className="ml-auto">
          <select
            id="filter"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 rounded bg-purple-500 text-white"
          >
            <option value="this_week" className="bg-white text-black">This Week</option>
            <option value="this_month" className="bg-white text-black">This Month</option>
            <option value="3_months" className="bg-white text-black">3 Months</option>
            <option value="all_time" className="bg-white text-black">All Time</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin border-t-4 border-purple-500 border-solid rounded-full w-16 h-16"></div>
        </div>
      ) : !permission ? (
        <div className="flex justify-center items-center h-64">
          <Link href={`/payment/checkout?group_id=${groupId}`} className="text-red-500 font-bold">Upgrade to Premium</Link>
        </div>
      ) : (
        <Line data={getFilteredData()} />
      )}
    </div>
  );
}

export default LikeDislikeChart;
