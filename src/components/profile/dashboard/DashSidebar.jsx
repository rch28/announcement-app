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
        className={` px-4  py-3 rounded-xl flex gap-2 hover:bg-white/50 ${
          pathname === "/user/profile/dashboard" ? "bg-white shadow-xl" : ""
        }`}
      >
        <Group size={20} />
        <span className="font-medium text-sm ">Manage Groups</span>
      </Link>
      <Link
        href={"/user/profile/dashboard/manage-members"}
        className={` px-4  py-3 rounded-xl flex gap-2 hover:bg-white/50 ${
          pathname === "/user/profile/dashboard/manage-members"
            ? "bg-white shadow-xl"
            : ""
        }`}
      >
        <Users2 size={20} />
        <span className="font-medium text-sm ">Manage Members</span>
      </Link>
      <Link
        href={"/user/profile/dashboard/manage-announcements"}
        className={` px-4  py-3 rounded-xl flex gap-2 hover:bg-white/50 ${
          pathname === "/user/profile/dashboard/manage-announcements"
            ? "bg-white shadow-xl"
            : ""
        }`}
      >
        <NotebookTabs size={20} />
        <span className="font-medium text-sm">Manage Announcements</span>
      </Link>
      <Link
        href={"/user/profile/setting"}
        className={` px-4  py-3 rounded-xl flex gap-2 hover:bg-white/50 `}
      >
        <Cog size={20} />
        <span className="font-medium text-sm">Manage Accounts</span>
      </Link>
    </div>
  );
};

export default DashSidebar;
