"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
  const router= useRouter();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setIsError(false);
    setPasswordErr(false);
    if (
      !fName ||
      !lName ||
      !username ||
      !email ||
      !password ||
      !repeatPassword
    ) {
      setIsError(true);
      return;
    }
    if (password.length < 6) {
      setPasswordErr(true);
      setErrMsg("Password must be at least 6 characters long!!");
      return;
    }
    if (password !== repeatPassword) {
      setPasswordErr(true);
      setErrMsg("Password and Confirm password didn't match!!");
      return;
    }

    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/user/register/`,
        {
          method: "POST",
          body: JSON.stringify({
            first_name: fName,
            last_name: lName,
            username,
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        router.push("/auth/login");
        resolve();
      } else {
        const result = await response.json();
        if (result?.errors?.length > 0) {
          result.errors.forEach((error) => {
            setErrMsg(error.detail)            
          });
        }
        reject();
      }
    });

    toast.promise(newPromise, {
      loading: "Loading...",
      success: "Successfully register!",
      error: "Registration Failed!",
    });
  };
  return (
    <form
      className=" flex-1 mx-auto p-4 rounded-xl shadow-lg shadow-gray-600 bg-white dark:shadow-md dark:bg-gray-950 dark:text-white dark:border dark:border-gray-500 dark:shadow-gray-700"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold text-center pb-10 text-gray-800 dark:text-white">
        Register
      </h1>
      {errMsg && (
        <p className="text-sm text-red-600 border border-red-300 px-4 py-2 rounded-xl bg-red-200 mb-6">
          {errMsg}
        </p>
      )}
     
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer `}
            placeholder=" "
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
          <label
            htmlFor="floating_first_name"
            className={`peer-focus:font-medium absolute text-sm text-gray-700 leading-tight dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 `}
          >
            {isError && !fName ? (
              <p className="text-red-500">First Name is missing!!</p>
            ) : (
              "First Name *"
            )}
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_last_name"
            id="floating_last_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
          <label
            htmlFor="floating_last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-700 leading-tight dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isError && !lName ? (
              <p className="text-red-500">Last Name is missing!!</p>
            ) : (
              "Last Name *"
            )}
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_username"
            id="floating_username"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={username}
            onChange={(e) => setuserName(e.target.value)}
          />
          <label
            htmlFor="floating_username"
            className="peer-focus:font-medium absolute text-sm text-gray-700 leading-tight dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isError && !username ? (
              <p className="text-red-500">Username is missing!!</p>
            ) : (
              "Username *"
            )}
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-700 leading-tight dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isError && !email ? (
              <p className="text-red-500">Email is missing!!</p>
            ) : (
              "Email address *"
            )}
          </label>
        </div>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="floating_password"
          id="floating_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-700 leading-tight dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {isError && !password ? (
            <p className="text-red-500">Password is missing!!</p>
          ) : errMsg && passwordErr ? (
            <p className="text-red-600 font-bold">Password *</p>
          ) : (
            "Password *"
          )}
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="repeat_password"
          id="floating_repeat_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <label
          htmlFor="floating_repeat_password"
          className="peer-focus:font-medium absolute text-sm text-gray-700 leading-tight dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {isError && !repeatPassword ? (
            <p className="text-red-500">Confirm Password is missing!!</p>
          ) : errMsg && passwordErr ? (
            <p className="text-red-600 font-bold">"Confirm Password *"</p>
          ) : (
            "Confirm Password *"
          )}
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
      <div className="mt-2 text-gray-700 flex gap-2 items-center">
        <h1>Already have an account?</h1>
        <Link
          href={"/auth/login"}
          className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
