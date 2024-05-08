"use client";
import GroupCard from "@/components/group/GroupCard";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const GroupPage = () => {
  const searchParams = useSearchParams();
  const group_id = searchParams.get("group_id");
  const [data, setData] = useState({});
  const access_token = Cookies.get("access_token");
  const [groupAdminInfo, setGroupAdminInfo] = useState();
  const setGroupAdmin= useStore(state=>state.setGroupAdmin)
  useEffect(() => {
    const fetchGroup = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/group/retrieve/${group_id}/`
      );
      if (response.ok) {
        const result = await response.json();
        const res = await fetch(
          `http://127.0.0.1:8000/api/v1/user/retrieve/${result?.admin_id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (res.ok) {
          const result = await res.json();
          setGroupAdmin(result)
          setGroupAdminInfo(result);
        }
        setData(result);
      }
    };
    fetchGroup();
  }, [access_token]);
  return (
    <div className="p-5">
     
      <GroupCard data={data} groupAdminInfo={groupAdminInfo} />
      <div className="mt-10">
        <h1 className="text-4xl">What we're about?</h1>
        <p className="py-4">
          {data?.description}
          
        </p>
      </div>
      <div className="mt-10">
        <h1 className="text-4xl font-bold">Our announcements</h1>
      </div>
    </div>
  );
};

export default GroupPage;
