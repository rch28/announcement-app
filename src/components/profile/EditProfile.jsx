"use client";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditProfile = () => {
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
      const respone = await fetch("http://127.0.0.1:8000/api/v1/user/update/", {
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
    <div>
      <form
        className="max-w-md mx-auto py-6 rounded-md "
        onSubmit={habndleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-gray-700 text-sm">
            First Name:
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={first_name}
            onChange={(e) => setfirst_name(e.target.value)}
            className="form-input mt-1 block w-full outline-none border-b border-gray-400 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-gray-700 text-sm">
            Last Name:
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={last_name}
            onChange={(e) => setlast_name(e.target.value)}
            className="form-input mt-1 block w-full outline-none border-b border-gray-400 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input mt-1 block w-full outline-none border-b border-gray-400 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm">
            Email:
          </label>
          <input
            type="email"
            disabled
            name="email"
            id="email"
            value={userData?.email || ""}
            className="form-input mt-1 block w-full outline-none border-b border-gray-400 text-gray-800 bg-gray-300 px-2 rounded-md cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone_no" className="block text-gray-700 text-sm">
            Phone No:
          </label>
          <input
            type="text"
            name="phone_no"
            id="phone_no"
            value={phone_no}
            onChange={(e) => setPhone_no(e.target.value)}
            className="form-input mt-1 block w-full outline-none border-b border-gray-400 text-gray-800"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
