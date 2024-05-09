"use client";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import { Star, XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Rating = ({ rating }) => {
    const searchParams = useSearchParams();
    const group_id = searchParams.get("group_id");
  const toggleRating = useStore((state) => state.toggleRating);
  const setToggleRating = useStore((state) => state.setToggleRating);
  const userData = useStore((state) => state.userData);
  const [giveRating, setGiveRating] = useState("");
  const inputRef = useRef(null);
    const access_token = Cookies.get("access_token");
  useEffect(() => {
    setGiveRating(rating);
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/v1/group/give/rating/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${access_token}`,
        },
        body:JSON.stringify({rating:giveRating,group:group_id,user:userData?.id})
            
    })
    if(response.ok){
        const result = await response.json();
        setToggleRating(false)
        toast.success(result.msg)
    }
    else{
        const result = await response.json();
        toast.error(result.errors[0].detail)
    }
  };
  return (
    <div className="relative">
      <div
        title="rating"
        className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400"
        onClick={() => setToggleRating(!toggleRating)}
      >
        <Star className="w-4 h-4 text-gray-500 fill-black dark:text-gray-400" />
        <span>{rating}</span>
      </div>

      {toggleRating && (
        <div className="flex items-center gap-1 w-52 rounded-md bg-white border border-gray-300 shadow-md shadow-gray-500 text-sm text-gray-500 dark:text-gray-400 absolute top-0 ">
          <div className="p-4">
            <p className="flex justify-end items-center">

            <XIcon className="w-4 h-4 text-gray-700 fill-black dark:text-gray-400 cursor-pointer" onClick={() => setToggleRating(!toggleRating)} />
            </p>
            <div className="text-2xl text-gray-800 font-bold tracking-tighter pb-3">
              Rate Us
              <p className="flex">
                <Star className="w-4 h-4 text-gray-500 fill-black dark:text-gray-400" />
                <Star className="w-4 h-4 text-gray-500 fill-black dark:text-gray-400" />
                <Star className="w-4 h-4 text-gray-500 fill-black dark:text-gray-400" />
                <Star className="w-4 h-4 text-gray-500 fill-black dark:text-gray-400" />
              </p>
            </div>

            <form action="" className="flex gap-4" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="number"
                name="rating"
                id="rating"
                min="1"
                max="5"
                value={giveRating}
                onChange={(e) => setGiveRating(e.target.value)}
                className="outline-none border border-gray-300 rounded-md p-2 w-full justify-between"
              />
              <input
                type="submit"
                value="Submit"
                className="px-6 py-2 bg-purple-600 rounded-full  text-white font-bold hover:bg-purple-700 text-lg md:text-sm   lg:text-lg cursor-pointer"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rating;
