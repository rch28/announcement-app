"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import CardUtil from "../utils/CardUtil";
import { NotebookTabs, UserPlus, Users, XIcon, CircleDollarSign } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useStore } from "@/stores/store";
import DeleteConfirm from "../utils/DeleteConfirm";
import PopUpWrapper from "../PopUpWrapper";

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
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/group/delete/${groupId}/`,
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
          className="p-1 flex justify-center items-center dark:text-gray-900 cursor-pointer text-red-500 bg-white shadow-sm shadow-gray-900 rounded-full hover:bg-red-200"
          onClick={() => setToggleSetting(false)}
        >
          <XIcon size={24} />
        </button>
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">Group Settings</h1>
        <p className="text-gray-500">Manage your group settings and members</p>
      </div>
      <div className="border-b dark:border-none border-gray-200 my-2">

        <div className="cursor-pointer hover:bg-purple-600 hover:text-white rounded-md p-3 ">
          <Link href={`/user/profile/dashboard/manage-members?group_id=${groupId}`}>
            <CardUtil
              title="Manage Members"
              icon={
                <UserPlus className="   mr-2" size={18} />
              }
            />
          </Link>
        </div>
        <div className="cursor-pointer hover:bg-purple-600 hover:text-white rounded-md p-3 ">
          <Link href={`/user/profile/dashboard/manage-announcements?group_id=${groupId}`}>
            <CardUtil
              title="Manage Annoucements"
              icon={
                <NotebookTabs className="  mr-2" size={16} />
              }
            />
          </Link>
        </div>
        <div 
          className="cursor-pointer hover:bg-purple-600 hover:text-white rounded-md p-3 "
        >
          <Link href={{
            pathname: "/payment/checkout",
            query: {
              group_id: groupId,
            },
          }}>
            <CardUtil
              title="Upgrade to Premium"
              icon={
                <CircleDollarSign className="  mr-2" size={20} />
              }
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className="cursor-pointer hover:bg-green-600 hover:text-white rounded-md p-3"
          onClick={handleEditGroup}
        >
          <CardUtil
            title="Edit Group Info"
            icon={
              <Users className=" h-5 w-5   mr-2" />
            }
          />
        </div>
        <div
          className="cursor-pointer hover:bg-red-600 rounded-md p-3 hover:text-white "
          onClick={() => setDeleteToggle(!deleteToggle)}
        >
          <CardUtil
            title="Delete Group"
            icon={
              <UserPlus className=" h-5 w-5  mr-2" />
            }
          />
        </div>
      </div>
      {deleteToggle && (
        <PopUpWrapper>
          <DeleteConfirm title="Delete Group">
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteToggle(!deleteToggle)}
                className="px-6 py-2 bg-purple-600 rounded-full text-white font-bold hover:bg-purple-700"
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
        </PopUpWrapper>
      )}
    </div>
  );
};

export default SettingCard;
