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
      <nav className="flex justify-between">
        <h1 className="text-xl font-semibold flex items-center gap-3">
          Category <ChevronsRight size={16} />{" "}
          <span className="capitalize text-gray-700 text-lg"> {category} </span>
        </h1>

        {isGrupAdmin && (
          <div className="flex gap-4 items-center px-4">
            <Link
              href={""}
              className="px-6 py-2 bg-purple-600 shadow-sm shadow-purple-500 rounded-full  text-white font-bold hover:bg-purple-700"
            >
              View all announcements
            </Link>
            <div className="flex items-center gap-2 px-6 py-2 bg-purple-600 rounded-full  text-white font-bold hover:bg-purple-700 cursor-pointer shadow-sm shadow-purple-500" onClick={()=>setToggleSetting(!toggleSetting)} >
              {toggleSetting?<X size={20} />:<Cog size={20} />}
              <span>Setting</span>
            </div>
            {
              toggleSetting && (
                <div className="absolute top-56 right-20 bg-white border-2   border-gray-300 shadow-md shadow-purple-400 p-4 rounded-lg w-88">
                 <SettingCard setToggleSetting={setToggleSetting} />
                </div>
              )
            }
          </div>
        )}
      </nav>
    </>
  );
};

export default GroupNav;
