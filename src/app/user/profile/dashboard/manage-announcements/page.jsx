"use client";

import { AnnouncementCardForm } from "@/components/announcements/AnnouncementCardForm";
import PopUpWrapper from "@/components/PopUpWrapper";
import { Label } from "@/components/ui/label";
import { fetchAllData, GetAccessToken } from "@/index";
import { useStore } from "@/stores/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ManageAnnouncements = () => {
  const searchParams = useSearchParams();
  const [groupId, setGroupId] = useState("");
  const [usersGroup, setUsersGroup] = useState(null);
  const [announcementList, setAnnouncementList] = useState(null);

  const [ann_data, setAnn_data] = useState(null);
  const [ann_id, setAnn_id] = useState("");
  const toggleCreateAnnouncment = useStore(
    (state) => state.toggleCreateAnnouncement
  );
  const setToggleCreateAnnouncement = useStore(
    (state) => state.setToggleCreateAnnouncement
  );
  const access_token = GetAccessToken();
  const gid = searchParams.get("group_id");
  useEffect(() => {
    const fetchGroup = async () => {
      const allData = await fetchAllData(
        "http://127.0.0.1:8000/api/v1/group/created-by/user/"
      );
      setUsersGroup(allData);
      if (gid) {
        setGroupId(gid);
      } else {
        setGroupId(allData[0].group_id);
      }
    };
    fetchGroup();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (!groupId) {
        return;
      }
      const allData = await fetchAllData(
        `http://127.0.0.1:8000/api/v1/announcement/list/group/${groupId}/`
      );
      setAnnouncementList(allData);
    };
    fetchData();
  }, [groupId, toggleCreateAnnouncment]);
  useEffect(() => {
    const fetchData = async () => {
      if (!ann_id) {
        return;
      }
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
        setAnn_data(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [ann_id, toggleCreateAnnouncment]);
  return (
    <div>
      <div className="md:space-y-2">
        <Label htmlFor="payment-method">Select Group</Label>

        <select
          name="group_name"
          id="group_name "
          className="block w-full p-3 text-gray-700  bg-white border border-gray-500  focus:border-purple-500 rounded-md focus:outline-none text-sm font-semibold appearance-auto "
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        >
          <option value="">Select group</option>
          {usersGroup?.map((group) => (
            <option
              key={group.group_id}
              value={group.group_id}
              className="text-blcak "
            >
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <div className="my-4">
        {announcementList?.length === 0 && (
          <h1 className="text-sm font-medium p-4">No Annoincement yet!!</h1>
        )}
        {announcementList?.length > 0 && (
          <div>
            <h1 className="text-sm font-medium">Group Annoucements</h1>
            {announcementList?.map((ann) => (
              <div key={ann.id}>
                <div className="flex items-center justify-between p-3 bg-white shadow-md shadow-gray-400 my-3 rounded-lg border hover:border hover:border-purple-700">
                  <Link
                    href={`/announcements/${ann.title
                      .replace(/\s+/g, "-")
                      .toLowerCase()}?ann_id=${ann.id}`}
                  >
                    <span className="capitalize text-sm font-medium text-opacity-90 text-black">
                      {ann.title}
                    </span>
                  </Link>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setToggleCreateAnnouncement(true);
                        setAnn_id(ann.id);
                      }}
                    >
                      <span className="capitalize text-sm font-bold text-opacity-90 text-purple-600 hover:text-purple-700 hover:underline">
                        Edit
                      </span>
                    </button>
                    <button>
                      <span className="capitalize text-sm font-bold text-opacity-90 text-red-600 hover:text-red-700 hover:underline">
                        Delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {toggleCreateAnnouncment && (
        <PopUpWrapper>
          <AnnouncementCardForm ann_data={ann_data} redirect={false} />
        </PopUpWrapper>
      )}
    </div>
  );
};

export default ManageAnnouncements;
