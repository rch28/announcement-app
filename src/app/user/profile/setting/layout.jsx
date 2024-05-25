"use client"
import ProfileNav from "@/components/profile/ProfileNav";
import { Lock, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const layout = ({ children }) => {
  const pathname= usePathname()
  return (
    <div className="p-4">
      <ProfileNav />
      <div className="flex flex-col md:flex-row gap-8 mt-3">
        <div className="flex-[0.3] ">
          <div className="grid gap-2 ">
            <Link
              href={"/user/profile/setting"}
              className={`px-4  py-3 rounded-xl flex gap-2 ${pathname=== "/user/profile/setting" ? " dark:text-black  bg-white shadow-md dark:shadow-gray-600 shadow-gray-500" : "text-gray-900 dark:text-white  hover:shadow-md hover:shadow-gray-400 dark:hover:shadow-none dark:hover:bg-white hover:bg-white/50 hover:dark:text-black  " }`}
            >
              <User size={18} color="purple" />
              <span className="font-medium text-sm">User profile</span>
            </Link>
            <Link
              href="/user/profile/setting/change-password"
              className={`px-4  py-3 rounded-xl flex gap-2 ${pathname=== "/user/profile/setting/change-password" ? "dark:text-black bg-white shadow-md shadow-gray-500" : "text-gray-900 dark:text-white hover:bg-white/50 hover:shadow-md hover:shadow-gray-400 dark:hover:bg-white hover:dark:text-black dark:hover:shadow-none"}`}
            >
              <Lock size={16} color="purple" />
              <span  className="font-medium text-sm">Change password</span>
            </Link>
            <Link
              href="/user/profile/dashboard"
              className={`px-4  py-3 rounded-xl flex gap-2 hover:bg-white/50 dark:shadow-none hover:shadow-md hover:shadow-gray-400  dark:hover:bg-white dark:hover:text-black`}
            >
              <Lock size={16} color="purple" />
              <span  className="font-medium text-sm">Manage Groups</span>
            </Link>
          </div>
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
