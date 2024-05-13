import React from "react";
import AnnouncementWrapper from "./AnnouncementWrapper";
import Link from "next/link";

const Annoucement = ({ title, link, name, data }) => {
  return (
    <div className="mt-5">
      <div className="px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-2xl">{name} </h2>
          <h1 className="text-sm">({title})</h1>
        </div>
        <Link href={""} className="text-blue-500 font-bold hover:underline">
          View more
        </Link>
      </div>
      {/* {data?.map((item) => (
        <div key={item.id}>
          <AnnouncementWrapper
            title={item.title}
            description={
              "We are excited to announce the launch of our latest product, the Acme 3000. This revolutionary device will change the way you interact with your home. Learn more about its features and how it can improve your daily life."
            }
          />
        </div>
      ))} */}
    </div>
  );
};

export default Annoucement;
