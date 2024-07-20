"use client";

import { AnnouncementCardForm } from "@/components/announcements/AnnouncementCardForm";
import PopUpWrapper from "@/components/PopUpWrapper";
import { Label } from "@/components/ui/label";
import DeleteConfirm from "@/components/utils/DeleteConfirm";
import { fetchAllData, fetchGroup, GetAccessToken } from "../../../../../index";
import { useStore } from "@/stores/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageAnnouncements = () => {
  const searchParams = useSearchParams();
  const [groupId, setGroupId] = useState("");
  const [groupData, setGroupData] = useState(null);
  const [usersGroup, setUsersGroup] = useState(null);
  const [announcementList, setAnnouncementList] = useState(null);
  const [editMode, setEditMode] = useState(true);
  const [ann_data, setAnn_data] = useState(null);
  const [ann_id, setAnn_id] = useState("");

  const [deleteToggle, setDeleteToggle] = useState(false);
  const toggleCreateAnnouncment = useStore(
    (state) => state.toggleCreateAnnouncement
  );
  const setToggleCreateAnnouncement = useStore(
    (state) => state.setToggleCreateAnnouncement
  );
  const access_token = GetAccessToken();
  const gid = searchParams.get("group_id");
  const userData = useStore((state) => state.userData);
  useEffect(() => {
    const fetchUserCreatedGroup = async () => {
      const allData = await fetchAllData(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/group/created-by/user/`
      );
      setUsersGroup(allData);
      if (gid) {
        setGroupId(gid);
      } else {
        setGroupId(allData[0].group_id);
      }
    };
    fetchUserCreatedGroup();
  }, []);

  useEffect(() => {
    const fetchGroupData = async () => {
      if (!groupId) return;
      const groupData = await fetchGroup(groupId);
      setGroupData(groupData);
    };
    fetchGroupData();
  }, [groupId]);

  useEffect(() => {
    const fetchAnnouncementforGroup = async () => {
      if (!groupId) {
        return;
      }
      const allData = await fetchAllData(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/announcement/list/group/${groupId}/`
      );
      setAnnouncementList(allData);
    };
    fetchAnnouncementforGroup();
  }, [groupId, toggleCreateAnnouncment,deleteToggle]);

  useEffect(() => {
    const fetchAnnouncement = async () => {
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
    fetchAnnouncement();
  }, [ann_id, toggleCreateAnnouncment]);

  const handleDelete = () => {
    const newPromise = new Promise(async (resolve, reject) => {
      if (!ann_id) return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/announcement/delete/${ann_id}/`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.ok) {
        setDeleteToggle(false)
        resolve();
      } else {
        const result = await response.json();
        reject(result);
      }
    });
    toast.promise(newPromise, {
      loading: "Deleting announcement...",
      success: "Announcement deleted successfully!",
      error: (data) => data.errors[0].detail || "Failed to delete announcement",
    });
  };
  return (
    <div className="min-h-[26rem]">
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
        <div className="flex justify-end">
          <button
            onClick={() => {
              setToggleCreateAnnouncement(true);
              setEditMode(false);
            }}
            className="px-4 text-xs md:text-sm py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-90"
          >
            Create announcement
          </button>
        </div>
        {announcementList?.length > 0 && (
          <div>
            <h1 className="text-sm font-medium">Group Annoucements</h1>
            {announcementList?.map((ann) => (
              <div key={ann.id}>
                <div className="flex items-center justify-between p-3 bg-white shadow-md shadow-gray-400 my-3 rounded-lg border dark:shadow-none hover:border hover:border-purple-700">
                  <Link
                    href={`/announcements/${ann.title
                      .replace(/\s+/g, "-")
                      .toLowerCase()}?ann_id=${ann.id}`}
                  >
                    <span className="capitalize text-sm font-medium text-opacity-90 text-black hover:underline">
                      {ann.title}
                    </span>
                  </Link>
                  <div className="flex gap-4">
                    {userData?.id === ann.admin && (
                      <button
                        onClick={() => {
                          setToggleCreateAnnouncement(true);
                          setAnn_id(ann.id);
                          setEditMode(true);
                        }}
                      >
                        <span className="capitalize text-sm font-bold text-opacity-90 text-purple-600 hover:text-purple-700 hover:underline">
                          Edit
                        </span>
                      </button>
                    )}
                    {groupData?.admin_id === userData.id && (
                      <button
                        onClick={() => {
                          setDeleteToggle(true);
                          setAnn_id(ann.id);
                        }}
                      >
                        <span className="capitalize text-sm font-bold text-opacity-90 text-red-600 hover:text-red-700 hover:underline">
                          Delete
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {toggleCreateAnnouncment && editMode && (
        <PopUpWrapper>
          <AnnouncementCardForm ann_data={ann_data} redirect={false} />
        </PopUpWrapper>
      )}
      {toggleCreateAnnouncment && !editMode && (
        <PopUpWrapper>
          <AnnouncementCardForm group_id={groupId} />
        </PopUpWrapper>
      )}
      {deleteToggle && (
        <PopUpWrapper>
          <DeleteConfirm title={"Delete Announcement"}>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteToggle(!deleteToggle)}
                className="px-6 py-2 bg-purple-600 rounded-full text-white font-bold hover:bg-purple-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 rounded-full text-white font-bold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </DeleteConfirm>
        </PopUpWrapper>
      )}
    </div>
  );
};

export default ManageAnnouncements;
