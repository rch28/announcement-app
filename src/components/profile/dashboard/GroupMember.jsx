"use client";
import { getLoggedInUserData } from "../../../index";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetAccessToken } from "@/index";

const GroupMember = ({ member, admin_id, onRoleChange }) => {
  const [toggle, setToggle] = useState(null); // Track which dropdown is open
  // const [groupMembers, setGroupMembers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      // try {
        // const response = await fetch(`/api/v1/group/${groupId}/list/member/`);
        // const data = await response.json();
        // setGroupMembers(data.results || []);
        const loggedInUser = await getLoggedInUserData();
        setLoggedInUser(loggedInUser);
        console.log(loggedInUser);
        
      // } catch (error) {
      //   console.error("Error fetching group members:", error);
      // }
    };
    fetchGroupData();
  },[]);

  const isAdmin = loggedInUser?.id === admin_id;

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    onRoleChange(member.id, newRole);  // Call parent method to update the role
  };

  const role = member.role === "admin";

  return (
    <div>
      {/* {groupMembers.map((member) => {
        return ( */}
          <div
            key={member.id}
            className="relative flex items-center justify-between p-3 bg-white dark:shadow-none shadow-md shadow-gray-400 my-3 rounded-lg border hover:border hover:border-purple-700"
          >
            <Link
              href={`/user/profile/id=${member.user.id}`}
              className="flex gap-1 hover:underline"
            >
              <span className="capitalize text-sm font-medium text-opacity-90 text-black">
                {member.user.username}
              </span>
            </Link>
            <p className="capitalize text-xs font-semibold text-opacity-90 text-black">
              {role ? "Admin" : member.role}
            </p>
            {isAdmin && member.role !== "admin" && (
              <div className="group">
                <button
                  className="bg-white shadow-md text-black shadow-gray-500 p-1 cursor-pointer rounded-full"
                  onClick={() =>
                    setToggle((prev) => (prev === member.id ? null : member.id))
                  }
                >
                  <DotsVerticalIcon />
                </button>
                <div
                  className={`absolute bg-white shadow-md p-3 shadow-gray-500 rounded-lg right-5 bottom-5 ${
                    toggle === member.id ? "block" : "hidden"
                  }`}
                >
                  <select
                    name="role"
                    id="role"
                    className="block w-full p-2 text-gray-700 bg-white border border-gray-500 focus:border-purple-500 rounded-md focus:outline-none text-sm font-semibold"
                    defaultValue={member.role}
                    onChange={handleRoleChange}
                  >
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="member">Member</option>
                  </select>
                  <button
                    className="text-sm text-black w-full px-4 py-2 rounded-md border border-red-500 hover:bg-red-200 mt-2"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        {/* ); */}
      {/* })} */}
    </div>
  );
};

export default GroupMember;
