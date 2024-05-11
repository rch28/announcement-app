"use client";

import { AnnouncementDetails } from "@/components/announcements/announcement-details";
import Cookies from "js-cookie";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const AnnouncementPage = () => {
  const [announcmentData, setAnnouncmentData] = useState({});
  const searchParams = useSearchParams();
  const ann_id = searchParams.get("ann_id");
  const access_token = Cookies.get("access_token");
  useEffect(() => {
    if (!ann_id) {
      redirect("/announcements");
    }
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/announcement/retrieve/${ann_id}/`,
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
  }, []);
  return (
    <div className="p-4">
      <AnnouncementDetails data={announcmentData} />
    </div>
  );
};

export default AnnouncementPage;
