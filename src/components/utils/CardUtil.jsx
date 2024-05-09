import { ChevronRight } from "lucide-react";
import React from "react";

const CardUtil = ({ title, icon }) => {
  return (
    <div className="flex justify-between items-center">
      <p className="flex justify-start items-center gap-2">
        <span>
        {icon}

        </span>
        <span className="text-gray-500 font-medium">
        {title}

        </span>
      </p>
      <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    </div>
  );
};

export default CardUtil;
