"use client";
import { Cog } from "lucide-react";
import SettingHover from "./SettingHover";
import { useStore } from "@/stores/store";
import { useState } from "react";
import Link from "next/link";

const GroupCard = ({ group, setDeleteToggle, SetGroupData, setLeaveToggle, mode }) => {
  const [toggle, setToggle] = useState(false);
  const setToggleCreateGroup = useStore((state) => state.setToggleCreateGroup);
  return (
    <div className="bg-white shadow-lg shadow-gray-400  rounded-xl p-6  md:hover:scale-105 transition-all ease-linear duration-200 w-64 md:w-full">
      <div className="grid gap-4">
        <Link
          href={`/groups/${group?.name}?group_id=${group.group_id}&&category=${group.category}`}
          className="text-xl font-bold text-gray-800 hover:underline"
        >
          {group.name}
        </Link>
        <p className="line-clamp-2 text-sm font-medium  indent-4 text-black/80">
          {group.description}
        </p>
        {mode === "mygroup" && (
          <div className="flex justify-between ">
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setDeleteToggle((prev) => !prev);
                  SetGroupData(group);
                }}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-300 text-sm font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setToggleCreateGroup(true);
                  SetGroupData(group);
                }}
                className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition duration-300 font-medium"
              >
                Edit
              </button>
            </div>
            <div className="bg-gray-300 shadow-xl shadow-gray-500 rounded-full p-1 group relative ">
              <Cog
                className="text-gray-800 hover:text-gray-900 group-hover:rotate-45 cursor-pointer transition duration-300 "
                onClick={() => setToggle(!toggle)}
              />
              <div
                className={`absolute right-0 bottom-10 md:bottom-5 md:hidden p-4 rounded-xl shadow-md shadow-gray-500 md:group-hover:flex  bg-white w-64 md:w-72 ${
                  toggle ? "flex md:hidden" : "hidden"
                }`}
              >
                <SettingHover group={group} SetGroupData={SetGroupData} mode="mygroup" />
              </div>
            </div>
          </div>
        )}
        {mode === "joinedgroup" && (
          <div className="flex justify-between ">
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setLeaveToggle((prev) => !prev);
                  SetGroupData(group);
                }}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-300 text-sm font-medium"
              >
                Leave Group
              </button>
            </div>
            <div className="bg-gray-300 shadow-xl shadow-gray-500 rounded-full p-1 group relative ">
              <Cog
                className="text-gray-800 hover:text-gray-900 group-hover:rotate-45 cursor-pointer transition duration-300 "
                onClick={() => setToggle(!toggle)}
              />
              <div
                className={`absolute right-0 bottom-10 md:bottom-5 md:hidden p-4 rounded-xl shadow-md shadow-gray-500 md:group-hover:flex  bg-white w-64 md:w-72 ${
                  toggle ? "flex md:hidden" : "hidden"
                }`}
              >
                <SettingHover group={group} SetGroupData={SetGroupData}  mode="joinedgroup" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
