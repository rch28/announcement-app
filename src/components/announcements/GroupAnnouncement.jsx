"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Annoucement from "./Annoucement";

const GroupAnnouncement = ({ id, name }) => {
  const access_token = Cookies.get("access_token");
  const [announcementList, setAnnouncementList] = useState({});
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/announcement/list/group/${id}/?limit=3/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (!response.ok) return;
        const result = await response.json();
        setAnnouncementList(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnnouncement();
  }, [id]);
  if (!announcementList) return null;
  if (announcementList.count === 0) {
    return ;
  }

  return (
    <div>
      <Annoucement title={"Latest"} name={name} />
      <Annoucement title={"Past"} name={name} />
    </div>
  );
};

export default GroupAnnouncement;
