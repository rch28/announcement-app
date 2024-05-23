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
              className={`px-4  py-3 rounded-xl flex gap-2 hover:bg-white/50 hover:shadow-md hover:shadow-gray-400${pathname=== "/user/profile/setting" ? "   bg-white shadow-md shadow-gray-500" : "text-gray-900"}`}
            >
              <User size={18} color="purple" />
              <span className="font-medium text-sm">User profile</span>
            </Link>
            <Link
              href="/user/profile/setting/change-password"
              className={`px-4  py-3 rounded-xl flex gap-2 hover:bg-white/50 hover:shadow-md hover:shadow-gray-400 ${pathname=== "/user/profile/setting/change-password" ? " bg-white shadow-md shadow-gray-500" : "text-gray-900"}`}
            >
              <Lock size={16} color="purple" />
              <span  className="font-medium text-sm">Change password</span>
            </Link>
            <Link
              href="/user/profile/dashboard"
              className={`px-4  py-3 rounded-xl flex gap-2 hover:bg-white/50 hover:shadow-md hover:shadow-gray-400 `}
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
