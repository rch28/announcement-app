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
  const trigger = useStore((state) => state.trigger);
  const setTrigger = useStore((state) => state.setTrigger);
  const setNotificationCount = useStore((state) => state.setNotificationCount);
  const [notifications, setNotifications] = useState([]);
  const userData = useStore((state) => state.userData);
  const userAuthenticated = useStore((state)=>state.userAuthenticated)
  useEffect(() => {
    const userId = userData?.id;
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_BASE_URL}/notification/list/?limit=10000`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${GetAccessToken()}`,
            },
          }
        );
        if (!response.ok) throw new Error("Something went wrong!!");

        const data = await response.json();
        setNotifications(data.results);
        setNotificationCount(data.results.filter((n) => !n.read).length);        
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    if (userId) {
      const socket = connectToWebSocket(userId, (notification) => {
        setNotifications((prevNotifications) => {
          const updatedNotifications = [notification, ...prevNotifications];
          setNotificationCount(updatedNotifications.filter((n) => !n.read).length);
          return updatedNotifications;
        });
      });
      return () => {
        disconnectWebSocket(socket);
      };
    }
  }, [userData, setNotificationCount,trigger,setTrigger]);

 

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
        {
          userAuthenticated && <span className="absolute -top-3 -right-3  bg-[#FD0303] text-white w-5 h-5 flex justify-center items-center rounded-full text-xs">
          {notificationCount>=0 && notificationCount<10?notificationCount:"9+"}
        </span>
        }
      </div>

      {toggleNotification && userAuthenticated  && (
        <div className="absolute top-12 -right-6 shadow-md shadow-gray-800 dark:shadow-sm dark:shadow-slate-500 bg-white p-4 rounded-md dark:bg-gray-800 dark:text-white text-black w-[276px] md:w-[340px]">
          <Notifications notifications={notifications} />
        </div>
      )}
    </div>
  );
};

export default NotificationComp;
