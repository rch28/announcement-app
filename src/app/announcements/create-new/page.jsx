"use client";
import { AnnouncementCardForm } from "@/components/announcements/AnnouncementCardForm";
import { GetAccessToken } from "@/index";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CreateNewAnnouncement = () => {
  const searchParams = useSearchParams();
  const group_id = searchParams.get("group_id");
  const edit = searchParams.get("edit")
  const ann_id = searchParams.get("ann_id")
  const [groupData, setGroupData] = useState({})
  const [announcmentData, setAnnouncmentData] = useState({});

  const access_token = GetAccessToken()
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

  useEffect(()=>{
    
    if (edit && ann_id){
      
      const fetchAnnouncement = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DB_BASE_URL}/announcement/retrieve/${ann_id}/`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          if (!response.ok) {
            console.log("Something went wrong!!");
            return;
          }
          const result = await response.json();
          setAnnouncmentData(result);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAnnouncement();
    }

  },[edit, ann_id])

  return (
    <div className="">
      <AnnouncementCardForm group_id={group_id} group_name={groupData.name}  ann_data={announcmentData} />
    </div>
  );
};

export default CreateNewAnnouncement;
