"use client"
import React from "react";
import GroupList from "./GroupList";
import Link from "next/link";
import { useStore } from "@/stores/store";
import toast from "react-hot-toast";

const CategoryList = () => {
  const userAuthenticated= useStore(state=>state.userAuthenticated)
  const options = [
    { value: "Any", label: "Any Category" },
    { value: "WEB", label: "WEB" },
    { value: "Network", label: "Network" },
    { value: "Cyber", label: "Cyber Security" },
    { value: "Cloud", label: "Cloud" },
    { value: "Art", label: "Art" },
    { value: "Food", label: "Food" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Health", label: "Health" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Sports", label: "Sports" },
    { value: "Travel", label: "Travel" },
    { value: "Other", label: "Other" },
  ];
  return (
    <div className="p-6 ">
      <div className="flex flex-col-reverse items-start md:flex-row md:items-center gap-4 ">
        <div className="flex justify-start ">
          <select
            name="category"
            options={options}
            className="w-full px-2 py-2 rounded-lg font-bold sm:w-72 focus:outline-none bg-white text-gray-600 border border-gray-300 shadow-sm focus:border-blue-300 focus:shadow-sm "
          >
            {options.map((option) => (
              <option
                className="w-fit py-2 px-4"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="py-3 flex  justify-between w-full ">
            <input
              type="text"
              placeholder="Search groups..."
              className="border-2 border-gray-300 rounded-full px-4 py-1 outline-none"
            />
            <Link href={userAuthenticated?"/groups/create-group":"/auth/login"} className="bg-blue-500 text-white px-6 py-3  rounded-full font-bold hover:bg-blue-600">
              Create New Group
            </Link>
        </div>
      </div>

      {/* Group list */}
      <GroupList/>
    </div>
  );
};

export default CategoryList;
