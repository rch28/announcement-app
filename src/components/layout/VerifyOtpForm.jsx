"use client";

import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const VerifyOtpForm = () => {
  const otpRef = useRef(null);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [action, setVerifyFor] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  console.log(action, url);
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedUsername = localStorage.getItem("username");
    const storedAction = localStorage.getItem("action");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
    setVerifyFor(storedAction);
    if (storedAction === "login") {
      setUrl("login");
    } else if (storedAction === "reset") {
      setUrl("forgot/password");
    }
  }, [router]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && action === "reset") {
      toast("Email is required");
      router.push("/auth/forgot-password");
      return;
    }
    if (otp === "") {
      if (otpRef.current) {
        otpRef.current.focus();
      }
      toast.error("Enter opt");
      return;
    }
    if (otp.length !== 6) {
      toast.error("Please enter a valid otp");
      return;
    }
    if (!username && action === "login") {
      toast("Enter username and password");
      router.push("/auth/login");
      return;
    }

    const newPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DB_BASE_URL}/user/verify/${url}/otp/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              action === "login"
                ? { username: username, otp: otp }
                : action === "reset" && { email: email, otp: otp }
            ),
          }
        );
        const data = await res.json();
        if (res.ok) {
          if (action === "login") {
            Cookies.set("access_token", data.access, { expires: 7 });
            Cookies.set("refresh_token", data.refresh, { expires: 7 });
            localStorage.removeItem("username");
            localStorage.removeItem("action");
            router.push("/");
          } else if (action === "reset") {
            localStorage.setItem("email", email);
            localStorage.removeItem("action");
            router.push(`/auth/reset-password`);
          }
          resolve(data);
        } else {
          reject(data);
        }
      } catch (error) {
        reject(error);
      }
    });
    toast.promise(newPromise, {
      loading: "Verifying otp...",
      success: (data) => {
        return data?.msg;
      },
      error: (error) => {
        if (error instanceof Error) {
          return error.message;
        }
        return error.errors[0].detail;
      },
    });
  };
  return (
    <form
      className=" flex-1 mx-auto border-2 p-4 rounded-xl shadow-lg shadow-gray-600 bg-white dark:shadow-md dark:bg-black dark:text-white dark:border dark:border-gray-500 dark:shadow-gray-700"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold text-center pb-10 text-gray-800 dark:text-white">
        Verify-Otp
      </h1>

      <div className="relative z-0 w-full mb-5 group">
        <input
          ref={otpRef}
          type="text"
          autoComplete="off"
          name="floating_otp"
          id="floating_otp"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
          placeholder=" "
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <label
          htmlFor="floating_otp"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Otp
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className=" disabled:bg-gray-500 disabled:text-white/75   p-2 rounded-full w-full  md:px-4 bg-purple-600 hover:bg-purple-700 font-bold font-serif text-sm cursor-pointer "
        >
          Verify Otp
        </button>
      </div>
    </form>
  );
};

export default VerifyOtpForm;
