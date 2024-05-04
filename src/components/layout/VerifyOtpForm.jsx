"use client";

import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const VerifyOtpForm = () => {
  const searchParams = useSearchParams();
  const router= useRouter()
  const username = searchParams.get("username");
  const [opt, setopt] = useState("");
  const [optErr, setOptErr] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (opt.length !== 6) {
      setOptErr("Please enter a valid otp");
      return;
    }

    const newPromise = new Promise(async (resolve, reject) => {
      const res = await fetch(
        "http://localhost:8000/api/v1/user/verify/login/otp/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, otp: opt }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        Cookies.set("access_token", data.access, { expires: 7 });
        Cookies.set("refresh_token", data.refresh),  { expires: 7 };
        router.push("/");
        resolve(data);
      } else {
        reject(data);
      }
    });
    toast.promise(newPromise, {
      loading: "Verifying otp...",
      success: (data) => {
        return data?.msg;
      },
      error: (data) => {
        setOptErr(data.errors[0].detail);
        return data.errors[0].detail;
      },
    });
  };
  return (
    <form
      className=" flex-1 mx-auto border-2 p-4 rounded-md shadow-md shadow-gray-500"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold text-center pb-10 text-gray-800">
        Verify-Otp
      </h1>
      {optErr && (
        <p className="text-sm text-red-600 border border-red-300 px-4 py-2 rounded-xl bg-red-200 mb-6">
          {optErr}
        </p>
      )}

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_otp"
          id="floating_otp"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={opt}
          onChange={(e) => setopt(e.target.value)}
        />
        <label
          htmlFor="floating_otp"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Otp
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Verify Otp
        </button>
      </div>
    </form>
  );
};

export default VerifyOtpForm;
