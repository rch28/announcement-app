"use client";
import PopUpWrapper from "@/components/PopUpWrapper";
import GroupCard from "@/components/profile/dashboard/GroupCard";
import DeleteConfirm from "@/components/utils/DeleteConfirm";
import { fetchAllData } from "@/index";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [switchGroup, setSwitchGroup] = useState(true);
  const [data, setData] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(false);
  useEffect(() => {
    const fetchGroup = async () => {
      const allData = await fetchAllData(
        "http://127.0.0.1:8000/api/v1/group/created-by/user/"
      );
      setData(allData);
    };
    fetchGroup();
  }, []);
  const handleDeleteGroup = ()=>{
    console.log("delete");
  }
  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-300 shadow-xl rounded-xl ">
        <button
          onClick={() => setSwitchGroup(true)}
          className={`bg-white  p-3 text-center cursor-pointer transition-all ease-linear duration-100  ${
            switchGroup
              ? "flex-1 rounded-xl"
              : "md:flex-[.4] bg-gray-300 rounded-l-xl"
          }`}
        >
          <h1 className="font-medium text-sm">My Groups</h1>
        </button>
        <button
          onClick={() => setSwitchGroup(false)}
          className={`  p-3 text-center cursor-pointer  transition-all ease-linear duration-100  ${
            switchGroup
              ? "md:flex-[.4] bg-gray-300  rounded-r-xl"
              : "flex-1 bg-white  rounded-xl "
          }`}
        >
          <h1 className="font-medium text-sm">Joined Groups</h1>
        </button>
      </nav>
      <div className="flex-1  min-h-80 rounded-xl mt-4 ">
        {switchGroup ? (
          <div className="  grid md:grid-cols-2 gap-6 ">
            {data?.map((group) => (
              <GroupCard
                group={group}
                key={group.group_id}
                setDeleteToggle={setDeleteToggle}
              />
            ))}
          </div>
        ) : (
          <p>Joined</p>
        )}
      </div>

      {deleteToggle && (
        <PopUpWrapper>
          <DeleteConfirm title={"Delete Group"}>
            <div className="flex gap-4 ">
              <button
                onClick={() => setDeleteToggle(!deleteToggle)}
                className="px-6 py-2 bg-gray-600 rounded-full  text-white font-bold hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteGroup}
                className="px-6 py-2 bg-red-600 rounded-full  text-white font-bold hover:bg-red-700"
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

export default Dashboard;
