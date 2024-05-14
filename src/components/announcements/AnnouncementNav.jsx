"use client"

import { useStore } from "@/stores/store";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";


const AnnouncementNav = () => {
  const router= useRouter();
  const userAuthenticated= useStore((state)=>state.userAuthenticated)

  const toggleCreateAnnouncement = useStore((state) => state.toggleCreateAnnouncement);
  const setToggleCreateAnnouncement = useStore((state) => state.setToggleCreateAnnouncement); 
  const handleClick = ()=>{
    if(!userAuthenticated){
      toast('Hey you !! login first!', {
        icon: '🫵',
      });
      return router.push("/auth/login")
    }
    setToggleCreateAnnouncement(!toggleCreateAnnouncement);

  }
  return (
    <nav className=" mt-5">
      <div className="flex gap-4 flex-col-reverse p-4 pb-0 md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl tracking-wider">Group's Announcements</h1>
        <div className="flex justify-end items-center gap-4">
          <button onClick={handleClick} className="px-4 text-xs md:text-sm py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900">Create New</button>
          <Link href={"/groups"} className="px-4 text-xs md:text-sm py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900" >Join Group</Link>
        </div>
      </div>
    </nav>
  );
};

export default AnnouncementNav;
