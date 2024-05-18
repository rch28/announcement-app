import CardUtil from "@/components/utils/CardUtil";
import { UserPlus, Users } from "lucide-react";
import React from "react";

const SettingHover = ({id}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="cursor-pointer hover:bg-gray-300 p-2 rounded-md" >
        <CardUtil
          title="View Members"
          icon={<Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
        />
      </div>
      <div className="cursor-pointer hover:bg-gray-300 p-2 rounded-md">
        <CardUtil
          title="Manage Members"
          icon={
            <UserPlus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          }
        />
      </div>
    </div>
  );
};

export default SettingHover;
