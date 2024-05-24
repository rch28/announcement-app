"use client";

import { useStore } from "@/stores/store";
import { ChevronsRight, Cog, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SettingCard from "./SettingCard";

const GroupNav = () => {
  const [uId, setuId] = useState("");
  const [aId, setAId] = useState("");
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const userData = useStore((state) => state.userData);
  const groupAdmin = useStore((state) => state.groupAdmin);
  const isGrupAdmin = useStore((state) => state.isGrupAdmin);
  const setIsGroupAdmin = useStore((state) => state.setIsGroupAdmin);
  const [toggleSetting, setToggleSetting] = useState(false)
  const userAuthenticated= useStore(state=>state.userAuthenticated)
  const joined = useStore(state=>state.Joined)
  const toggleCreateAnnouncement = useStore(
    (state) => state.toggleCreateAnnouncement
  );
  const setToggleCreateAnnouncement = useStore(
    (state) => state.setToggleCreateAnnouncement
  );
  useEffect(() => {
    if (userData) {
      setuId(userData.id);
    }
  }, [userData]);
  useEffect(() => {
    if (groupAdmin) {
      setAId(groupAdmin.id);
    }
  }, [groupAdmin]);
  useEffect(() => {
    if (uId && aId) {
      if (uId === aId) {
        setIsGroupAdmin(true);
      } else {
        setIsGroupAdmin(false);
      }
    }
  }, [uId, aId]);
  return (
    <>
      <nav className="flex flex-row md:gap-4 justify-between ">
        <h1 className="tmd:ext-xl font-semibold flex items-center md:gap-3">
          Category <ChevronsRight size={16} />{" "}
          <span className="capitalize text-gray-700 dark:text-white/70 text:xs md:text-lg"> {category} </span>
        </h1>

        {isGrupAdmin &&userAuthenticated && (
          <div className="flex gap-4 justify-end items-center px-4 text-xs md:text-base relative">
            <div className="flex items-center gap-2 px-4 text-sm py-2 bg-purple-600 rounded-full  text-white font-bold hover:bg-purple-700 cursor-pointer shadow-sm shadow-purple-500" onClick={()=>setToggleSetting(!toggleSetting)} >
              <Cog size={20} />
              <span>Setting</span>
            </div>
            {
              toggleSetting && (
                <div className="absolute z-10 right-0 sm:right-2 md:right-auto  top-10 w-72 md:w-96 bg-white  shadow-lg shadow-gray-500 p-4 rounded-xl">
                 <SettingCard setToggleSetting={setToggleSetting} />
                </div>
              )
            }
          </div>
        )}
        {!isGrupAdmin  &&joined && userAuthenticated && (
          <div className="flex  justify-end items-center px-4 text-xs md:text-base">
            <button
            
              className="px-3 md:px-6 text-sx md:text-sm py-2 bg-purple-600 shadow-sm shadow-purple-500 rounded-full  text-white font-bold hover:bg-purple-700"
              onClick={() =>
                setToggleCreateAnnouncement(!toggleCreateAnnouncement)
              }
            >
              New Announcement
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default GroupNav;
