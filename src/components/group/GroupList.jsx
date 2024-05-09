"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useStore } from "@/stores/store";

const GroupList = () => {
  const [groupList, setGroupList] = useState({});
  const toggleCreateGroup = useStore((state) => state.toggleCreateGroup);
  // fetch group
  useEffect(() => {
    const fetchGroup = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/v1/group/list/");

      if (response.ok) {
        const result = await response.json();
        setGroupList(result);
      }
    };

    fetchGroup();
  }, [toggleCreateGroup]);
  return (
    <div>
      {groupList?.count === 0 && (
        <h3 className="p-3 bg-green-200 rounded-xl">
          No group yet!! Create New One
        </h3>
      )}
      <div className="md:grid grid-cols-2 gap-3">
        {groupList?.results?.map((data) => {
          return (
            <Link
              href={`/groups/${data.name}?group_id=${data.group_id}&&category=${data.category}`}
              key={data.group_id}
              className="max-w-xl p-4 "
            >
              <div className="border border-gray-300 rounded-2xl hover:scale-105 transition-all ease-linear shadow-md shadow-fuchsia-300 cursor-pointer p-4">
                <div className="grid gap-6 ">
                  <div className="grid gap-4 ">
                    <Image
                      alt={data?.name || "Group Image"}
                      className="rounded-xl object-cover w-full aspect-[3/2]"
                      height={200}
                      src={data?.image}
                      width={600}
                    />
                    <div className="grid gap-2">
                      <h3 className="text-xl font-bold">{data?.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {data?.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span>{data?.total_members} members</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-300 shadow-sm shadow-slate-200 rounded-full px-3 py-1 text-sm font-medium dark:bg-gray-800">
                          {data?.category}
                        </div>
                      </div>
                    </div>

                    <button className="px-6 py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900">
                      View Group
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GroupList;
