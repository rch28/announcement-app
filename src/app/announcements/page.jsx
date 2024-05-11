"use client";
import Annoucement from "@/components/announcements/Annoucement";
import { AnnouncementCardForm } from "@/components/announcements/AnnouncementCardForm";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const AnnouncementPage = () => {
  const [data, setData] = useState([]);
  const toggleCreateAnnouncement = useStore(
    (state) => state.toggleCreateAnnouncement
  );
  const access_token = Cookies.get("access_token");
  useEffect(() => {
    const fetchJoinedGroup = async (url) => {
      try {
        const response = await fetch(
          url,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (!response.ok) {
          console.log("something went wrong!!");
          return;
        }
        const result = await response.json();
        if (result.next) {
          const restData = await fetchJoinedGroup(result.next)
          const allData = [...result.results, ...restData];
          return allData;
        }else{
          return result.results
        }
        
      } catch (error) {
        console.log("something went wrong");
        return []
      }
    };
    const fetchData = async () => {
      const allData = await fetchJoinedGroup("http://127.0.0.1:8000/api/v1/group/joined-by/user/?limit=10&offset=0/");
      setData(allData);

    };
    fetchData()
  }, []);
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
          <AnnouncementCardForm selectGroup={true} userJoinedGroup={data} />
        </div>
      )}
    </div>
  );
};

export default AnnouncementPage;
