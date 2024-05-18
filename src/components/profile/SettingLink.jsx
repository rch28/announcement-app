import Link from "next/link";
import React from "react";

const SettingLink = ({title, desc, link}) => {
  return (
    <div className="border border-purple-400 rounded-xl p-4">
      <h1 className="text-xl font-medium">{title}</h1>
      <p>
        {desc}
      </p>
      <Link href={link} className="flex justify-end my-2">
        <button className="inline-flex py-2 items-center justify-center rounded-md bg-purple-700 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-purple-800  dark:text-gray-900 dark:hover:bg-purple-800/90 dark:focus-visible:ring-[#805AD5]">
          View
        </button>
      </Link>
    </div>
  );
};

export default SettingLink;
