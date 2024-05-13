"use client";
import AnnouncementCard from "@/components/announcements/AnnouncementCard";
import { AnnouncementCardForm } from "@/components/announcements/AnnouncementCardForm";
import CreateGroup from "@/components/group/CreateGroup";
import GroupCard from "@/components/group/GroupCard";
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
        <h1 className="text-4xl">What we're about?</h1>
        <p className="py-4">{data?.description}</p>
      </div>

      {/* Edit the group information */}
      {toggleCreateGroup && (
        <div
          className={` fixed top-0 left-0 z-20 flex w-screen h-screen justify-center items-center ${
            toggleCreateGroup && "bg-black/30 "
          }`}
        >
          <CreateGroup mode="edit" data={data} />
        </div>
      )}
      {/* Create an announcement */}
      {toggleCreateAnnouncement && (
        <div
          className={` fixed top-0 left-0 flex w-screen h-screen justify-center items-center ${
            toggleCreateAnnouncement && "bg-black/30 "
          }`}
        >
          <AnnouncementCardForm group_id={group_id}  />
        </div>
      )}

      {/* Our annnouncement */}
      {announcmentData.count>0 ? (
        <div className="mt-10">
          <h1 className="text-4xl font-bold py-6">Our Recent Announcements</h1>
          {!userAuthentiated && (
            <Link href={"/auth/login"} className="text-red-400 hover:underline">
              Login to view the annoucements!!!
            </Link>
          )}
          <AnnouncementCard data={announcmentData?.results} />
        </div>
      ):"No announcement yet!!"
      }
    </div>
  );
};

export default GroupPage;
