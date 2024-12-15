"use client";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Cookies from "js-cookie";
import Image from "next/image";
import DetailsHeader from "./DetailsHeader";
import { logo } from "../../../public";
import AdminInfo from "./AdminInfo";
import {
  CalendarDaysIcon,
  CalendarIcon,
  EllipsisVertical,
  GaugeIcon,
  Globe,
  LocateIcon,
  Lock,
  Type,
  WalletIcon,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useStore } from "@/stores/store";
import AnnSettingCard from "./AnnSettingCard";
import RichTextDisplay from "../layout/RichTextDisplay";
import { useEffect, useState } from "react";

export function AnnouncementDetails({ data, toggle, setToggle }) {
  const dateTime = new Date(data.created_at);
  const date = dateTime.toDateString();
  const time = dateTime.toLocaleTimeString();
  const userData = useStore((state) => state.userData);
  const access_token = Cookies.get("access_token");
  const [like,setLike] = useState(data?.user_liked);
  const [dislike,setDislike] = useState(data?.user_disliked);
  const [totalLikes, setTotalLike] = useState(data?.likes)
  const [totalDislikes, setTotalDislike] = useState(data?.dislikes)
  const [likeDislikeClicked,setLikeDislikeClicked] = useState(false)

  console.log(data);

  const handleLikeDislike = (isLike) => {
    if (isLike) {
      setLike(true);
      setDislike(false);
    } else {
      setDislike(true);
      setLike(false);
    }
    setLikeDislikeClicked(true);
  };

  useEffect(()=>{

    setLike(data?.user_liked)
    setTotalLike(data?.likes)
    setDislike(data?.user_disliked)
    setTotalDislike(data?.dislikes)

    const likeDislikeAnnouncement = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_BASE_URL}/announcement/like/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access_token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ announcement: data?.id, user: userData?.id, like: like, dislike: dislike })
          }
        );
        if (!response.ok) {
          console.log("Something went wrong!!");
          return;
        }
        const result = await response.json();
        console.log(result);
        setLike(result?.like)
        setDislike(result?.dislike)
        
      } catch (error) {
        console.log(error);
      }
    };
    // Call the function only when necessary
    if (likeDislikeClicked) {
      likeDislikeAnnouncement();
      setLikeDislikeClicked(false); // Reset flag after call
      setLike(like)
      setDislike(dislike)
    }

  },[data,userData,likeDislikeClicked,access_token,like,dislike])
  
  return (
    <Card className=" grid  md:flex flex-row-reverse gap-4 bg-transparent dark:bg-dark-primary border-none shadow-none">
      <div className="flex-[0.4] shadow-md">
        <DetailsHeader group_id={data.group} date={date} />
        <div className=" bg-white rounded-b">
          {data?.image && (
            <Image
              alt={data?.title || "Announcement Image"}
              className="aspect-[4/3] w-full rounded-b object-cover"
              height="240"
              src={data?.image}
              width="400"
            />
          )}
          {!data?.image && (
            <Image
              alt={data?.title || "Announcement Image"}
              className="aspect-[4/3] w-full rounded-b object-cover"
              height="240"
              src={logo}
              width="400"
            />
          )}
        </div>
        {
          data?.image_description && <div className="mt-4 text-gray-800 bg-white rounded-md p-4">
          <h1 className="font-semibold ">Image Description</h1>
          <p className="p-1  capitalize ">
            {data?.image_description}
          </p>
          </div>
        }
      </div>
      <div className="flex-[0.6] bg-primary rounded-md">
        <CardHeader className="p-0 ">
          <div className="flex justify-between items-center relative md:bg-purple-100 px-4 py-2 md:p-4 md:rounded-t-lg ">
            <CardTitle className="text-md md:text-xl lg:text-2xl xl:text-3xl text-gray-800 capitalize ">
              {data?.title}
            </CardTitle>
            {userData?.id === data?.user && (
              <button
                className="p-1  text-white bg-purple-700 shadow-md shadow-gray-700  rounded-full hover:bg-purple-900"
                onClick={() => setToggle((prev) => !prev)}
              >
                <EllipsisVertical size={18} />
              </button>
            )}
            {/* Announcement Edit toggle */}
            {toggle && (
              <div
                className={`absolute z-40 right-0 top-0 bg-white shadow-md shadow-gray-600 p-4 rounded-lg w-88 }`}
              >
                <AnnSettingCard setToggle={setToggle} group_id={data?.group} />
              </div>
            )}
          </div>
          <div className="flex items-center  gap-4 px-4 pb-1">
            <AdminInfo admin_id={data?.user} />
          </div>
        </CardHeader>

        <CardContent>
          <div className="text-gray-700  ">
            <RichTextDisplay html={data?.description} />
            <div className="bg-purple-100 mt-2 rounded-md p-2">
              {data?.location && <h2>  Location : {data?.location}</h2>}
              <h2 className="capitalize ">Type :{data?.announcement_type}</h2>
              {data?.date && <h2>  Date :{data?.date}</h2>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start  sm:flex-row sm:items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CalendarDaysIcon className="h-6 w-6 text-purple-800" />
            <span className="text-base">Created on {date}</span>
          </div>
          <div 
            className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 mt-2 md:mt-0" 
            onClick={() => handleLikeDislike(true)}
          >
          <ThumbsUp className={`h-6 w-6 ${like ? 'fill-current text-purple-600' : ''}`}/>
            <span className="text-base">{totalLikes} Like</span>
          </div>
          <div 
            className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 mt-2 md:mt-0" 
            onClick={() => handleLikeDislike(false)}
          >
          <ThumbsDown className={`h-6 w-6 ${dislike ? 'fill-current text-purple-600' : ''}`}/>
            <span className="text-base">{totalDislikes} Dislike</span>
          </div>
          {data?.announcement_visibility === "public" ? (
            <p
              className="flex items-center gap-2 text-sm text-gray-700 mt-2 md:mt-0"
              title="public"
            >
              <Globe className="w-5 h-5 " />
              <span className="text-base">Public</span>
            </p>
          ) : (
            <p
              className="flex items-center gap-2 text-sm text-gray-700 mt-2 md:mt-0"
              title="public"
            >
              <Lock className="w-3 h-3 " />
              <span className="text-base">Private</span>
            </p>
          )}
          {/* <div className="flex items-center gap-2 text-sm text-gray-700 mt-2 md:mt-0">
            <GaugeIcon className="h-4 w-4 text-purple-800" />
            <span className={`${data?.status==="active"?"":"text-red-600"}`}>Status: {data.status}</span>
          </div> */}
        </CardFooter>
      </div>
    </Card>
  );
}
