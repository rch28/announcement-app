"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Annoucement from "./Annoucement";

const GroupAnnouncement = ({ id, name }) => {
  const access_token = Cookies.get("access_token");
  const [announcementList, setAnnouncementList] = useState(null);
  const [recentAnn, setRecentAnn] = useState([]);
  const [pastAnn, setPastAnn] = useState([]);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_BASE_URL}/announcement/list/group/${id}/?limit=3/`,
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

  useEffect(() => {
    if (announcementList) {
      const recent = [];
      const past = [];
      announcementList.results.forEach((item) => {
        // get date
        const date = new Date();
        const millisecondsInDay = 1000 * 60 * 60 * 24;
        const dateTime = new Date(item.created_at);
        const dateDiff = Math.floor((date - dateTime) / millisecondsInDay);
        if (dateDiff < 1) {
          recent.push(item);
        } else {
          past.push(item);
        }
      });
      if (recent.length > 0) {
        setRecentAnn(recent);
      }
      if (past.length > 0) {
        setPastAnn(past);
      }
    }
  }, [announcementList]);
 

  return (
    <div>
      <Annoucement title={"Latest"} name={name} data={recentAnn} />
    </div>
  );
};

export default GroupAnnouncement;
