"use client";
import { FetchUserData } from "@/index";
import { UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const AdminInfo = ({ admin_id }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (!admin_id) {
      return;
    }
    const fetchData = async () => {
      const data= await FetchUserData(admin_id)
      setUserData(data);
    };

    fetchData();
  }, [admin_id]);
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 capitalize">
      <UserIcon className="h-4 w-4" />
      <span>{userData?.first_name}</span>
      <span>{userData?.last_name}</span>
    </div>
  );
};

export default AdminInfo;
