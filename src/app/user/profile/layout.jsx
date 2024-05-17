import EditProfileImg from "@/components/profile/EditProfileImg";
import UserName from "@/components/utils/UserName";
import { Edit, Lock } from "lucide-react";
import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="">
      <div className="md:flex border border-gray-300 rounded-xl px-4">
        {/* <div className="flex justify-center items-center gap-6 py-4 md:block md:p-2">
            <EditProfileImg />
            <div>
              <UserName />
              <Link
                href="/user/profile/change-password"
                className="text-sm font-bold flex items-center justify-start gap-2 my-2"
              >
                <Lock size={18} color="purple" />
                <span>Change password</span>
              </Link>
              <Link
                href="/user/profile"
                className="text-sm font-bold flex items-center justify-start gap-2 my-2"
              >
                <Edit size={18}  color="purple" />
                <span>upadate Info</span>
              </Link>
            </div>
          </div> */}
        {/* <div className="flex-1  md:border-l-2 p-2 border-gray-300"></div> */}
      </div>
        {children}
    </div>
  );
};

export default layout;
