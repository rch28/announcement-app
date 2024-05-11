import React from "react";

const AnnouncementWrapper = ({ title, image, description }) => {
  return (
    <div className="px-10 py-4 ">
      <h1 className="text-2xl tracking-wider mb-2">{title}</h1>
      <p className="text-gray-700 text-pretty indent-10">{description}</p>
      <button className="px-4  my-4 text-xs md:text-sm py-2 bg-purple-700 rounded-full  text-white font-bold hover:bg-purple-900">View Details</button>
    </div>
  );
};

export default AnnouncementWrapper;
