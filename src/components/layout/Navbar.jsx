"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProfileToggleNav from "./ProfileToggleNav";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { logo } from "../../../public";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Style } from "@/lib/Style";
import {motion, useScroll,useMotionValueEvent} from 'framer-motion'
import NoticicationComp from "./NoticicationComp";

const Navbar = () => {
  const [hidden, setHidden] = useState(false);

  const authenticated = useStore((state) => state.userAuthenticated);
  const setUserLoggedIn = useStore((state) => state.setUserLoggedIn);
  const setUserData = useStore((state) => state.setUserData);
  const access_token = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  const pathname = usePathname();
  const { scrollY } = useScroll();


  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

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
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/user/details/`,
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
  }, [refreshToken, access_token, setUserData, setUserLoggedIn]);
  return (
    <motion.nav 
    variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
    animate={hidden ? "hidden" : "visible"}
    transition={{ duration: 0.5, ease: "easeInOut" }}
     className={` ${Style.primary} sticky  top-0 z-50 py-2   border-b  border-purple-500  dark:border-gray-200/25`}>
 
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
                  className={`text-gray-900  hover:text-purple-700 text-xs md:text-lg font-medium ${
                    pathname === "/"
                      ? "text-purple-700 dark:text-purple-700"
                      : "dark:text-white"
                  }`}
                  href="/"
                  passHref
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`text-gray-900  hover:text-putple-700 text-xs md:text-lg font-medium  ${
                    pathname.startsWith("/groups")
                      ? "text-purple-700 dark:text-purple-700"
                      : "dark:text-white"
                  }`}
                  href="/groups"
                  passHref
                >
                  Groups
                </Link>
              </li>
            </ul>
            <div>
              <ThemeToggle/>
            </div>
            <NoticicationComp/>

            {authenticated ? (
              <ProfileToggleNav />
            ) : (
              <Link
                href="/auth/login"
                className=" rounded-full bg-purple-700   text-white hover:outline hover:outline-2 hover:outline-purple-600 hover:bg-white dark:hover:bg-black hover:shadow-md  hover:shadow-[0_10px_10px_rgb(255 255 255,0.5)] px-2 md:px-3 md:py-1  font-bold hover:text-purple-700  dark:hover:text-white text-sm font-serif tracking-wider "
              >
                Login
              </Link>
            )}
          </div>
        </div>
    </motion.nav>
  );
};

export default Navbar;
