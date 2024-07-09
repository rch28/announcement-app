"use client";
import Image from "next/image";
import React, { useState } from "react";
import { profile } from "../../../public";
import Link from "next/link";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfileToggleNav = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const isLoggedIn = useStore((state) => state.userAuthenticated);
  const userData = useStore((state) => state.userData);
  const refresh_token = Cookies.get("refresh_token");
  const access_token = Cookies.get("access_token");
  const habdleLogout = async () => {
    if (isLoggedIn) {
      const newPromise = new Promise(async (resolve, reject) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_BASE_URL}/user/logout/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify({ refresh: refresh_token }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          useStore.setState({ userAuthenticated: false });
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          router.push("/auth/login");
          resolve(result);
        } else {
          reject(result);
        }
      });
      toast.promise(newPromise, {
        loading: "Logging out...",
        success: "Logout Success",
        error: "Logout Failed!! something went wrong",
      });
    }
  };
  return (
    <div className="rounded-full">
      <div
        className="cursor-pointer   text-center  text-gray-500 text-sm  rounded-md "
        onClick={() => setToggle(!toggle)}
      >
        <Image
          className="rounded-full w-6 md:w-10  h-6 md:h-10 "
          src={userData.profilepic ? userData.profilepic : profile}
          width={500}
          height={500}
          alt="profile"
          priority
        />
      </div>

      {toggle && (
        <nav className="relative z-50">
          <ul className="absolute top-4 right-0 bg-white rounded-xl shadow-md border border-gray-400 w-32 shadow-gray-600 dark:shadow-md  dark:border-none dark:shadow-white">
            <li
              className="border-b  border-gray-400"
              onClick={() => setToggle(false)}
            >
              <Link
                href="/user/profile"
                className="block px-4 py-3 w-full text-black text-center rounded-t-xl  font-medium hover:bg-gray-300"
              >
                Profile
              </Link>
            </li>

            <li className="">
              <button
                onClick={habdleLogout}
                className="block px-4 py-3 w-full rounded-b-xl  text-black text-center font-medium hover:bg-gray-300 "
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
