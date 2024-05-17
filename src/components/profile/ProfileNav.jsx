"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UserName from "../utils/UserName";
import { profile } from "../../../public";

const ProfileNav = () => {
  const pathname = usePathname();
  return (
    <div className="w-full  ">
      <nav className="flex justify-start items-start gap-2">
        <Image
          src={profile}
          height={200}
          width={200}
          priority
          alt="profile picture"
          className="rounded-full w-12 h-12"
        />
        <div className="">
          <Link
            href={"/user/profile/setting"}
            className="cursor-pointer  flex items-center  "
          >
            <p>
              <span>Raju </span>
              <span>Chhetry</span>
            </p>
            (username)
          </Link>
          <p className="text-sm text-gray-700"> rajuchhetry11@gmail.com</p>
        </div>
      </nav>
    </div>
  );
};

export default ProfileNav;
