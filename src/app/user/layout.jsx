import ProfileNav from "@/components/profile/ProfileNav";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <ProfileNav />

      {children}
    </div>
  );
};

export default layout;
