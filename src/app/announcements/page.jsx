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
    <div className="m-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GroupList?.results?.map((group) => (
          <div
            key={group.group_id}
            className="bg-white shadow-md shadow-purple-200 rounded-xl my-2 p-4"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{group.name}</h2>
                <p className="text-gray-600">{group.description}</p>
              </div>
              <div className="mt-4 flex justify-end items-center">
                <Link
                  href={`/announcements/${group.name}/announcements-list?group_id=${group.group_id}`}
                  passHref
                  className="text-blue-500 font-bold hover:underline"
                >
                  View Announcements
                </Link>
                {/* Add additional actions/buttons here if needed */}
              </div>
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
