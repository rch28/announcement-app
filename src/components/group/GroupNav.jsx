"use client";

import { useStore } from "@/stores/store";
import { ChevronsRight, Cog } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
              className="px-6 py-2 bg-gray-400 shadow-sm shadow-gray-500 rounded-full  text-white font-bold hover:bg-gray-700"
            >
              View all announcements
            </Link>
            <div className="flex items-center gap-2 px-6 py-2 bg-gray-400 rounded-full  text-white font-bold hover:bg-gray-700 cursor-pointer shadow-sm shadow-gray-500" onClick={()=>setToggleSetting(!toggleSetting)} >
              <Cog size={20} />
              <span>Setting</span>
            </div>
            <div>
              card
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default GroupNav;
