"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useStore } from "@/stores/store";
const ResetPasswordFrom = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPssword, setconfirmPssword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");


  const email=useStore((state)=>state.email)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    if(!email){
      toast("Enter yout email!!")
      router.push("/auth/forgot-password?fornewpassowrd=true")
      return;
    }
    if (!password || !confirmPssword) {
      setErrorMsg("Password is Missing!!");
      return;
    }
    if (password.length < 6 || confirmPssword.length < 6) {
      setErrorMsg("Password must be atleast 6 characters long");
      return;
    }
    if (password !== confirmPssword) {
      setErrorMsg("Password and Confirm password is not matching!!");
      return;
    }

    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/user/change/forgot/password/`,
        {
          method: "POST",
          body: JSON.stringify({ email, new_password: password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        router.push("/auth/login");

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
      className="px-4   py-12 rounded-xl shadow-lg shadow-gray-600 bg-white w-[400px] dark:shadow-md dark:bg-gray-950 dark:text-white dark:border dark:border-gray-500 dark:shadow-gray-700"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold text-center pb-10 text-gray-700 dark:text-white">
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
          name="new_password"
          id="new_password"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400/80 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
            errorMsg && !password && "focus:border-red-500 border-red-500/55"
          } `}
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label
          htmlFor="new_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          New Password *
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400/80 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
            errorMsg &&
            !confirmPssword &&
            "focus:border-red-500 border-red-500/55"
          } `}
          placeholder=" "
          value={confirmPssword}
          onChange={(e) => setconfirmPssword(e.target.value)}
        />
        <label
          htmlFor="confirm_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm Password *
        </label>
      </div>

      <div className="flex">
        <button className="bg-blue-700 w-full text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2.5 rounded-lg">
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordFrom;
