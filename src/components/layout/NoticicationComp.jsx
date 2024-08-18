import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import Notifications from "./Notifications";

import { useStore } from "@/stores/store";
import { GetAccessToken } from "@/index";
import {
  connectToWebSocket,
  disconnectWebSocket,
} from "@/Service/notificationsService";

const NotificationComp = () => {
  const [toggleNotification, setToggleNotification] = useState(false);
  const notificationCount = useStore((state) => state.notificationCount);
  const setNotificationCount = useStore((state) => state.setNotificationCount);
  const [notifications, setNotifications] = useState([]);
  const userData = useStore((state) => state.userData);
  useEffect(() => {
    const userId = userData?.id;
    console.log(userId);
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
        setNotificationCount(data.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    if (userId) {
     const socket= connectToWebSocket(userId, (notification) => {
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
        setNotificationCount((count) => count + 1);
        console.log("object");
      });
      return () => {
        disconnectWebSocket(socket);
      };
    }
  }, [userData, setNotificationCount]);

 

  return (
    <div className="relative">
      <div
        className="relative cursor-pointer"
        onClick={() => setToggleNotification(!toggleNotification)}
      >
        <span className="sm:hidden">
          <Bell size={12} />
        </span>
        <span className="hidden sm:flex">
          <Bell size={16} />
        </span>
        <span className="absolute -top-2 -right-2 text-[#FD0303] w-4 h-4 p-2 flex justify-center items-center rounded-full text-sm">
          {notificationCount}
        </span>
      </div>

      {toggleNotification && (
        <div className="absolute top-12 -right-6 shadow-md shadow-gray-800 dark:shadow-sm dark:shadow-slate-500 bg-white p-4 rounded-md dark:bg-gray-800 dark:text-white text-black w-[276px] md:w-[340px]">
          <Notifications notifications={notifications} />
        </div>
      )}
    </div>
  );
};

export default NotificationComp;
