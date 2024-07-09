"use client";
import Image from "next/image";
import { Globe, GlobeLock, User } from "lucide-react";
import Avatar from "react-avatar";
import { bgimg } from "../../../public";
import JoinGroupButton from "./JoinGroupButton";
import { useStore } from "@/stores/store";
import Rating from "./Rating";
import { useEffect, useState } from "react";
import { GetAccessToken } from "@/index";

const GroupCard = ({ data }) => {
  const [groupMembers, setGroupMembers] = useState([]);
  const setGroupAdmin = useStore((state) => state.setGroupAdmin);
  const role= useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);

  const groupAdmin = useStore((state) => state.groupAdmin);
  const toggleCreateAnnouncement = useStore(
    (state) => state.toggleCreateAnnouncement
  );
  const setToggleCreateAnnouncement = useStore(
    (state) => state.setToggleCreateAnnouncement
  );
  const userData = useStore((state) => state.userData);
  const access_token = GetAccessToken();
  // fetch Group members
  const fetchGroupMembers = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_BASE_URL}/group/${data?.group_id}/list/member/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch group members");
    }
    const result = await response.json();
    setGroupMembers(result);
  };
  // Admin Information
  const fetchGroupAdmin = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_BASE_URL}/user/retrieve/${data?.admin}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch group admin");
    }
    const result = await response.json();
    setGroupAdmin(result);
  };

  useEffect(() => {
    if (data?.group_id && access_token) {
      fetchGroupMembers();
    }

    if (data?.admin && access_token) {
      fetchGroupAdmin();
    }
    if (groupMembers?.results) {
      const adminUser = groupMembers?.results?.find(
        (user) => user.role === "admin"
      );

      if (adminUser.user === userData.username) {
        setRole(adminUser.role);
      } else {
        const LoggedInUserRole = groupMembers?.results.find(
          (user) => user.user === userData.username
        );

        setRole(LoggedInUserRole ? LoggedInUserRole.role : "guest");
      }
    }
  }, [data,role]);
  return (
    <>
      <div className="w-full ">
        <div className="grid gap-6 max-w-xl md:max-w-screen-lg mx-auto  ">
          <div className="grid gap-4  md:grid-cols-2 justify-between  ">
            <Image
              src={data?.image || bgimg}
              className="rounded-lg object-cover w-full md:max-w-[450px] aspect-[3/2]"
              height={400}
              width={600}
              alt="Group Image"
            />
            <div className="flex bg-white dark:bg-gray-950 flex-col gap-4 justify-between border border-gray-300  dark:border-none  p-2 sm:p-4 rounded-xl shadow-lg dark:shadow-md shadow-gray-500 dark:shadow-gray-900">
              <div className="flex flex-col gap-2 max-w-96 ">
                <h3 className=" text-2xl xs:text-3xl font-bold">
                  {data?.name}
                </h3>
                <div>
                  {data?.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      <span className="font-semibold"></span> {data?.location}{" "}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {data?.group_type === "public" ? (
                    <p
                      className="flex justify-center items-center gap-1 px-2 py-0.5 bg-purple-300 dark:bg-gray-800  rounded-full"
                      title="public"
                    >
                      <Globe className="w-3 h-3 " />
                      <span className="text-xs ">Public</span>
                    </p>
                  ) : (
                    <GlobeLock className="w-3 h-3 " />
                  )}
                  <div className="bg-purple-600 rounded-full px-3 py-1 text-xs font-medium dark:bg-gray-800 text-white capitalize">
                    {data?.category}
                  </div>
                  <Rating rating={data?.average_rating} />
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {data?.description}
                </p>
                <div className="flex items-center text-sm ">
                  <div className=" p-2 px-4 bg-purple-300 dark:bg-gray-800 flex gap-2 rounded-full">
                    <User className="w-4 h-4 text-purple-700 dark:text-gray-400" />

                    <span>{data?.total_members} members</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center  lg:pr-4">
                {groupAdmin && (
                  <div className="flex items-center gap-2">
                    {groupAdmin?.profilepic ? (
                      <Image
                        src={groupAdmin?.profilepic}
                        width={50}
                        height={50}
                        alt="Group Admin Image"
                        className="rounded-full p-0.5"
                      />
                    ) : (
                      <Avatar
                        name={`${groupAdmin?.first_name} ${groupAdmin?.last_name}`}
                        size="50"
                        className="text-xs md:text-sm h-12 w-12"
                        round={true}
                        color="rgb(126 34 206 )"
                      />
                    )}
                    <div className="text-xs md:text-sm">
                      <p className="font-medium capitalize flex gap-2">
                        <span>{groupAdmin?.first_name}</span>
                        <span className="hidden md:flex">
                          {groupAdmin?.last_name}
                        </span>
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">Admin</p>
                    </div>
                  </div>
                )}
                {role==="admin"? (
                  <div className="flex justify-end w-full">
                    <button
                      className="px-2 sm:px-4 py-2 bg-purple-600 rounded-full  text-white font-bold hover:bg-purple-700 text-xs md:text-sm   "
                      onClick={() =>
                        setToggleCreateAnnouncement(!toggleCreateAnnouncement)
                      }
                    >
                      New Announcement
                    </button>
                  </div>
                ) : (
                  <JoinGroupButton />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupCard;
