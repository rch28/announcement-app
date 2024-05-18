import DashSidebar from "@/components/profile/dashboard/DashSidebar";
import ProfileNav from "@/components/profile/ProfileNav";
import React from "react";

const layout = ({ children}) => {
  return (
    <div className="p-4">
      <ProfileNav />
      <div className="flex flex-col md:flex-row mt-4 gap-4">
        <div className="flex-[0.3]  ">
            <DashSidebar />
        </div>

        <div className="flex-1 ">
            {children}
        
        </div>
      </div>
    </div>
  );
};

export default layout;
