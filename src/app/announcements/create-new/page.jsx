"use client";
import { AnnouncementCardForm } from "@/components/announcements/AnnouncementCardForm";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CreateNewAnnouncement = () => {
  const searchParams = useSearchParams();
  const group_id = searchParams.get("group_id");
  const [groupData, setGroupData] = useState({})
  useEffect(() => {
    if (group_id) {
      const fetchGroup = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DB_BASE_URL}/group/retrieve/${group_id}/`
          );
          if (!response.ok) return;
          const result = await response.json();
          setGroupData(result);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGroup();
    }
  }, [group_id]);

  return (
    <div className="">
      <AnnouncementCardForm group_id={group_id} group_name={groupData.name} />
    </div>
  );
};

export default CreateNewAnnouncement;
