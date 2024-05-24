"use client";
import { Cog, Group, NotebookTabs, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="grid gap-2">
      <Link
        href={"/user/profile/dashboard"}
        className={` px-4  py-3 rounded-xl flex gap-2 ${
          pathname === "/user/profile/dashboard" ? " dark:text-black  bg-white shadow-md dark:shadow-gray-600 shadow-gray-500" : "text-gray-900 dark:text-white  hover:shadow-md hover:shadow-gray-400 dark:hover:shadow-none dark:hover:bg-white hover:bg-white/50 hover:dark:text-black  "
        }`}
      >
        <Group size={20} />
        <span className="font-medium text-sm ">Manage Groups</span>
      </Link>
      <Link
        href={"/user/profile/dashboard/manage-members"}
        className={` px-4  py-3 rounded-xl flex gap-2 ${
          pathname === "/user/profile/dashboard/manage-members"
            ? " dark:text-black  bg-white shadow-md dark:shadow-gray-600 shadow-gray-500" : "text-gray-900 dark:text-white  hover:shadow-md hover:shadow-gray-400 dark:hover:shadow-none dark:hover:bg-white hover:bg-white/50 hover:dark:text-black  "
        }`}
      >
        <Users2 size={20} />
        <span className="font-medium text-sm ">Manage Members</span>
      </Link>
      <Link
        href={"/user/profile/dashboard/manage-announcements"}
        className={` px-4  py-3 rounded-xl flex gap-2${
          pathname === "/user/profile/dashboard/manage-announcements"
            ? " dark:text-black  bg-white shadow-md dark:shadow-gray-600 shadow-gray-500" : "text-gray-900 dark:text-white  hover:shadow-md hover:shadow-gray-400 dark:hover:shadow-none dark:hover:bg-white hover:bg-white/50 hover:dark:text-black  "
        }`}
      >
        <NotebookTabs size={20} />
        <span className="font-medium text-sm">Manage Announcements</span>
      </Link>
      <Link
        href={"/user/profile/setting"}
        className={` px-4  py-3 rounded-xl flex gap-2 hover:bg-white/50  hover:shadow-md dark:shadow-none hover:shadow-gray-400  dark:hover:bg-white dark:hover:text-black`}
      >
        <Cog size={20} />
        <span className="font-medium text-sm">Manage Accounts</span>
      </Link>
    </div>
  );
};

export default DashSidebar;
