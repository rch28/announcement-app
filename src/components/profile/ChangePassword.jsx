"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useStore } from "@/stores/store";
const ChangePassword = () => {
  const router = useRouter();
  const userData = useStore((state) => state.userData);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const access_token = Cookies.get("access_token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    if (!password || !oldPassword) {
      setErrorMsg("Password is Missing!!");
      return;
    }
    if(password.length < 6){
        setErrorMsg("Password must be atleast 6 characters long");
        return;
    }
    if(password === oldPassword){
        setErrorMsg("Old password and new password must be different");
        return;
    }
    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/user/change/password/`,
        {
          method: "POST",
          body: JSON.stringify({
            username:userData.username,
            old_password: oldPassword,
            new_password: password,
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        Cookies.set("access_token", result.access, { expires: 7 });
        Cookies.set("refresh_token", result.refresh, { expires: 7 });
        router.push("/user/profile");
        resolve(result);
      } else {
        const result = await response.json();
        
        if (result.errors.length > 0) {
          result.errors.forEach((error) => {
            setErrorMsg(error.detail);
          });
        }
        reject(result);
      }
    });
    toast.promise(newPromise, {
      loading: "Loading...",
      success: (data) => data?.msg,
      error: (data) => data.errors[0].detail,
    });
    setErrorMsg("");
  };

  return (
    <form
      className=" px-4 py-8 rounded-xl shadow-lg shadow-gray-600 bg-white dark:shadow-none"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold text-center pb-10 text-gray-700">
        Change Password
      </h1>
      {errorMsg && (
        <p className="text-red-500 border border-red-300 px-4 py-2 rounded-xl bg-red-200 mb-4">
          {errorMsg}
        </p>
      )}

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="old_password"
          id="old_password"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400/80 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
            errorMsg && !oldPassword && "focus:border-red-500 border-red-500/55"
          } `}
          placeholder=" "
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label
          htmlFor="old_password"
          className="peer-focus:font-medium absolute text-sm text-gray-800 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Old Password *
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="new_password"
          id="new_password"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400/80 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
            errorMsg && !password && "focus:border-red-500 border-red-500/55"
          } `}
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label
          htmlFor="new_password"
          className="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          New Password *
        </label>
      </div>

      <div className="flex py-4">
        <button className="bg-purple-700 w-full text-white hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700 px-5 py-2.5 rounded-lg">
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
