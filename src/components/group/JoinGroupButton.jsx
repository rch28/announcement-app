"use client";
import Cookies from "js-cookie";
import { Cog, LogOut, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CardUtil from "../utils/CardUtil";
import { useStore } from "@/stores/store";

const JoinGroupButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toggle, setToggle] = useState(false);
  const groupId = searchParams.get("group_id");
  const access_token = Cookies.get("access_token");
  const userAuthenticated = useStore((state) => state.userAuthenticated);
  const [offset, setOffset] = useState(0);

  const joined = useStore((state) => state.Joined);
  const setJoined = useStore((state) => state.setJoined);
  console.log(joined, userAuthenticated);
  const handleClick = async () => {
    if (!userAuthenticated) {
      toast.error("You need to login to join the group");
      router.push("/auth/login");
      return;
    }
    setJoined(false);
    setToggle(false);
    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/group/join/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ group_id: groupId }),
      });

      if (response.ok) {
        const result = await response.json();
        setJoined(true);
        resolve(result);
      } else {
        const result = await response.json();
        reject(result);
      }
    });
    toast.promise(newPromise, {
      loading: "Joining group...",
      success: (data) => data?.msg || "Group joined successfully",
      error: (data) => data?.errors[0]?.detail || "Failed to join group",
    });
  };
  useEffect(() => {
    const checkJoined = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/group/joined-by/user/?offset=${offset}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        const isUserJoind = result?.results?.some(
          (group) => group.group_id === groupId
        );
        if (isUserJoind) {
          setJoined(true);
        } else {
          setOffset(offset + 10);
          setJoined(false);
        }
      }
    };
    checkJoined();
  }, []);
  const hanleLeaveGroup = async () => {
    setJoined(true);
    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/group/leave/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ group_id: groupId }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setJoined(false);
        resolve(result);
      } else {
        const result = await response.json();
        reject(result);
      }
    });
    toast.promise(newPromise, {
      loading: "Leaving group...",
      success: (data) => data?.msg || "Group left successfully",
      error: (data) => data.errors[0].detail || "Failed to leave group",
    });
  };
  return (
    <>
      {joined && userAuthenticated ? (
        <div className="flex justify-center items-center gap-1 md:gap-4 relative">
          <h3 className="px-2 py-1 text-xs  rounded-full  text-black font-bold bg-slate-400">
            Joined{" "}
          </h3>
          <button
            onClick={() => setToggle(!toggle)}
            className="p-1 border border-gray-400 bg-slate-200 rounded-full cursor-pointer"
          >
            <Cog className="h-5 w-5 text-gray-800 dark:text-gray-400" />
          </button>
          {toggle && (
            <div className="absolute  bottom-14 right-0 bg-white border border-gray-300 p-4 w-64 md:w-72 rounded-lg shadow shadow-gray-500">
              <div className="flex flex-col gap-3">
                <div className="cursor-pointer hover:bg-gray-300 p-2 rounded-md">
                  <CardUtil
                    title="View Members"
                    icon={
                      <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    }
                  />
                </div>
                <div
                  className="cursor-pointer hover:bg-red-300 p-2 rounded-md"
                  onClick={hanleLeaveGroup}
                >
                  <CardUtil
                    title={"Leave Group"}
                    icon={
                      <LogOut className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="px-6 py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900"
        >
          Join Group
        </button>
      )}
    </>
  );
};

export default JoinGroupButton;
