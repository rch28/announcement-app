import React from "react";
import AnnouncementWrapper from "./AnnouncementWrapper";
import Link from "next/link";

const Annoucement = ({title,link}) => {
  return (
    <div className="mt-5">
      <div className="px-4 flex justify-between items-center">
        <h1 className="text-xl">{title}</h1>
        <Link href={""} className="text-blue-500 font-bold hover:underline">
          View more
        </Link>
      </div>
      <AnnouncementWrapper
        title={"New Product Launch"}
        description={
          "We are excited to announce the launch of our latest product, the Acme 3000. This revolutionary device will change the way you interact with your home. Learn more about its features and how it can improve your daily life."
        }
      />
    </div>
  );
};

export default Annoucement;
