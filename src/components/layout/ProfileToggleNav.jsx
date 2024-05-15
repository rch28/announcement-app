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
          "http://127.0.0.1:8000/api/v1/user/logout/",
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
          <ul className="absolute top-4 right-0 bg-white rounded-xl shadow-md border border-gray-400 w-44  shadow-gray-600">
            <li className="border-b p-0.5 border-gray-400" onClick={() => setToggle(false)}>
              <Link
                href="/user/profile"
                className="block px-4 py-3 w-full rounded-t-md hover:bg-gray-300"
              >
                Profile
              </Link>
            </li>

            <li className="p-0.5">
              <button
                onClick={habdleLogout}
                className="block px-4 py-3 w-full rounded-b-md hover:bg-gray-300 text-left"
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
