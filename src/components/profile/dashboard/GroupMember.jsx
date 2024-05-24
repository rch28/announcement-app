"use client";
import { FetchUserData, getLoggedInUserData } from "@/index";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

const GroupMember = ({ id, admin_id }) => {
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await FetchUserData(id);
      const loggedInUser = await getLoggedInUserData();
      setLoggedInUser(loggedInUser);
      setUserData(user);
    };
    fetchUser();
  }, [id]);

  const isAdmin = loggedInUser?.id === admin_id;
  const role = id === admin_id;

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-3 bg-white dark:shadow-none shadow-md shadow-gray-400 my-3 rounded-lg border hover:border hover:border-purple-700">
        <Link
          href={`/user/profile/id=${id}`}
          className="flex gap-1 hover:underline"
        >
          <span className="capitalize text-sm font-medium text-opacity-90 text-black">
            {userData?.first_name}
          </span>
          <span className="capitalize text-sm font-medium text-opacity-90 text-black">
            {userData?.last_name}
          </span>
        </Link>
        <p className="capitalize text-xs font-semibold text-opacity-90 text-black">
          {role && "Admin"}
        </p>
        {isAdmin && !role && (
          <div className="group">
            <button
              className="bg-white shadow-md text-black shadow-gray-500 p-1 cursor-pointer rounded-full "
              onClick={() => setToggle((prev) => !prev)}
            >
              <DotsVerticalIcon />
            </button>
            <div
              className={`absolute bg-white shadow-md p-3 shadow-gray-500  rounded-lg right-5 bottom-5 hidden group-hover:grid place-content-center `}
            >
              <select
                name="role"
                id="role"
                className="block w-full p-2 text-gray-700  bg-white border border-gray-500  focus:border-purple-500 rounded-md focus:outline-none text-sm font-semibold appearance-auto"
              >
                <option value="">Role</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
              <button
                className="text-sm text-black px-4 py-2 rounded-md border border-red-500 hover:bg-red-200  mt-2"
                onClick={() => console.log("Remove")}
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupMember;
