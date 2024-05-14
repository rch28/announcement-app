"use client";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/store";

const CategoryList = () => {
  const userAuthenticated = useStore((state) => state.userAuthenticated);
  const router = useRouter();
  const toggleCreateGroup = useStore((state) => state.toggleCreateGroup);
  const setToggleCreateGroup = useStore((state) => state.setToggleCreateGroup);
  const selectedCategory = useStore((state) => state.selectedCategory);
  const setSelectedCategory = useStore((state) => state.setSelectedCategory);
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const options = [
    { value: "", label: "Any Category" },
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
      router.push("/auth/login");
    }
  };
  return (
    <div className="p-6 ">
      <div className="flex flex-col-reverse items-start md:flex-row md:items-center gap-4 ">
        <div className="flex justify-start">
          <select
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-md font-semibold md:w-44 focus:outline-none bg-white text-gray-800 border border-gray-300 shadow-sm focus:border-purple-500 focus:shadow-sm"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} className="py-2">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="py-3 flex justify-between gap-2 w-full">
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 outline-none w-full md:w-72 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            onClick={handleClick}
            className="bg-purple-700 text-white hidden sm:flex px-4 py-2 rounded-full font-semibold ml-4 md:ml-0 hover:bg-purple-900 transition-colors duration-300 text-nowrap"
          >
            Create New Group
          </button>
          <button
            onClick={handleClick}
            className="bg-purple-700 text-sm text-white px-3 md:px-6 py-1 md:py-3 sm:hidden  rounded-full font-bold hover:bg-purple-900 text-nowrap"
          >
            New Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
