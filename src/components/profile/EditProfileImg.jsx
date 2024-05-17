"use client";
import Image from "next/image";
import React, { useState } from "react";
import { profile } from "../../../public";
import { Plus } from "lucide-react";
import EditProfileForm from "./EditProfileImgForm";
import { useStore } from "@/stores/store";
import PopUpWrapper from "../PopUpWrapper";

const EditProfileImg = () => {
  const [toggle, setToggle] = useState(false);
  const userData = useStore((state) => state.userData);

  return (
    <div className=" flex  justify-center border p-2">
      <div className=" relative">
        <div className="cursor-pointer   bg-gray-200 text-center text-gray-500 text-sm  rounded-full h-40 w-40">
          <Image
            className="rounded-full h-full w-full "
            src={userData?.profilepic ? userData.profilepic : profile}
            width={600}
            height={300}
            alt="profile"
            priority
          />
        </div>

        <span
          onClick={() => setToggle(!toggle)}
          className=" bg-green-500 text-white flex justify-center items-center w-6 md:w-8 h-6 md:h-8 rounded-full absolute left-3/4 bottom-3 cursor-pointer"
        >
          <Plus className="" />
        </span>
      </div>
      {toggle && (
        <PopUpWrapper>
          <EditProfileForm setToggle={setToggle} />
        </PopUpWrapper>
      )}
    </div>
  );
};

export default EditProfileImg;
