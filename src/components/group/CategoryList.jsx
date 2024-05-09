"use client";
import React, { useState } from "react";
import GroupList from "./GroupList";
import Link from "next/link";
import { useStore } from "@/stores/store";
import toast from "react-hot-toast";
import CreateGroup from "./CreateGroup";
import { useRouter } from "next/navigation";

const CategoryList = () => {
  const userAuthenticated = useStore((state) => state.userAuthenticated);
  const [toggle, setToggle] = useState(false);
  const router= useRouter()
  const toggleCreateGroup = useStore((state) => state.toggleCreateGroup);
  const setToggleCreateGroup = useStore((state) => state.setToggleCreateGroup);
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

  const handleClick = () => {
    if (userAuthenticated) {
      setToggleCreateGroup(!toggleCreateGroup);
    } else {
      toast.error("Please login to create group!");
      router.push("/auth/login")
    }
  };
  return (
    <div className="p-6 ">
      <div className="flex flex-col-reverse items-start md:flex-row md:items-center gap-4 ">
        <div className="flex justify-start ">
          <select
            name="category"
            options={options}
            className="w-full px-2 py-2 rounded-lg font-bold md:w-44 focus:outline-none bg-white text-gray-600 border border-gray-300 shadow-sm focus:border-blue-300 focus:shadow-sm "
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
          <button
            onClick={handleClick}
            className="bg-purple-700 text-white px-6 py-3  rounded-full font-bold hover:bg-purple-900"
          >
            Create New Group
          </button>
        </div>
      </div>

      {/* Group list */}
      <GroupList toggle={toggle} />
      {toggleCreateGroup && (
        <div className={` fixed top-0 left-0 flex w-screen h-screen justify-center items-center ${toggleCreateGroup && "bg-black/30 "}`}>
          <CreateGroup />
        </div>
      )}
    </div>
  );
};

export default CategoryList;
