import EditProfile from "@/components/profile/EditProfile";
import EditProfileImg from "@/components/profile/EditProfileImg";
import React from "react";
import { profile } from "../../../../public";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import UserName from "@/components/utils/UserName";

const ProfilePage = () => {
  return (
    <div className="  min-h-screen flex  z-10">
      <section className="flex-[0.2]  py-4">
        <div className={""}>
          <Link
            href={"/user/profile/setting"}
            className="cursor-pointer   bg-gray-200 text-center text-gray-500 text-sm  rounded-full h-20 w-20 relative"
          >
            <Image
              src={profile}
              height={200}
              width={200}
              priority
              alt="profile picture"
              className="rounded-full"
            />
            <span className=" bg-green-500 text-white flex justify-center items-center w-12 h-12 rounded-full absolute right-1   bottom-1  cursor-pointer">
              <Plus size={24} />
            </span>
          </Link>
          <UserName />
          <div className="flex justify-center items-center w-full my-4 ">
            <button className="mx-2 py-2  border border-purple-400 w-full text-gray-800 font-medium  rounded-md bg-white/40">
              Edit profile
            </button>
          </div>
        </div>
      </section>
      <section className="p-4 bg-amber-400 w-full flex-1">
        content
      </section>
      {/* <EditProfileImg />

        <EditProfile/> */}
    </div>
  );
};

export default ProfilePage;
