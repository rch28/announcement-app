"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const GroupList = () => {
  const [groupList, setGroupList] = useState();
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
  }, []);
  return (
    <div>
      {groupList?.count === 0 && (
        <h3 className="p-3 bg-green-200 rounded-xl">
          No group yet!! Create New One
        </h3>
      )}
      <div className="md:grid grid-cols-2 gap-3">
        {groupList?.results.map((group) => {
          return (
            <Link href={`/groups/${group.name}`} key={group.group_id} className="max-w-xl p-4 ">
              <div className="border border-gray-300 rounded-2xl hover:scale-105 transition-all ease-linear shadow-md shadow-fuchsia-300 cursor-pointer">
                <div className=" bg-[#5b21b6] px-4  py-2 rounded-t-2xl">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">
                      {group.name}
                    </h1>

                    <h3 className="text-white font-semibold">
                      Members-{group.total_members}
                    </h3>
                  </div>
                  <h4 className="text-md font-semibold text-white/70">
                    {group.category}
                  </h4>
                </div>
                <div className="grid grid-cols-2 p-4 ">
                  <div className="relative w-full h-64">
                    <Image
                      src={group.image}
                      layout="fill"
                      objectFit="cover"
                      alt={group.category}
                      priority
                    />
                  </div>
                  <div className=" text-wrap text-slate-700 font-sans">
                    <p>
                      {group.description}
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Mollitia, necessitatibus doloremque. Eos dolores
                      blanditiis cum sunt aliquid iste incidunt magni
                    </p>
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
