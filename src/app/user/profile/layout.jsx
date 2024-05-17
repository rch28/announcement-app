import EditProfileImg from "@/components/profile/EditProfileImg";
import UserName from "@/components/utils/UserName";
import { Edit, Lock } from "lucide-react";
import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="">
        {children}
    </div>
  );
};

export default layout;
