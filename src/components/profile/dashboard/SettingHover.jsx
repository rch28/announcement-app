"use client";
import CardUtil from "@/components/utils/CardUtil";
import { useStore } from "@/stores/store";
import { NotebookPenIcon, NotebookTextIcon, UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const SettingHover = ({ group,SetGroupData }) => {
  const setToggleCreateAnnouncement = useStore(
    (state) => state.setToggleCreateAnnouncement
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={() => {
          setToggleCreateAnnouncement(true);
          SetGroupData(group);
        }}
        className="cursor-pointer hover:bg-gray-300 p-2 rounded-md"
      >
        <CardUtil
          title="Create Announcement"
          icon={
            <NotebookPenIcon className="h-4 w-4 text-purple-700 dark:text-gray-400" />
          }
        />
      </button>
      <Link href={`/announcements/${group.name}/announcements-list?group_id=${group.group_id}`}
        className="cursor-pointer hover:bg-gray-300 p-2 rounded-md"
      >
        <CardUtil
          title="View Announcements"
          icon={
            <NotebookTextIcon className="h-4 w-4 text-purple-700 dark:text-gray-400" />
          }
        />
      </Link>
      <div className="cursor-pointer hover:bg-gray-300 p-2 rounded-md">
        <CardUtil
          title="Manage Members"
          icon={
            <UserPlus className="h-4 w-4 text-purple-700 dark:text-gray-400" />
          }
        />
      </div>
    </div>
  );
};

export default SettingHover;
