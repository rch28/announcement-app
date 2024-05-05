"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useStore } from "@/stores/store";
const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [uNameErr, setuNameErr] = useState("");

  const setUserLoggedIn = useStore((state) => state.setUserLoggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    if (!username) {
      setErrorMsg("Username is Missing!!");
      return;
    }
    if (!password) {
      setErrorMsg("Password is Missing!!");
      return;
    }

    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("http://127.0.0.1:8000/api/v1/user/login/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();

        if (result.access && typeof result.access === "string") {
          // set token in cookies
          Cookies.set("access_token", result.access, { expires: 7 });
          Cookies.set("refresh_token", result.refresh), { expires: 7 };
          toast.success("Login Success!");
          setUserLoggedIn(true);
          router.push("/");
        } else {
          // redirect to otp verify
          toast.success("OTP Verification Sent!");
          router.push(
            `/auth/otp-verify?username=${username}&&verifyFor=login`
          );
        }

        resolve();
      } else {
        const result = await response.json();
        if (result.errors.length > 0) {
          result.errors.forEach((error) => {
            setErrorMsg(error.detail);
          });
        }
        reject();
      }
    });
    toast.promise(newPromise, {
      loading: "Loading...",
      error: "Login Failed!",
    });
    setErrorMsg("");
  };
  const handleClickForgotPassword = (e) => {
    e.preventDefault();
    if (!username) {
      setuNameErr("Enter username!");
      return;
    }

    router.push(`/auth/forgot-password?username=${username}`);
  };
  return (
    <form
      className="  border-2 p-4 rounded-md shadow-md shadow-gray-500 w-[400px]"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold text-center pb-10 text-gray-700">
        Login
      </h1>
      {errorMsg && (
        <p className="text-red-500 border border-red-300 px-4 py-2 rounded-xl bg-red-200 mb-4">
          {errorMsg}
        </p>
      )}
      {uNameErr && (
        <p className="text-red-500 border border-red-300 px-4 py-2 rounded-xl bg-red-200 mb-4">
          {uNameErr}
        </p>
      )}

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_username"
          id="floating_username"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 ${
            errorMsg && !username && "focus:border-red-500 border-red-500/55"
          } focus:border-blue-600 peer`}
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
          type="password"
          name="floating_password"
          id="floating_password"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
            errorMsg && !password && "focus:border-red-500 border-red-500/55"
          } `}
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
        <button
          onClick={handleClickForgotPassword}
          className="text-sm text-blue-600 dark:text-blue-500 hover:underline font-bold"
        >
          Forgot Password?
        </button>
      </div>
      <div className=" text-gray-700 flex gap-2 items-center">
        <h1>Don't have an account?</h1>
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
