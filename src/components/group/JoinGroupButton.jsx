"use client";
import Cookies from "js-cookie";
import { Cog, LogOut, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CardUtil from "../utils/CardUtil";
import { useStore } from "@/stores/store";
import PopUpWrapper from "../PopUpWrapper";
import LeaveConfirm from "../utils/LeaveConfirm";
import Link from "next/link";
import InvitecodeForm from "./InvitecodeForm";

const JoinGroupButton = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toggle, setToggle] = useState(false);
  const groupId = searchParams.get("group_id");
  const access_token = Cookies.get("access_token");
  const userAuthenticated = useStore((state) => state.userAuthenticated);

  const joined = useStore((state) => state.Joined);
  const setJoined = useStore((state) => state.setJoined);
  const [leaveGroupToggle, setLeaveGroupToggle] = useState(false);
  const [invited, setInvited] = useState(false)
  const handleClick = async () => {
    if (!userAuthenticated) {
      toast.error("You need to login to join the group");
      router.push("/auth/login");
      return;
    }
    setJoined(false);
    setToggle(false);

    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/group/join/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            group: groupId,
            role: "member",
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setJoined(true)
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
    if (data) {
      setJoined(data?.joined);
    }
  }, [data,setJoined]);
  const handleLeaveGroup = async () => {
    setJoined(true);
    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/group/leave/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ group: groupId }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setJoined(false);
        setLeaveGroupToggle(false);
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
    {
      invited && (
        <PopUpWrapper>
          <div className="bg-white  px-4 py-2 rounded-lg">
            <InvitecodeForm setInvited={setInvited} data={data}/>
          </div>
        </PopUpWrapper>
      )
    }
      {joined && userAuthenticated ? (
        <div className="flex justify-center items-center gap-1 md:gap-4 relative">
          <h3 className="px-2 py-1 text-xs  rounded-full  font-bold bg-purple-600 text-white">
            Joined{" "}
          </h3>
          <button
            onClick={() => setToggle(!toggle)}
            className="p-1 border border-gray-400 bg-slate-200 dark:bg-white rounded-full cursor-pointer"
          >
            <Cog className="h-5 w-5 text-gray-800  dark:text-black" />
          </button>
          {toggle && (
            <div className="absolute  bottom-14 right-0 bg-white  border  border-gray-300 py-6 px-4 w-64 md:w-72 rounded-lg shadow-md shadow-gray-500  dark:bg-gray-950 ">
              <div className="flex flex-col gap-3">
                <Link
                  href={`/user/profile/dashboard/manage-members?group_id=${data.group_id}`}
                  className="cursor-pointer bg-slate-200 dark:bg-slate-700 hover:bg-purple-600 dark:hover:bg-purple-600 hover:text-white p-3 rounded-md "
                >
                  <CardUtil
                    title="View Members"
                    icon={<Users className="h-5 w-5 " />}
                  />
                </Link>
                <div
                  className="cursor-pointer bg-slate-200 dark:bg-slate-700 dark:hover:bg-red-600 hover:bg-red-600 p-3  rounded-md hover:text-white"
                  onClick={() => setLeaveGroupToggle(true)}
                >
                  <CardUtil
                    title={"Leave Group"}
                    icon={<LogOut className="h-5 w-5 " />}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {data?.group_type === "private" && (
            <button
              onClick={() => setInvited(true)}
              className="px-6 py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900"
            >
              Join Group
            </button>
          )}
          {data?.group_type === "public" && (
            <button
              onClick={handleClick}
              className="px-6 py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900"
            >
              Join Group
            </button>
          )}
        </>
      )}

      {leaveGroupToggle && (
        <PopUpWrapper>
          <LeaveConfirm title={"leave Group"}>
            <div className="flex gap-4">
              <button
                onClick={() => setLeaveGroupToggle(!leaveGroupToggle)}
                className="px-6 py-2 bg-purple-600 rounded-full text-white font-bold hover:bg-purple-700"
              >
                Cancel
              </button>
              <button
                onClick={handleLeaveGroup}
                className="px-6 py-2 bg-red-600 rounded-full text-white font-bold hover:bg-red-700"
              >
                Leave
              </button>
            </div>
          </LeaveConfirm>
        </PopUpWrapper>
      )}
    </>
  );
};

export default JoinGroupButton;
