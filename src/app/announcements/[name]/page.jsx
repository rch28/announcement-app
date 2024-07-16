"use client";

import { AnnouncementDetails } from "@/components/announcements/announcement-details";
import Comments from "@/components/announcements/Comments";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AnnouncementPage = () => {
  const [announcmentData, setAnnouncmentData] = useState({});
  const [toggle, setToggle] = useState(false);
  const searchParams = useSearchParams();
  const ann_id = searchParams.get("ann_id");
  const access_token = Cookies.get("access_token");
  const toggleCreateAnnouncement = useStore(
    (state) => state.toggleCreateAnnouncement
  );
  useEffect(() => {
    if (!ann_id) {
      redirect("/announcements");
    }
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
  }, [toggleCreateAnnouncement]);
  return (
    <div className="w-full max-w-6xl mx-auto grid md:grid-cols-[1fr_350px] gap-6 p-4 relative">
      <AnnouncementDetails
        data={announcmentData}
        toggle={toggle}
        setToggle={setToggle}
      />

      {/* announcement comment */}

      <Comments />
    </div>
  );
};

export default AnnouncementPage;
