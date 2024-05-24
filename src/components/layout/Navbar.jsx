"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import ProfileToggleNav from "./ProfileToggleNav";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import { Bell, Moon, Sun } from "lucide-react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { logo } from "../../../public";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const authenticated = useStore((state) => state.userAuthenticated);
  const setUserLoggedIn = useStore((state) => state.setUserLoggedIn);
  const setUserData = useStore((state) => state.setUserData);
  const access_token = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  const pathname = usePathname();
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);
  useEffect(() => {
    const theme = Cookies.get("theme");
    if (!theme) {
      Cookies.set("theme", "dark");
      setTheme("dark");
    } else {
      setTheme(theme);
    }
  }, [theme]);
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
    <div className=" bg-white/80 dark:bg-black/90  sticky  top-0 z-50 ">
      <nav className=" border-b  border-gray-400/50  dark:border-gray-200/25 ">
        <div className="flex  justify-between items-center max-w-5xl mx-auto p-2">
          <Link
            href="/"
            className="flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse"
          >
            <span className="text-xl">
              <Image
                src={logo}
                alt="Team App"
                width={30}
                height={30}
                className="rounded-full w-6 md:w-12"
              />
            </span>
            <span className="self-center text-xs md:text-2xl font-semibold whitespace-nowrap dark:text-white">
              Announcemate
            </span>
          </Link>
          <div className="hidden">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-3 md:space-x-10 rtl:space-x-reverse">
            <ul className="flex  items-center space-x-2 md:space-x-4">
              <li>
                <Link
                  className={`text-gray-900 dark:text-white hover:text-purple-700 text-xs md:text-lg font-medium ${
                    pathname === "/"
                      ? "text-purple-700 dark:text-purple-700"
                      : ""
                  }`}
                  href="/"
                  passHref
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`text-gray-900 dark:text-white hover:text-putple-700 text-xs md:text-lg font-medium  ${
                    pathname.startsWith("/groups")
                      ? "text-purple-700 dark:text-purple-700"
                      : ""
                  }`}
                  href="/groups"
                  passHref
                >
                  Groups
                </Link>
              </li>
            </ul>
            <div>
              {theme === "dark" ? (
                <Sun
                  size={16}
                  color="white"
                  onClick={() => {
                    Cookies.set("theme", "light");
                    setTheme("light");
                  }}
                />
              ) : (
                <Moon
                  size={16}
                  color="black"
                  onClick={() => {
                    Cookies.set("theme", "dark");
                    setTheme("dark");
                  }}
                />
              )}
            </div>
            <p className="relative cursor-pointer">
              <span className="sm:hidden">
                <Bell size={12} />
              </span>
              <span className="hidden sm:flex">
                <Bell size={16} />
              </span>
              <span className="absolute -top-2 -right-2 text-[#FD0303] w-4 h-4 p-2 flex justify-center items-center rounded-full  text-sm">
                9
              </span>
            </p>

            {authenticated ? (
              <ProfileToggleNav />
            ) : (
              <Link
                href="/auth/login"
                className="text-sm sm:text-lg font-bold tracking-wider  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
