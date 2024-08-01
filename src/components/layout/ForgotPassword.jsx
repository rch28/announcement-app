"use client";

import { useStore } from "@/stores/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const router = useRouter();
  const searchParams= useSearchParams()
  const fornewpassowrd=searchParams.get("fornewpassowrd")
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
        toast.error("Email is missing!!");
      return;
    }
    if(fornewpassowrd){
      router.push(`/auth/reset-password/`)
      toast("Enter your new password!!")
      return
    }
    const newPromise = new Promise(async (resolve, reject) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/user/forgot/password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem("username")
        localStorage.setItem("email", email)
        localStorage.setItem("action", "reset")
        router.push(`/auth/forgot-password/otp-verify`)
        resolve(data);
      } else {
        reject(data);
      }
    });
    toast.promise(newPromise, {
      loading: "Loading...",
      success: (data) => {
        return data?.msg;
      },
      error: (error) => {
        if(error instanceof Error){
          return error.message;
        }else if (error.errors && error.errors.length > 0) {
          return error.errors[0].detail;
        } else {
          return "An unexpected error occurred!!"
        }
      },
    });
  };
  return (
    <form
      className=" flex-1 mx-auto border-2 px-4 py-8 rounded-xl shadow-lg shadow-gray-600 bg-white dark:shadow-md dark:bg-gray-950 dark:text-white dark:border dark:border-gray-500 dark:shadow-gray-700"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold text-center pb-10 text-gray-800 dark:text-white">
        Forgot Password
      </h1>
     

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="floating_email"
          id="floating_email"
          autoComplete="off"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400/80 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email Address *
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            Submit
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
