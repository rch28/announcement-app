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
          <div className="grid gap-1 ">
            <Link
              href={"/user/profile/setting"}
              className={`text-sm font-bold flex items-center justify-start gap-2  px-2 py-1 my-2 ${pathname=== "/user/profile/setting" ? " bg-white/40 border border-purple-300 rounded-md shadow-sm" : "text-gray-900"}`}
            >
              <User size={18} color="purple" />
              <span>User profile</span>
            </Link>
            <Link
              href="/user/profile/setting/change-password"
              className={`text-sm font-bold flex items-center justify-start px-2 py-1 gap-2 my-2 ${pathname=== "/user/profile/setting/change-password" ? " bg-white/40 border border-purple-300 rounded-md  shadow-sm" : "text-gray-900"}`}
            >
              <Lock size={18} color="purple" />
              <span>Change password</span>
            </Link>
          </div>
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
