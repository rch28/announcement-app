"use client";
import React, { useState } from "react";
import { profile } from "../../../../public";
import Image from "next/image";
import Link from "next/link";
import { Plus, XIcon } from "lucide-react";
import UserName from "@/components/utils/UserName";
import { useStore } from "@/stores/store";
import EditProfile from "@/components/profile/EditProfile";
import PopUpWrapper from "@/components/PopUpWrapper";
const ProfilePage = () => {
  const [toggle, setToggle] = useState(false);
  const userData = useStore((state) => state.userData);
  return (
    <div className="  min-h-screen flex  z-10">
      <section className="flex-[0.2]  py-4">
        <div className={""}>
          <Link
            href={"/user/profile/setting"}
            className="cursor-pointer   bg-gray-200 text-center text-gray-500 text-sm  rounded-full h-40 w-40 relative"
          >
            <Image
              className="rounded-full h-40 w-40 "
              src={userData?.profilepic ? userData.profilepic : profile}
              width={600}
              height={600}
              alt="profile"
              priority
            />

            <span className=" bg-green-500 text-white flex justify-center items-center w-12 h-12 rounded-full absolute right-1   bottom-1  cursor-pointer">
              <Plus size={24} />
            </span>
          </Link>
          <UserName />
          <div className="flex justify-center items-center w-full my-4 ">
            <button
              className="mx-2 py-2  border border-purple-400 w-full text-gray-800 font-medium  rounded-md bg-white/40 cursor-pointer"
              onClick={() => setToggle(!toggle)}
            >
              Edit profile
            </button>
          </div>
        </div>
      </section>
      {toggle && (
        <PopUpWrapper>
          <div className="p-8 w-[45%] bg-white rounded-xl shadow-xl shadow-gray-500 relative">
            <button
              className="absolute right-2 top-2 text-red-600 hover:bg-red-200 bg-white shadow-md shadow-gray-500 rounded-full p-1 "
              onClick={() => setToggle(!toggle)}
            >
              {" "}
              <XIcon />{" "}
            </button>
            <h1 className="border-b border-gray-400 py-2 w-full text-xl tracking-tighter font-medium text-black/80 my-4">
              Update Your Info
            </h1>
            <EditProfile />
          </div>
        </PopUpWrapper>
      )}
      <section className="p-4  w-full flex-1">content</section>
    
    </div>
  );
};

export default ProfilePage;
