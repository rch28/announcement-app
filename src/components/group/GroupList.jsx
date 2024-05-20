"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useStore } from "@/stores/store";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}
const GroupList = () => {
  const [ZeroGroup, setZeroGroup] = useState(false)
  const [next, setNext] = useState(false);
  const toggleCreateGroup = useStore((state) => state.toggleCreateGroup);
  const announcementGroup = useStore((state) => state.announcementGroup);
  const setAnnouncementGroup = useStore((state) => state.setAnnouncementGroup);
  const selectedCategory = useStore((state) => state.selectedCategory);

  const searchQuery = useStore((state) => state.searchQuery);
  const [inputDelay, setInputDelay] = useState(200);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // fetch group

  const fetchGroup = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/group/list/?category=${selectedCategory}&?${
        next && "limit=10&offset=10"
      }`
    );
    if (response.ok) {
      const result = await response.json();
      if (searchQuery==="") {
      setAnnouncementGroup(result);
      return;
      }
      const filteredResult = {
        ...result, // Copy original metadata
        results: result.results.filter((group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) || group.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      };
      setAnnouncementGroup(filteredResult);

      if(filteredResult.results.length===0){
        setZeroGroup(true)
      }else{
        setZeroGroup(false)
      }
    }
  };
  useEffect(() => {
    const debouncedFetch = debounce(fetchGroup, inputDelay);
    debouncedFetch();
    return () => {
      // Cleanup
    };
  }, [toggleCreateGroup, next, selectedCategory, fetchTrigger, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFetchTrigger((prev) => prev + 1);
    }, inputDelay);
    return () => clearTimeout(timer);
  }, [searchQuery, inputDelay]);


  return (
    <div className="px-6 md:px-0">
      {announcementGroup?.count === 0 && (
        <h3 className="p-3 bg-green-200 rounded-xl">
          No group yet!! Create New One
        </h3>
      )}
      {
        ZeroGroup && (
          <h3 className="p-3 bg-green-200 rounded-xl">
            No group found!!
            </h3>
        )
      }
      <div className="md:grid grid-cols-2 gap-3">
        {announcementGroup?.results?.map((data) => {
          return (
            <Link
              href={`/groups/${data.name.replace(/\s+/g, '-').toLowerCase()}?group_id=${data.group_id}&&category=${data.category}`}
              key={data.group_id}
              className="max-w-xl p-4 "
            >
              <div className="border bg-white border-gray-300 rounded-2xl md:hover:scale-105 transition-all ease-linear shadow-xl shadow-gray-400 cursor-pointer p-4">
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
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-4">
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
      {announcementGroup?.previous &&!searchQuery && (
        <div className="flex justify-start  px-4 my-5">
          <button
            className="bg-purple-700 text-white px-6 py-3  rounded-full font-bold hover:bg-purple-900"
            onClick={() => setNext(!next)}
          >
            Previous
          </button>
        </div>
      )}
      {announcementGroup?.next && !searchQuery && (
        <div className="flex justify-end  px-4 my-5">
          <button
            className="bg-purple-700 text-white px-6 py-3  rounded-full font-bold hover:bg-purple-900"
            onClick={() => setNext(!next)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupList;
