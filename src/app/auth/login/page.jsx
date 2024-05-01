"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { auth } from "../../../../public";
import Link from "next/link";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMsg("")
    if(!email || !password){
      setErrorMsg("Credential Missing!!")
      return;
    }

    const newPromise = new Promise((resolve, reject) => {
      
    });

    toast.promise(newPromise, {
      loading: "Loading...",
      success: "Successfully login!",
      error: "Login Failed!",
    });
    setErrorMsg("")
    console.log("Form submitted");
  };
  return (
    <div className="p-4 mt-4">
      <div className=" flex justify-center md:justify-between flex-row-reverse gap-4">
       
        <form
          className="  border-2 p-4 rounded-md shadow-md shadow-gray-500 w-[400px]"
          onSubmit={handleSubmit}
        >
      <h1 className="text-4xl font-bold text-center pb-10 text-gray-700">Login</h1>
      {
          errorMsg &&(
            <p className="text-red-600 border border-red-300 px-4 py-2 rounded-xl bg-red-200 mb-4" >
              {errorMsg}
            </p>
          )
        }

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 ${errorMsg && !email && "focus:border-red-500 border-red-500" } focus:border-blue-600 peer`}
              placeholder=" "
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 $`}
            >
              Email address *
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errorMsg && !password && "focus:border-red-500 border-red-500"} `}
              placeholder=" "
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password *
            </label>
          </div>

          <div className="flex">
            <button className="bg-blue-700 w-full text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2.5 rounded-lg">login</button>
          </div>
          <div className="mt-6 text-gray-700 flex gap-2 items-center">
            <h1>Don't have an account?</h1>
            <Link
              href={"/auth/register"}
              className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Register
            </Link>
          </div>
        </form>
        <div className=" hidden md:flex flex-1 justify-center" >
          <Image src={auth} height={400} width={400} priority alt="auth" />
        </div>
      </div>
    </div>
  );
};

export default Login;
