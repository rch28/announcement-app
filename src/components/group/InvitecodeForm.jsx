"use client";

import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { GetAccessToken } from "@/index";
import { useStore } from "@/stores/store";

const InvitecodeForm = ({ data, setInvited }) => {
  const inputRef = useRef(null);
  const [invite_code, setInvite_code] = useState("");
  const setJoined = useStore((state) => state.setJoined);
  console.log(data);
  const group_id = data?.group_id;
  const access_token = GetAccessToken();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (invite_code === "") {
      toast.error("Please enter the invite code");
      inputRef.current.focus();
      return;
    }
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
            group: group_id,
            role: "member",
            invite_code: invite_code,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setInvited(false);
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
  useEffect(()=>{
    inputRef.current.focus();
  },[])
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-end">
        <XIcon
          className="cursor-pointer text-red-500 p-0.5 bg-white rounded-full shadow-md shadow-gray-500"
          onClick={() => setInvited(false)}
        />
      </div>
      <div className="flex gap-2 my-2">
        <label htmlFor="invite_code" className="hidden">
          Enter the invite code
        </label>
        <Input
          ref={inputRef}
          type="text"
          name="invite_code"
          id="invite_code"
          value={invite_code}
          onChange={(e) => setInvite_code(e.target.value)}
          placeholder="Enter invite code"
          className="border border-gray-600 focus:border-purple-700 w-36"
        />
        <Button
          type="submit"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none   font-bold rounded-md text-sm w-full sm:w-auto px-5 py-2 text-center dark:text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
        >
          Join Group
        </Button>
      </div>
    </form>
  );
};

export default InvitecodeForm;
