"use client";
import Image from "next/image";
import { Globe, GlobeLock, User } from "lucide-react";
import Avatar from "react-avatar";
import { bgimg } from "../../../public";
import JoinGroupButton from "./JoinGroupButton";
import { useStore } from "@/stores/store";
import Rating from "./Rating";
const GroupCard = ({ data, groupAdminInfo }) => {
  const userAuthenticated = useStore((state) => state.userAuthenticated);
  const isGrupAdmin = useStore((state) => state.isGrupAdmin);
  const toggleCreateAnnouncement = useStore(
    (state) => state.toggleCreateAnnouncement
  );
  const setToggleCreateAnnouncement = useStore(
    (state) => state.setToggleCreateAnnouncement
  );
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
                  {
                    data?.location &&(
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        <span className="font-semibold"></span> {data?.location} Bharatpur, Chitwan Nepal
                      </p>
                    )
                  }
                </div>
                <div className="flex items-center gap-2">
                  {data?.group_type === "public" ? (
                    <p
                      className="flex justify-center items-center gap-1"
                      title="public"
                    >
                      <Globe className="w-4 h-4 " />
                      <span className="text-xs px-2 py-0.5 bg-purple-300 dark:bg-gray-800  rounded-full">
                        Public
                      </span>
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
                {groupAdminInfo !== undefined && (
                  <div className="flex items-center gap-2">
                    {groupAdminInfo?.image ? (
                      <Image
                        src={groupAdminInfo?.image}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Avatar
                        name={`${groupAdminInfo?.first_name} ${groupAdminInfo?.last_name}`}
                        size="50"
                        className="text-xs md:text-sm h-12 w-12"
                        round={true}
                        color="rgb(126 34 206 )"
                      />
                    )}
                    <div className="text-xs md:text-sm">
                      <p className="font-medium capitalize flex gap-2">
                        <span>{groupAdminInfo?.first_name}</span>
                        <span className="hidden md:flex">
                          {groupAdminInfo?.last_name}
                        </span>
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">Admin</p>
                    </div>
                  </div>
                )}
                {isGrupAdmin && userAuthenticated ? (
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
