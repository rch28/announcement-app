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

const GroupImpression = ({group_id}) => {
  const [selectedFilter, setSelectedFilter] = useState('this_week');
  const [data,setData] = useState([]);
  const [permission, setPermission] = useState(true);
  const [loading, setLoading] = useState(true);
  const access_token = Cookies.get("access_token");
  
  useEffect(()=>{
    const fetchData = (async ()=>{
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/analytics/group/${group_id}/impression/?range=${selectedFilter}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      )
      if (!response.ok){
        if (response.status === 403) {
          setPermission(false)
        } else {
          console.log("Failed to fetch data");
        }
        setLoading(false);
        return;
      } else {
        setData(await response.json())
      }
    });
    fetchData();
    setLoading(false);
  },[access_token,group_id,selectedFilter]);

  const filterData = (filter) => {
    const now = new Date();
    let filteredData;

    switch (filter) {
      case 'this_week':
        filteredData = data.filter((item) =>
          isWithinInterval(parseISO(item.date), {
            start: subDays(now, 7),
            end: now,
          })
        );
        break;

      case 'this_month':
        filteredData = data.filter((item) =>
          isWithinInterval(parseISO(item.date), {
            start: subDays(now, 30),
            end: now,
          })
        );
        break;

      case '3_months':
        filteredData = data.filter((item) =>
          isWithinInterval(parseISO(item.date), {
            start: subDays(now, 90),
            end: now,
          })
        );
        break;

      case 'all_time':
        filteredData = data;
        break;

      default:
        filteredData = [];
    }

    return filteredData;
  };

  const getFilteredData = () => {
    const filteredData = filterData(selectedFilter);

    const labels = filteredData.map((item) => item.date);
    const data = filteredData.map((item) => item.count);

    return {
      labels,
      datasets: [
        {
          label: 'Group Impression',
          data,
          fill: false,
          borderColor: 'rgb(5, 155, 255, 1)',
          tension: 0.1,
        },
      ],
    };
  };

  console.log(data);
  

  return (
    <div className="w-[500px] h-fit shadow-custom-all p-10 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-lg">Group Impression</h1>
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

export default GroupImpression;
