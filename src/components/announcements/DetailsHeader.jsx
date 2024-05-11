"use client";
import Cookies from "js-cookie";
import { CalendarDaysIcon, Users2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

const DetailsHeader = ({ date, group_id }) => {
    const [groupInfo, setGroupInfo] = useState({})
  const access_token = Cookies.get("access_token");

  useEffect(() => {
    if (!group_id) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/group/retrieve/${group_id}/
            `,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (!response.ok) {
          console.log("something went wrong");
          return;
        }
        const result = await response.json();
        setGroupInfo(result);
      } catch (error) {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, [group_id]);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-4 rounded-t-lg ">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3 text-xl text-gray-700 dark:text-gray-400">
          <Users2Icon className="h-5 w-5" />
          <span>{groupInfo.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <CalendarDaysIcon className="h-4 w-4" />
          <span className="text-nowrap">{date} </span>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
