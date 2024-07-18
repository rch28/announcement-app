"use client";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
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
} from "lucide-react";
import { useStore } from "@/stores/store";
import AnnSettingCard from "./AnnSettingCard";
import RichTextDisplay from "../layout/RichTextDisplay";

export function AnnouncementDetails({ data, toggle, setToggle }) {
  const dateTime = new Date(data.created_at);
  const date = dateTime.toDateString();
  const time = dateTime.toLocaleTimeString();
  const userData = useStore((state) => state.userData);
  return (
    <Card className="shadow-md md:flex flex-row-reverse gap-4 bg-primary dark:bg-dark-primary border-none">
      <div className="flex-[0.4]">
        <DetailsHeader group_id={data.group} date={date} />
        <div className="px-4">
          {data?.image && (
            <Image
              alt={data?.title || "Announcement Image"}
              className="aspect-[4/3] w-full rounded-t-lg object-cover"
              height="240"
              src={data?.image}
              width="400"
            />
          )}
          {!data?.image && (
            <Image
              alt={data?.title || "Announcement Image"}
              className="aspect-[4/3] w-full rounded-t-lg object-cover"
              height="240"
              src={logo}
              width="400"
            />
          )}
        </div>
        {
          data?.image_description && <div className="mt-4">
          <h1 className="font-semibold ">Image Description</h1>
          <p className="p-1  capitalize text-gray-800 bg-white rounded-md">
            {data?.image_description}
          </p>
          </div>
        }
      </div>
      <div className="flex-[0.6] bg-primary rounded-md">
        <CardHeader className="p-0 ">
          <div className="flex justify-between items-center relative bg-purple-300  px-4 py-4 rounded-t-lg ">
            <CardTitle className="text-md md:text-xl lg:text-2xl xl:text-3xl text-gray-800 capitalize ">
              {data?.title}
            </CardTitle>
            {userData?.id === data?.user && (
              <button
                className="p-1  text-white bg-purple-700 shadow-md shadow-gray-700  rounded-full hover:bg-purple-900"
                onClick={() => setToggle((prev) => !prev)}
              >
                <EllipsisVertical size={24} />
              </button>
            )}
            {/* Announcement Edit toggle */}
            {toggle && (
              <div
                className={`absolute z-40 right-0 top-0 bg-white shadow-md shadow-gray-600 p-4 rounded-lg w-88 }`}
              >
                <AnnSettingCard setToggle={setToggle} />
              </div>
            )}
          </div>
          <div className="flex items-center  gap-4">
            <AdminInfo admin_id={data?.user} />
          </div>
        </CardHeader>

        <CardContent>
          <div className="text-gray-700  ">
            <RichTextDisplay html={data?.description} />
            <div className="bg-purple-200 mt-2 rounded-md p-2">
              {data?.location && <h2>  Location : {data?.location}</h2>}
              <h2 className="capitalize">Type :{data?.announcement_type}</h2>
              {data?.date && <h2>  Date :{data?.date}</h2>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start  sm:flex-row sm:items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CalendarDaysIcon className="h-4 w-4 text-purple-800" />
            <span>Created on {date}</span>
          </div>
          {/* <div className="flex items-center gap-2 text-sm text-gray-700 mt-2 md:mt-0">
            <WalletIcon className="h-4 w-4 text-purple-800" />
            <span>Paid</span>
          </div> */}
          {data?.announcement_visibility === "public" ? (
            <p
              className="flex items-center gap-2 text-sm text-gray-700 mt-2 md:mt-0"
              title="public"
            >
              <Globe className="w-3 h-3 " />
              <span className="">Public</span>
            </p>
          ) : (
            <p
              className="flex items-center gap-2 text-sm text-gray-700 mt-2 md:mt-0"
              title="public"
            >
              <Lock className="w-3 h-3 " />
              <span className="">Private</span>
            </p>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-700 mt-2 md:mt-0">
            <GaugeIcon className="h-4 w-4 text-purple-800" />
            <span className={`${data?.status==="active"?"":"text-red-600"}`}>Status: {data.status}</span>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
