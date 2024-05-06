"use client";
import Image from "next/image";
import React, { useState } from "react";
import { profile } from "../../../public";
import Link from "next/link";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ProfileToggleNav = () => {
  const [toggle, setToggle] = useState(false);
  const isLoggedIn = useStore((state) => state.userAuthenticated);
  const userData = useStore((state) => state.userData);
  const habdleLogout = async () => {
    if (isLoggedIn) {
      useStore.setState({ userAuthenticated: false });
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      toast.success("Logout Success!");
      window.location.href = "/auth/login";

      // implement logout api later

      // const response = await fetch("http://127.0.0.1:8000/api/v1/user/logout/",{
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${refresh_token}`
      //   },
      // });
      // const result = await response.json();
      // if(response.ok){
      //   toast.success("Logout Success!");
      //   window.location.href = "/auth/login";
      // }
    }
  };
  return (
    <div className="">
      {userData?.profilepic && (
        <div
          className="cursor-pointer   bg-gray-200 text-center text-gray-500 text-sm  rounded-md w-8 h-8"
          onClick={() => setToggle(!toggle)}
        >
          <Image
            className="rounded-full h-full w-full "
            src={userData.profilepic}
            width={500}
            height={400}
            alt="profile"
            priority
          />
        </div>
      )}
      {!userData?.profilepic && (
        <div
          className=" rounded-full  border-gray-500 border-2 cursor-pointer "
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
      )}

      {toggle && (
        <nav className="relative">
          <ul className="absolute top-4 right-0 bg-white rounded-xl shadow-md border border-gray-300 w-44  shadow-gray-400">
            <li className="border-b">
              <Link
                href="/profile"
                className="block px-4 py-3 w-full hover:bg-gray-300"
              >
                Profile
              </Link>
            </li>

            <li>
              <button
                onClick={habdleLogout}
                className="block px-4 py-3 w-full hover:bg-gray-300 text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProfileToggleNav;
