"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useStore } from "@/stores/store";
const LoginForm = () => {
  const router = useRouter();
  const userRef = useRef(null);
  const passRef = useRef(null);
  const query = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setUserLoggedIn = useStore((state) => state.setUserLoggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      if (userRef.current) {
        userRef.current.focus();
      }
      toast.error("Username is Missing!!");
      return;
    }
    if (!password) {
      if (passRef.current) {
        passRef.current.focus();
      }
      toast.error("Password is Missing!!");
      return;
    }

    const newPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_BASE_URL}/user/login/`,
          {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();

          if (result.access && typeof result.access === "string") {
            // set token in cookies
            Cookies.set("access_token", result.access, { expires: 7 });
            Cookies.set("refresh_token", result.refresh, { expires: 7 });
            setUserLoggedIn(true);
            const callbackUrl = query.get("callbackUrl");
            if (callbackUrl) {
              router.push(callbackUrl);
              resolve(result);
              return;
            }
            router.push("/");
          } else {
            // redirect to otp verify
            localStorage.setItem("username", username);
            localStorage.setItem("action", "login");
            router.push(`/auth/otp-verify`);
          }

          resolve(result);
        } else {
          const result = await response.json();
          if (result.errors.length > 0) {
            result.errors.forEach((error) => {
              reject(error.detail);
              return;
            });
          }
          reject(result);
        }
      } catch (error) {
        reject(error);
      }
    });
    toast.promise(newPromise, {
      loading: "Loading...",
      success: (data) => data?.msg,
      error: (err) => {
        if (err instanceof Error) {
          return err.message;
        }
        return err;
      },
    });
  };

  return (
    <form
      className=" p-4 rounded-xl shadow-lg shadow-gray-600 w-[400px] bg-white dark:shadow-md dark:bg-gray-950 dark:text-white dark:border dark:border-gray-500 dark:shadow-gray-700"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold text-center pb-10 text-gray-700 dark:text-white">
        Login
      </h1>

      <div className="relative z-0 w-full mb-5 group">
        <input
          ref={userRef}
          type="text"
          autoComplete="off"
          name="floating_username"
          id="floating_username"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400/80 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0  focus:border-blue-600 peer`}
          placeholder=" "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label
          htmlFor="floating_username"
          className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 $`}
        >
          Username *
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          ref={passRef}
          type="password"
          autoComplete="off"
          name="floating_password"
          id="floating_password"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400/80 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  `}
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password *
        </label>
      </div>

      <div className="flex">
        <button className="bg-blue-700 w-full text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2.5 rounded-lg">
          login
        </button>
      </div>
      <div className="mt-4 py-4 flex justify-end px-4">
        <Link
          href={"/auth/forgot-password"}
          className="text-sm text-blue-600 dark:text-blue-500 hover:underline font-bold"
        >
          Forgot Password?
        </Link>
      </div>
      <div className=" text-gray-700 flex gap-2 items-center">
        <h1>Don&apos;t have an account?</h1>
        <Link
          href={"/auth/register"}
          className="text-sm  text-blue-600 dark:text-blue-500 hover:underline font-bold"
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
