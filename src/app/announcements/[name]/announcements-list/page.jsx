"use client";
import AnnouncementCard from "@/components/announcements/AnnouncementCard";
import { AnnouncementCardForm } from "@/components/announcements/AnnouncementCardForm";
import PopUpWrapper from "@/components/PopUpWrapper";
import { fetchAllData, fetchGroup } from "@/index";
import { useStore } from "@/stores/store";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AnnouncementListOfGroup = () => {
  const searchParams = useSearchParams();
  const group_id = searchParams.get("group_id");
  const [annoucementData, setAnnoucementData] = useState(null);
  const toggleCreateAnnouncement = useStore(
    (state) => state.toggleCreateAnnouncement
  );
  const [group, setGroup] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const allData = await fetchAllData(
        `http://127.0.0.1:8000/api/v1/announcement/list/group/${group_id}/`
      );
      setAnnoucementData(allData);
      const groupData = await fetchGroup(group_id);
      setGroup(groupData);
    };
    fetchData();
  }, [group_id]);
  return (
    <div className="p-4">
      <div className="py-4">
        <h1 className="text-3xl">{group?.name}</h1>
        <h1 className="px-1">All announcement</h1>
      </div>
      <AnnouncementCard data={annoucementData} />

      {toggleCreateAnnouncement && (
        <PopUpWrapper>
          <AnnouncementCardForm selectGroup={true} />

        </PopUpWrapper>
      )}
    </div>
  );
};

export default AnnouncementListOfGroup;
