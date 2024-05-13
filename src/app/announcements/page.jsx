"use client";
import { AnnouncementCardForm } from "@/components/announcements/AnnouncementCardForm";
import GroupAnnouncement from "@/components/announcements/GroupAnnouncement";
import { useStore } from "@/stores/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AnnouncementPage = () => {
  const toggleCreateAnnouncement = useStore(
    (state) => state.toggleCreateAnnouncement
  );
  const [GroupList, setGroupList] = useState([]);
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/group/list/`
        );
        if (!response.ok) return;
        const result = await response.json();
        setGroupList(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGroup();
  }, []);

  return (
    <div className="my-5">
      <div>
        {GroupList.results?.map((group) => (
          <div
            key={group.group_id}
            className=" p-2 bg-white shadow-md shadow-gray-300 rounded-md  my-2"
          >
            <div className="px-4 flex flex-col md:flex-row justify-between md:items-center">
              <div className="flex items-center">
                <h2 className="text-2xl">{group.name} </h2>
              </div>
              <Link
                href={`/announcements/${group.name}/announcements-list?group_id=${group.group_id}`}
                className="text-blue-500 font-bold hover:underline flex justify-end"
              >
                View annoucements
              </Link>
            </div>
          </div>
        ))}
      </div>
      {toggleCreateAnnouncement && (
        <div
          className={` fixed top-0 left-0 flex w-screen h-screen justify-center items-center ${
            toggleCreateAnnouncement && "bg-black/30 "
          }`}
        >
          <AnnouncementCardForm selectGroup={true} />
        </div>
      )}
    </div>
  );
};

export default AnnouncementPage;
