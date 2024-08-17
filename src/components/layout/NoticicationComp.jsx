import { Bell } from "lucide-react";
import React, { useState } from "react";
import Notifications from "./Notifications";

const NoticicationComp = () => {
  const [toggleNotification, setToggleNotification] = useState(false);
  return (
    <div className="relative">
      <div className="relative cursor-pointer " onClick={()=>setToggleNotification(!toggleNotification)}> 
        <span className="sm:hidden">
          <Bell size={12} />
        </span>
        <span className="hidden sm:flex">
          <Bell size={16} />
        </span>
        <span className="absolute -top-2 -right-2 text-[#FD0303] w-4 h-4 p-2 flex justify-center items-center rounded-full  text-sm">
          9
        </span>
      </div>

      {toggleNotification && 
      <div  className="absolute top-12 -right-6 shadow-md shadow-gray-800 dark:shadow-sm dark:shadow-slate-500 bg-white p-4 rounded-md dark:bg-gray-800 dark:text-white   text-black w-[276px] md:w-[340px]">
        <Notifications />
        </div>}
    </div>
  );
};

export default NoticicationComp;
