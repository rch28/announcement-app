"use client";
import Image from "next/image";
import { User } from "lucide-react";
import Avatar from "react-avatar";
import { bgimg } from "../../../public";
import JoinGroupButton from "./JoinGroupButton";
import { useStore } from "@/stores/store";
import Rating from "./Rating";
const GroupCard = ({ data, groupAdminInfo }) => {
  const userAuthenticated= useStore((state)=>state.userAuthenticated)
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
            <div className="flex flex-col gap-4 justify-between border border-gray-300 p-4 rounded-xl">
              <div className="flex flex-col gap-2 max-w-96 ">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium dark:bg-gray-800 text-gray-600 capitalize">
                    {data?.category}
                  </div>
                  <Rating rating={data?.average_rating} />
                </div>
                <h3 className="text-3xl font-bold">{data?.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {data?.description}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />

                  <span>{data?.total_members} members</span>
                </div>
              </div>
              <div className="flex justify-between items-center pr-1 lg:pr-4">
                {groupAdminInfo !== undefined && (
                  <div className="flex items-center gap-4 ">
                    <Avatar
                      name={`${groupAdminInfo?.first_name} ${groupAdminInfo?.last_name}`}
                      size="60"
                      round={true}
                      color="rgb(126 34 206 )"
                    />
                    <div className="text-sm">
                      <p className="font-medium capitalize flex gap-2">
                        <span>{groupAdminInfo?.first_name}</span>
                        <span>{groupAdminInfo?.last_name}</span>
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">Admin</p>
                    </div>
                  </div>
                )}
                {isGrupAdmin && userAuthenticated ? (
                  <div>
                    <button
                      className="px-6 py-2 bg-purple-600 rounded-full  text-white font-bold hover:bg-purple-700 text-xs md:text-sm   lg:text-lg"
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
