"use client";
import Link from "next/link";
import React, { useState } from "react";
import CardUtil from "../utils/CardUtil";
import { NotebookTabs, UserPlus, Users, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useStore } from "@/stores/store";
import DeleteConfirm from "../utils/DeleteConfirm";

const SettingCard = ({ setToggleSetting }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deleteToggle, setDeleteToggle] = useState(false);
  const groupId = searchParams.get("group_id");
  const access_token = Cookies.get("access_token");
  const setToggleCreateGroup = useStore((state) => state.setToggleCreateGroup);
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
  };
  return (
    <div className="flex flex-col p-2 gap-6 relative">
      <div className="flex justify-end absolute right-0 -top-2">
        <button
          className="p-1 flex justify-center items-center dark:text-gray-400 cursor-pointer text-red-500 bg-white shadow-sm shadow-gray-900 rounded-full hover:bg-red-200"
          onClick={() => setToggleSetting(false)}
        >
          <XIcon size={24} />
        </button>
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">Group Settings</h1>
        <p className="text-gray-500">Manage your group settings and members</p>
      </div>
      <div className="border-b border-gray-200">
        <div className="cursor-pointer hover:bg-gray-100 rounded-md p-3 ">
          <CardUtil
            title="View Members"
            icon={
              <Users className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-2" />
            }
          />
        </div>
        <div className="cursor-pointer hover:bg-gray-100 rounded-md p-3 ">
          <CardUtil
            title="Manage Members"
            icon={
              <UserPlus className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-2" />
            }
          />
        </div>
        <div className="cursor-pointer hover:bg-gray-100 rounded-md p-3 ">
          <CardUtil
            title="Manage Annoucements"
            icon={
              <NotebookTabs className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-2" />
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className="cursor-pointer hover:bg-green-300 rounded-md p-3"
          onClick={handleEditGroup}
        >
          <CardUtil
            title="Edit Group Info"
            icon={
              <Users className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-2" />
            }
          />
        </div>
        <div
          className="cursor-pointer hover:bg-red-400 rounded-md p-3 "
          onClick={() => setDeleteToggle(!deleteToggle)}
        >
          <CardUtil
            title="Delete Group"
            icon={
              <UserPlus className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-2" />
            }
          />
        </div>
      </div>
      {deleteToggle && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/30">
          <DeleteConfirm title="Delete Group">
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteToggle(!deleteToggle)}
                className="px-6 py-2 bg-gray-600 rounded-full text-white font-bold hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteGroup}
                className="px-6 py-2 bg-red-600 rounded-full text-white font-bold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </DeleteConfirm>
        </div>
      )}
    </div>
  );
};

export default SettingCard;
