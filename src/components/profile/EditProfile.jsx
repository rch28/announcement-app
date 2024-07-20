"use client";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const EditProfile = ({setToggle}) => {
  const router= useRouter()
  const userData = useStore((state) => state.userData);
  const [first_name, setfirst_name] = useState(userData.first_name || "");
  const [last_name, setlast_name] = useState(userData.last_name || "");
  const [username, setUsername] = useState(userData.username || "");
  const [phone_no, setPhone_no] = useState(userData.phone_no || "");

  const access_token = Cookies.get("access_token");
  const setUserData = useStore((state) => state.setUserData);
  useEffect(() => {
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
  }, []);
  useEffect(() => {
    setfirst_name(userData.first_name || "");
    setlast_name(userData.last_name || "");
    setUsername(userData.username || "");
    setPhone_no(userData.phone_number || "");
  }, [
    userData.first_name,
    userData.last_name,
    userData.username,
    userData.phone_number,
  ]);

  const habndleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      toast.error("Username is required");
      return;
    }

    const newPromise = new Promise(async (resolve, reject) => {
      const respone = await fetch(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/user/update/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          username: username,
          phone_number: phone_no,
        }),
      });
      const result = await respone.json();
      if (respone.ok) {
        setUserData(result);
        router.push('/user/profile')
        if(setToggle){
          setToggle(false)
        }
        resolve();
      } else {
        reject(result);
      }
    });
    toast.promise(newPromise, {
      loading: "Updating....",
      success: "Profile Updated!!",
      error: (data) => (data ? data.errors[0].detail : "Update Failed!!"),
    });
  };

  return (
    <div className="">
      <form className="" onSubmit={habndleSubmit}>
        <div className="mb-4 flex flex-col  gap-2">
          <div className="">
            <label htmlFor="first_name" className="block text-black font-medium text-sm">
              First Name:
            </label>
            <Input
              type="text"
              name="first_name"
              id="first_name"
              value={first_name}
              onChange={(e) => setfirst_name(e.target.value)}
              className="border border-gray-400 focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-black font-medium text-sm">
              Last Name:
            </label>
            <Input
              type="text"
              name="last_name"
              id="last_name"
              value={last_name}
              onChange={(e) => setlast_name(e.target.value)}
              className="border border-gray-400 focus:border-purple-500"
            />
          </div>
        </div>
        <div className="mb-4 flex gap-2 flex-col">
          <div className="">
            <label htmlFor="username" className="block text-black font-medium text-sm">
              Username:
            </label>
            <Input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-400 focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="phone_no" className="block text-black font-medium text-sm">
              Phone No:
            </label>
            <Input
              type="text"
              name="phone_no"
              id="phone_no"
              value={phone_no}
              onChange={(e) => setPhone_no(e.target.value)}
              className="border border-gray-400 focus:border-purple-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          >
            Update profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
