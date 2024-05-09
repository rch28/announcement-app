"use client"
import { usePathname } from "next/navigation";
import React from "react";

const ProfileNav = () => {
  const pathname= usePathname()
  return (
    <div className="w-full flex justify-center items-center sm:w-96 mx-auto p-2 my-4">
      <nav className="">
        <ul className="flex gap-1 items-center  text-xs sm:text-base sm:gap-2">
          <li className={`${pathname==="/user/profile" ?"bg-purple-600 text-white" :"hover:bg-slate-300" }  py-2 px-4 rounded-full cursor-pointer`}>
            <a href="/user/profile">Profile</a>
          </li>

        {/* for admin only */}

          <li className={` ${pathname==="/user/group" ?"bg-purple-600 hover:bg-purple-700 text-white":"hover:bg-slate-300" }  border border-gray-300  cursor-pointer py-2 px-4 rounded-full text-nowrap`}>
            <a href="/user/group">My Groups</a>
          </li>
          <li className={` border border-gray-300 hover:bg-slate-300 cursor-pointer py-2 px-4 rounded-full`}>
            <a href="#">item1</a>
          </li>
          <li className={`border border-gray-300 hover:bg-slate-300 cursor-pointer py-2 px-4 rounded-full`}>
            <a href="#">item1</a>
          </li>
       
        </ul>
      </nav>
      
    </div>
  );
};

export default ProfileNav;
