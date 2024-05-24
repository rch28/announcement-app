"use client";
import CardUtil from "@/components/utils/CardUtil";
import { useStore } from "@/stores/store";
import {
  NotebookPenIcon,
  NotebookTextIcon,
  UserPlus,
  Users2,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const SettingHover = ({ group, SetGroupData, mode }) => {
  const setToggleCreateAnnouncement = useStore(
    (state) => state.setToggleCreateAnnouncement
  );

  return (
    <div className="w-full">
      {mode === "mygroup" && (
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
                <NotebookPenIcon className="h-4 w-4 text-purple-700" />
              }
            />
          </button>
          <Link
            href={`/announcements/${group.name}/announcements-list?group_id=${group.group_id}`}
            className="cursor-pointer hover:bg-gray-300 p-2 rounded-md"
          >
            <CardUtil
              title="View Announcements"
              icon={
                <NotebookTextIcon className="h-4 w-4 text-purple-700" />
              }
            />
          </Link>
          <Link
            href={`dashboard/manage-announcements?group_id=${group.group_id}`}
            className="cursor-pointer hover:bg-gray-300 p-2 rounded-md"
          >
            <CardUtil
              title="Manage Announcements"
              icon={
                <NotebookTextIcon className="h-4 w-4 text-purple-700" />
              }
            />
          </Link>
          <Link
            href={`/user/profile/dashboard/manage-members/?group_id=${group.group_id}`}
            className="cursor-pointer hover:bg-gray-300 p-2 rounded-md"
          >
            <CardUtil
              title="Manage Members"
              icon={
                <UserPlus className="h-4 w-4 text-purple-700" />
              }
            />
          </Link>
        </div>
      )}
      {/* later check for the role of the user */}
      {mode === "joinedgroup" && (
        <div className="flex flex-col gap-2 w-full">
          <Link
            href={`/announcements/${group.name}/announcements-list?group_id=${group.group_id}`}
            className="cursor-pointer hover:bg-gray-300 p-2 rounded-md"
          >
            <CardUtil
              title="View Announcements"
              icon={
                <NotebookTextIcon className="h-4 w-4 text-purple-700" />
              }
            />
          </Link>
          <div className="cursor-pointer hover:bg-gray-300 p-2 rounded-md">
            <CardUtil
              title="View Members"
              icon={
                <Users2 className="h-4 w-4 text-purple-700" />
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingHover;
