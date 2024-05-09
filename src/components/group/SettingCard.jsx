"use client";
import Link from "next/link";
import React, { useState } from "react";
import CardUtil from "../utils/CardUtil";
import { UserPlus, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useStore } from "@/stores/store";

const SettingCard = ({ setToggleSetting }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deleteToggle, setDeleteToggle] = useState(false)
  const groupId = searchParams.get("group_id");
  const access_token = Cookies.get("access_token");
  const setToggleCreateGroup = useStore(state=>state.setToggleCreateGroup)
  const handleDeleteGroup = () => {
    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/group/delete/${groupId}/`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.ok) {
        setToggleSetting(false);
        router.push("/groups");
        resolve();
      } else {
        const result = await response.json();
        setToggleSetting(false);
        reject(result);
      }
    });
    toast.promise(newPromise, {
      loading: "Deleting group...",
      success: "Group deleted successfully!",
      error: (data) => data.errors[0].detail || "Failed to delete group",
    });
  };

  const handleEditGroup = () => {
    setToggleCreateGroup(true);
    // setToggleSetting(false);
  }
  return (
    <div className="flex flex-col p-2 pt-0 gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">Group Settings</h1>
        <p className="text-gray-500 ">Manage your group settings and members</p>
      </div>
      <div className="flex flex-col gap-2 border-b pb-4">
        <div className="cursor-pointer hover:bg-gray-300 p-2 rounded-md">
          <CardUtil
            title="View Members"
            icon={
              <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            }
          />
        </div>
        <div className="cursor-pointer hover:bg-gray-300 p-2 rounded-md">
          <CardUtil
            title="Manage Members"
            icon={
              <UserPlus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="cursor-pointer hover:bg-gray-300 p-2 rounded-md" onClick={handleEditGroup}>
          <CardUtil
            title="Edit Group Info"
            icon={
              <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            }
          />
        </div>
       
        <div
          className="cursor-pointer hover:bg-gray-300 p-2 rounded-md"
          onClick={()=>setDeleteToggle(!deleteToggle)}
        >
          <CardUtil
            title="Delete Group"
            icon={
              <UserPlus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            }
          />
        </div>
      </div>
      {deleteToggle && (
        <div className={` fixed top-0 left-0 flex w-screen h-screen justify-center items-center ${deleteToggle && "bg-black/30 "}`}>
          <div>
            <div className="bg-white border-2 border-gray-300 shadow-md shadow-purple-400 p-4 rounded-lg w-88">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Delete Group</h1>
                <p className="text-gray-500 text-sm">
                  Are you sure you want to delete this group?
                </p>
                <div className="flex gap-4 ">
                <button
                    onClick={()=>setDeleteToggle(!deleteToggle)}
                    className="px-6 py-2 bg-gray-600 rounded-full  text-white font-bold hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteGroup}
                    className="px-6 py-2 bg-red-600 rounded-full  text-white font-bold hover:bg-red-700"
                  >
                    Delete
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingCard;
