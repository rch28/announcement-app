"use client";

import { useEffect, useState } from "react";
import {
  connectToWebSocket,
  disconnectWebSocket,
} from "../../Service/noticifationService";
import { useStore } from "@/stores/store";
import { GetAccessToken } from "@/index";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import moment from "moment";
import Link from "next/link";

const parseDate = (dateString) => {
    // Ensure dateString is a string
    const createdAtStr = dateString.toString();
    const createdAt = moment(createdAtStr, moment.ISO_8601);
  
    if (!createdAt.isValid()) {
      console.error("Invalid date format:", createdAtStr);
      return { day: null, month: null, time: null };
    } else {
      const timeStr = createdAt.format('MMMM Do YYYY, h:mm:ss a')
      return timeStr;
    }
  };
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userData = useStore((state) => state.userData);
  useEffect(() => {
    const userId = userData?.id;
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_BASE_URL}/notification/list/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${GetAccessToken()}`,
            },
          }
        );
        if (!response.ok) throw new Error("Something went wrong!!");

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    if (userId) {
      connectToWebSocket(userId, (notification) => {
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
      });
    }

    return () => {
      disconnectWebSocket();
    };
  }, []);

  console.log(notifications);
  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold">Notifications</h1>
      <ul>
        {notifications?.map((notification) =>{
            const date = parseDate(notification.created_at)

            return(
                <div  key={notification._id} className={`capitalize  p-2 ${!notification.read && "bg-slate-200 dark:bg-gray-700 rounded-md my-1 text-sm" }`}>
                  <Link href={`/notifications/${notification._id}`} className="flex items-start justify-between gap-4 font-medium">
                    <h1>{notification.message}</h1>
                    <p >
                    <DotsHorizontalIcon />
      
                    </p>
                  </Link>
                  <p className="font-semibold">
                      {date}
                  </p>
                </div>
              )
        } )}
      </ul>
    </div>
  );
};

export default Notifications;
