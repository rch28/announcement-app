import React from "react";
import { logo } from "../../../public";
import Image from "next/image";
import Link from "next/link";
import RichTextDisplay from "../layout/RichTextDisplay";

const AnnouncementCard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map((announcement) => {
        return (
          <Link
            href={`/announcements/${announcement.title
              .replace(/\s+/g, "-")
              .toLowerCase()}/?ann_id=${announcement.id}`}
            key={announcement.id}
            className="border border-gray-300 rounded-2xl hover:scale-105 shadow-md shadow-gray-500 cursor-pointer p-4 bg-white dark:bg-gray-950 dark:border-gray-600 dark:shadow-md dark:shadow-gray-800 transition-all ease-linear"
          >
            <div className="grid gap-6 ">
              <div className="grid gap-4 ">
                {announcement?.image && (
                  <Image
                    alt={announcement?.title || "Announcement Image"}
                    className="rounded-xl object-cover w-full aspect-[3/2]"
                    height={200}
                    src={announcement?.image}
                    width={600}
                  />
                )}
                {!announcement?.image && (
                  <Image
                    alt={"Announcement Image"}
                    className="rounded-xl object-cover w-full aspect-[3/2]"
                    height={200}
                    src={logo}
                    width={600}
                  />
                )}

                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">{announcement?.title}</h3>
                  <div className="text-sm text-gray-700 dark:text-gray-400 line-clamp-3">
                    <RichTextDisplay html={announcement?.description} />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900 text-xs">
                  View Announcement
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AnnouncementCard;
