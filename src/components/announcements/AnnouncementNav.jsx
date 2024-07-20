"use client"

import Link from "next/link";


const AnnouncementNav = () => {
  return (
    <nav className=" mt-5">
      <div className="flex gap-4 flex-col-reverse p-4 pb-0 md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl tracking-wider">Group's Announcements</h1>
        <div className="flex justify-end items-center gap-4">
          <Link href={`/announcements/create-new/?select_group=${true}`} className="px-4 text-xs md:text-sm py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900">Create New</Link>
          <Link href={"/groups"} className="px-4 text-xs md:text-sm py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900" >Join Group</Link>
        </div>
      </div>
    </nav>
  );
};

export default AnnouncementNav;
