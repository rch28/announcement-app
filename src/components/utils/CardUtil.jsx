import { ChevronRight } from "lucide-react";
import React from "react";

const CardUtil = ({ title, icon }) => {
  return (
    <div className="flex justify-between items-center">
      <p className="flex justify-start items-center gap-2">
        <span>
        {icon}

        </span>
        <span className=" font-medium text-sm ">
        {title}

        </span>
      </p>
      <ChevronRight className="h-4 w-4" />
    </div>
  );
};

export default CardUtil;
