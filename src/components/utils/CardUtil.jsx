import { ChevronRight } from "lucide-react";
import React from "react";

const CardUtil = ({ title, icon }) => {
  return (
    <div className="flex justify-between items-center">
      <p className="flex justify-start items-center gap-2">
        <span>
        {icon}

        </span>
        <span className="text-gray-700 font-medium text-sm sm:text-base">
        {title}

        </span>
      </p>
      <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </div>
  );
};

export default CardUtil;
