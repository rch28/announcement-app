"use client";

import { AnnouncementDetails } from "@/components/announcements/announcement-details";
import { AnnouncementCardForm } from "@/components/announcements/AnnouncementCardForm";
import AnnSettingCard from "@/components/announcements/AnnSettingCard";
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
  }, [toggleCreateAnnouncement]);
  return (
    <div className="w-full max-w-6xl mx-auto grid md:grid-cols-[1fr_350px] gap-6 p-4 relative">
      <AnnouncementDetails
        data={announcmentData}
        toggle={toggle}
        setToggle={setToggle}
      />

      {/* Edit an announcement */}
      {toggleCreateAnnouncement && (
        <div
          className={`z-50 fixed top-0 left-0 flex w-screen h-screen justify-center items-center ${
            toggleCreateAnnouncement && "bg-black/30 "
          }`}
        >
          <AnnouncementCardForm
            ann_data={announcmentData}
            setToggle={setToggle}
          />
        </div>
      )}

      {/* announcement comment */}

      <Comments />
    </div>
  );
};

export default AnnouncementPage;
