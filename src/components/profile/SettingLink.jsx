import Link from "next/link";
import React from "react";

const SettingLink = ({title, desc, link}) => {
  return (
    <div className=" bg-white shadow-lg dark:shadow-sm dark:shadow-gray-400 hover:shadow-lg shadow-gray-400 hover:shadow-gray-500 border hover:border-purple-400 rounded-xl hover:scale-105 transition-all ease-linear p-4">
      <h1 className="text-xl font-medium tracking-tighter text-black">{title}</h1>
      <p className="text-black/90 font-light text-sm"> 
        {desc}
      </p>
      <Link href={link} className="flex justify-end my-2">
        <button className="inline-flex py-2 items-center justify-center rounded-md bg-purple-700 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-purple-800  dark:text-white dark:hover:bg-purple-800/90 dark:focus-visible:ring-[#805AD5]">
          View
        </button>
      </Link>
    </div>
  );
};

export default SettingLink;
