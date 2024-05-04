"use client";
import Image from "next/image";
import React, { useState } from "react";
import { profile } from "../../../public";
import Link from "next/link";

const ProfileToggleNav = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="">
      <div
        className=" rounded-full  border-gray-500 border-2 cursor-pointe "
        onClick={() => setToggle(!toggle)}
      >
        <Image
          src={profile}
          height={30}
          width={30}
          priority
          alt="profile picture"
          className="rounded-full"
        />
      </div>
      <>
        {toggle && (
          <nav className="relative">
            <ul className="absolute top-4 right-0 bg-white rounded-md shadow-md border border-gray-300 w-44 ">
              <li>
                <Link
                  href="#"
                  className="block px-4 py-3 w-full hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="block px-4 py-3 w-full hover:bg-gray-100"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </>
    </div>
  );
};

export default ProfileToggleNav;
