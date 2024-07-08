"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Globe, GlobeLock, Users } from "lucide-react";
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
  const [ZeroGroup, setZeroGroup] = useState(false);
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
      `${
        process.env.NEXT_PUBLIC_DB_BASE_URL
      }/group/list/?category=${selectedCategory}&?${
        next && "limit=10&offset=10"
      }`
    );
    if (response.ok) {
      const result = await response.json();
      if (searchQuery === "") {
        setAnnouncementGroup(result);
        return;
      }
      const filteredResult = {
        ...result, // Copy original metadata
        results: result.results.filter(
          (group) =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.category.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      };
      setAnnouncementGroup(filteredResult);

      if (filteredResult.results.length === 0) {
        setZeroGroup(true);
      } else {
        setZeroGroup(false);
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
    <div className="px-6 md:px-0 min-h-96">
      {announcementGroup?.count === 0 && (
        <h3 className="p-3 bg-green-200 rounded-xl  dark:text-black dark:bg-green-100">
          No group yet!! Create New One
        </h3>
      )}
      {ZeroGroup && (
        <h3 className="p-3 bg-green-200 rounded-xl dark:text-black dark:bg-green-100">
          No group found!!
        </h3>
      )}
      <div className="md:grid grid-cols-2 gap-3">
        {announcementGroup?.results?.map((data) => {
          return (
            <Link
              href={`/groups/${data.name
                .replace(/\s+/g, "-")
                .toLowerCase()}?group_id=${data.group_id}&&category=${
                data.category
              }`}
              key={data.group_id}
              className="max-w-xl p-4 "
            >
              <div className="border bg-white dark:bg-gray-950 border-gray-300 dark:border-none rounded-2xl md:hover:scale-105 transition-all ease-linear shadow-xl shadow-gray-400 dark:shadow-sm dark:shadow-gray-800   cursor-pointer p-4">
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
                      <div className="flex gap-2 items-center">
                        <div className="flex-1 flex gap-2 items-center">
                          <h3 className=" text-lg md:text-xl font-bold">
                            {data?.name}
                          </h3>
                          {data?.group_type === "public" ? (
                            <p
                              className="flex justify-center  items-end"
                              title="public"
                            >
                              <Globe className="w-3 h-3 " />
                            </p>
                          ) : (
                            <GlobeLock className="w-3 h-3 " />
                          )}
                        </div>

                        <div className="bg-purple-300 flex items-center justify-end gap-2 px-2 rounded-full  dark:bg-slate-600">
                          <Users className="w-3 h-3 " />
                          <span className="text-sm">{data?.total_members}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-200 line-clamp-3">
                        {data?.description}
                      </p>
                     
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-300 shadow-sm shadow-slate-200 dark:shadow-none rounded-full px-3 py-1.5 text-sm font-medium dark:bg-gray-800 capitalize">
                          {data?.category}
                        </div>
                      </div>
                    </div>

                    <button className="px-3 md:px-4 py-1.5 md:p-2  bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900 text-sm md:">
                      View Group
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {announcementGroup?.previous && !searchQuery && (
        <div className="flex justify-start  px-4 my-5">
          <button
            className="bg-purple-700 text-white px-4 py-2 text-sm  rounded-full font-bold hover:bg-purple-900"
            onClick={() => setNext(!next)}
          >
            Previous
          </button>
        </div>
      )}
      {announcementGroup?.next && !searchQuery && (
        <div className="flex justify-end  px-4 my-5">
          <button
            className="bg-purple-700 text-white px-4 py-2 text-sm  rounded-full font-bold hover:bg-purple-900"
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
