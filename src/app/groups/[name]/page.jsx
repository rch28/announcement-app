"use client";
import AnnouncementCard from "@/components/announcements/AnnouncementCard";
import { AnnouncementCardForm } from "@/components/announcements/AnnouncementCardForm";
import CreateGroup from "@/components/group/CreateGroup";
import GroupCard from "@/components/group/GroupCard";
import PopUpWrapper from "@/components/PopUpWrapper";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const GroupPage = () => {
  const searchParams = useSearchParams();
  const group_id = searchParams.get("group_id");
  const [data, setData] = useState({});
  const [groupAdminInfo, setGroupAdminInfo] = useState();
  const [announcmentData, setAnnouncmentData] = useState({});

  const access_token = Cookies.get("access_token");
  const setGroupAdmin = useStore((state) => state.setGroupAdmin);
  const joined = useStore((state) => state.Joined);
  const toggleRating = useStore((state) => state.toggleRating);
  const toggleCreateGroup = useStore((state) => state.toggleCreateGroup);
  const toggleCreateAnnouncement = useStore(
    (state) => state.toggleCreateAnnouncement
  );
  const userAuthentiated = useStore((state) => state.userAuthenticated);
  useEffect(() => {
    if (!group_id) {
      redirect("/groups");
    }
    const fetchGroup = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/group/retrieve/${group_id}/`
        );
        if (response.ok) {
          const result = await response.json();
          if (result?.members?.length > 0) {
            result.members.forEach(async (member) => {
              const fetchMembers = await fetch(
                `http://127.0.0.1:8000/api/v1/user/retrieve/${member}/`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                  },
                }
              );
              if (fetchMembers.ok) {
                const memberData = await fetchMembers.json();
              }
            });
          }
          const res = await fetch(
            `http://127.0.0.1:8000/api/v1/user/retrieve/${result?.admin_id}/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          if (res.ok) {
            const result = await res.json();
            setGroupAdmin(result);
            setGroupAdminInfo(result);
          }
          setData(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGroup();
  }, [access_token, joined, toggleRating]);
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/announcement/list/group/${group_id}/?limit=3`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();
        setAnnouncmentData(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAnnouncement();
  }, [toggleCreateAnnouncement, group_id]);
  return (
    <div className="p-5">
      <GroupCard data={data} groupAdminInfo={groupAdminInfo} />
      <div className="mt-10">
        <h1 className="text-2xl font-bold md:text-4xl">What we're about?</h1>
        <p className="py-4">{data?.description}</p>
      </div>

      {/* Edit the group information */}
      {toggleCreateGroup && (
        <PopUpWrapper>
          <CreateGroup mode="edit" data={data} />
        </PopUpWrapper>
      )}
      {/* Create an announcement */}
      {toggleCreateAnnouncement && (
        <PopUpWrapper>
          <AnnouncementCardForm group_id={group_id} />
        </PopUpWrapper>
      )}

      {/* Our annnouncement */}
      {!userAuthentiated ? (
        <Link
          href={"/auth/login"}
          className="inline-flex h-10 items-center justify-center rounded-full bg-purple-700 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-purple-800 focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 dark:bg-[#805AD5] dark:text-gray-900 dark:hover:bg-purple-800/90 dark:focus-visible:ring-[#805AD5]"
        >
          Login to view the annoucements!!!
        </Link>
      ) : announcmentData.count > 0 && joined ? (
        <div className="mt-10">
          <h1 className="text-3xl md:text-4xl font-bold py-6">
            Our Recent Announcements
          </h1>

          <AnnouncementCard data={announcmentData?.results} />
          <div className="flex justify-end items-center">
            <Link
              href={`/announcements/${data?.name}/announcements-list?group_id=${data?.group_id}&&category=${data?.category}`}
              className="inline-flex h-10 items-center justify-center rounded-full bg-purple-700 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-purple-800 focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 dark:bg-[#805AD5] dark:text-gray-900 dark:hover:bg-purple-800/90 dark:focus-visible:ring-[#805AD5] my-5"
            >
              View all
            </Link>
          </div>
        </div>
      ) : (
        <p className="py-4 bg-white px-6 font-semibold">
          No announcement here!! or your are not joined in group
        </p>
      )}
    </div>
  );
};

export default GroupPage;
