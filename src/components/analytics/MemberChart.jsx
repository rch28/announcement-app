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

const MemberChart = ({ group_id }) => {
  const [selectedFilter, setSelectedFilter] = useState('this_week');
  const [chartData, setChartData] = useState(null);
  const [permission, setPermission] = useState(true);
  const [loading, setLoading] = useState(true);
  const access_token = Cookies.get("access_token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_BASE_URL}/analytics/group/${group_id}/member/status/?range=${selectedFilter}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (!response.ok) {
          if (response.status === 403) {
            setPermission(false);
          } else {
            console.error("Failed to fetch data");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [access_token, group_id, selectedFilter]);

  const filterData = (data, filter) => {
    const now = new Date();
    return data.filter((item) =>
      isWithinInterval(parseISO(item.date), {
        start: subDays(now, filter === 'this_week' ? 7 : filter === 'this_month' ? 30 : filter === '3_months' ? 90 : Infinity),
        end: now,
      })
    );
  };

  const getFilteredData = () => {
    if (!chartData) return { labels: [], datasets: [] };

    const filteredJoinData = filterData(chartData.join_count, selectedFilter);
    const filteredLeaveData = filterData(chartData.leave_count, selectedFilter);

    const labels = filteredJoinData.map((item) => item.date);
    const joinData = filteredJoinData.map((item) => item.count);
    const leaveData = filteredLeaveData.map((item) => item.count);

    return {
      labels,
      datasets: [
        {
          label: 'Group Join',
          data: joinData,
          fill: false,
          borderColor: 'rgb(5, 155, 255, 1)',
          tension: 0.1,
        },
        {
          label: 'Group Leave',
          data: leaveData,
          fill: false,
          borderColor: 'rgb(243, 64, 57, 1)',
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className='w-[500px] h-fit shadow-custom-all p-10 rounded-xl'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-lg">Members</h1>
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
          <Link href={`/payment/checkout?group_id=${group_id}`} className="text-red-500 font-bold">Upgrade to Premium</Link>
        </div>
      ) : (
        <Line data={getFilteredData()} />
      )}
    </div>
  );
};

export default MemberChart;
