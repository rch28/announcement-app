"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import ProfileToggleNav from "./ProfileToggleNav";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import { Bell } from "lucide-react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { logo } from "../../../public";

const Navbar = () => {
  const authenticated = useStore((state) => state.userAuthenticated);
  const setUserLoggedIn = useStore((state) => state.setUserLoggedIn);
  const setUserData = useStore((state) => state.setUserData);
  const access_token = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  useEffect(() => {
    if (!access_token || !refreshToken) {
      setUserLoggedIn(false);
      if (access_token) {
        Cookies.remove("access_token");
      }
      if (refreshToken) {
        Cookies.remove("refresh_token");
      }
      return;
    }
    setUserLoggedIn(true);
    const fetchUserData = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/user/details/",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setUserData(result);
      }
    };
    fetchUserData();
  }, [refreshToken, access_token]);
  return (
    <div className="">
      <nav className=" border-b  border-gray-400/50  dark:border-gray-200/25 ">
        <div className="flex flex-wrap justify-between items-center max-w-5xl mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="text-xl">
              <Image
                src={logo}
                alt="Team App"
                width={30}
                height={30}
                className="rounded-full w-8 md:w-12"
              />
            </span>
            <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">
              Announcemate
            </span>
          </Link>
          <div className="flex items-center space-x-10 rtl:space-x-reverse">
            <p className="relative cursor-pointer">
              <Bell size={18} />
              <span className="absolute -top-2 -right-2 text-[#FD0303] w-4 h-4 p-2 flex justify-center items-center rounded-full  text-sm">
                9
              </span>
            </p>

            {authenticated ? (
              <ProfileToggleNav />
            ) : (
              <Link
                href="/auth/login"
                className="text-md font-bold tracking-wider  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-5xl px-4 py-3 mx-auto flex justify-between items-center">
          <ul className="flex space-x-4">
            <li>
              <Link
                className="text-gray-900 dark:text-white hover:text-blue-500 font-medium"
                href="/"
                passHref
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-900 dark:text-white hover:text-blue-500 font-medium"
                href="/groups"
                passHref
              >
                Groups
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-900 dark:text-white hover:text-blue-500 font-medium"
                href="/announcements"
                passHref
              >
                Announcements
              </Link>
            </li>
          </ul>
          <div className="hidden ">
            <SearchBar />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
