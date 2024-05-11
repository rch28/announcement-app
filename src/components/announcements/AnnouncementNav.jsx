"use client"

import { useStore } from "@/stores/store";
import Link from "next/link";


const AnnouncementNav = () => {
  const toggleCreateAnnouncement = useStore((state) => state.toggleCreateAnnouncement);
  const setToggleCreateAnnouncement = useStore((state) => state.setToggleCreateAnnouncement); 
  return (
    <nav className=" mt-5">
      <div className="grid grid-cols-2 p-4">
        <div className="flex  gap-4 justify-between">
          <h1 className="text-xl tracking-tighter">Announcement</h1>
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-gray-200 rounded-lg px-2 py-1 outline-none"
          />
        </div>
        <div className="flex justify-end items-center gap-4">
          <button onClick={()=>setToggleCreateAnnouncement(!toggleCreateAnnouncement)} className="px-4 text-xs md:text-sm py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900">Create New</button>
          <Link href={"/groups"} className="px-4 text-xs md:text-sm py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900" >Join Group</Link>
        </div>
      </div>
    </nav>
  );
};

export default AnnouncementNav;
