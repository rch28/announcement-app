"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import ProfileToggleNav from "./ProfileToggleNav";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import { Bell } from "lucide-react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const authenticated = useStore((state) => state.userAuthenticated);
  const loggedIn = Cookies.get("access_token")?true:false;
  const setUserLoggedIn = useStore((state)=>state.setUserLoggedIn);
  useEffect(() => {
    setUserLoggedIn(loggedIn);
  
  },[loggedIn])
  return (
    <div className="">
      <nav className=" border-b  border-gray-400/50  dark:border-gray-200/25 ">
        <div className="flex flex-wrap justify-between items-center max-w-5xl mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="text-3xl">👩🏻‍🎤</span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Team App
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <p className="relative cursor-pointer">
              <Bell size={18}/>
              <span className="absolute -top-3 -right-2 text-[#FD0303] bg-slate-100 w-4 h-4 p-2 flex justify-center items-center rounded-full shadow-sm shadow-gray-400 text-sm">9</span>
            </p>
            <Link
              href="tel:5541251234"
              className="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              (555) 412-1234
            </Link>
            {
            authenticated ? (
                 <ProfileToggleNav/> 
            ) : (
              <Link
                href="/auth/login"
                className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </Link>
            )
            }
         
          </div>
        </div>
      </nav>
      <nav className=" border-b border-gray-400/50 dark:border-gray-200/25 ">
        <div className="max-w-5xl  px-4 py-3 mx-auto">
          <div className="flex items-center gap-10">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
             
              <li>
                <Link
                  href="/groups"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Groups
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Features
                </Link>
              </li>
           
            </ul>
            <div>
                <SearchBar/>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
