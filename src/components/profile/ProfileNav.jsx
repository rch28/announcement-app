"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UserName from "../utils/UserName";
import { profile } from "../../../public";
import { useStore } from "@/stores/store";

const ProfileNav = () => {
  const userData = useStore((state) => state.userData);
  const pathname = usePathname();
  return (
    <div className="w-full  ">
      <nav className="flex justify-start items-start gap-2">
        {userData?.profilepic && (
          <div className="cursor-pointer   bg-gray-200 text-center text-gray-500 text-sm  rounded-full h-42 w-42">
            <Image
              className="rounded-full w-12 h-12 "
              src={userData.profilepic}
              width={600}
              height={300}
              alt="profile"
              priority
            />
          </div>
        )}
        {!userData?.profilepic && (
          <div className="cursor-pointer   bg-gray-200 text-center text-gray-500 text-sm  rounded-full ">
            <Image
              src={profile}
              height={200}
              width={200}
              priority
              alt="profile picture"
              className="rounded-full  w-12 h-12"
            />
          </div>
        )}
        <div className="">
          <div className="cursor-pointer  flex items-center  ">
            <Link href={"/user/profile"} className="hover:underline">
              <span className="capitalize px-0.5 font-medium">
                {userData.first_name}{" "}
              </span>
              <span className="capitalize px-0.5 font-medium">
                {userData.last_name}
              </span>
              <span className="text-sm font-semibold text-gray-600">
                ({userData.username})
              </span>
            </Link>
          </div>
          <p className="text-sm text-gray-700"> {userData.email}</p>
        </div>
      </nav>
    </div>
  );
};

export default ProfileNav;
