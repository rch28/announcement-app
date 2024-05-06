"use client";
import Image from "next/image";
import React, { useState } from "react";
import { profile } from "../../../public";
import { Plus } from "lucide-react";
import EditProfileForm from "./EditProfileImgForm";
import { useStore } from "@/stores/store";

const EditProfileImg = () => {
  const [toggle, setToggle] = useState(false);
  const userData = useStore((state) => state.userData);

  return (
    <div className=" flex  justify-center">
      <div className=" relative">
        {userData?.profilepic && (
          <div className="cursor-pointer   bg-gray-200 text-center text-gray-500 text-sm  rounded-md h-20 w-20">
            <Image
              className="rounded-full h-full w-full "
              src={userData.profilepic}
              width={600}
              height={300}
              alt="profile"
              priority
            />
          </div>
        )}
        {!userData?.profilepic && (
          <div className="cursor-pointer  w-full bg-gray-200 text-center text-gray-500 text-sm p-5 rounded-md">
            <Image
              src={profile}
              height={80}
              width={80}
              priority
              alt="profile picture"
              className="rounded-full"
            />
          </div>
        )}

        <span
          onClick={() => setToggle(!toggle)}
          className=" bg-green-500 text-white flex justify-center items-center w-8 h-8 rounded-full absolute left-12 bottom-0 cursor-pointer"
        >
          <Plus size={24} />
        </span>
      </div>

      {toggle && <EditProfileForm setToggle={setToggle} />}
    </div>
  );
};

export default EditProfileImg;
