"use client";
import Annoucement from "@/components/announcements/Annoucement";
import { AnnouncementCardForm } from "@/components/announcements/AnnouncementCardForm";
import { useStore } from "@/stores/store";
import React, { useEffect, useState } from "react";

const AnnouncementPage = () => {
  const toggleCreateAnnouncement = useStore(
    (state) => state.toggleCreateAnnouncement
  );
 
  return (
    <div className="my-5">
      <div>
        <Annoucement title={"Latest Announcement"} />
        <Annoucement title={"Past Announcement"} />
      </div>
      {toggleCreateAnnouncement && (
        <div
          className={` fixed top-0 left-0 flex w-screen h-screen justify-center items-center ${
            toggleCreateAnnouncement && "bg-black/30 "
          }`}
        >
          <AnnouncementCardForm selectGroup={true} />
        </div>
      )}
    </div>
  );
};

export default AnnouncementPage;
