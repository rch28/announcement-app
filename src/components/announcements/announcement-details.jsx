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
  EllipsisVertical,
  GaugeIcon,
  WalletIcon,
} from "lucide-react";
import { useStore } from "@/stores/store";
import AnnSettingCard from "./AnnSettingCard";

export function AnnouncementDetails({
  data,
  toggle,
  setToggle,
  setToggleEdit,
}) {
  const dateTime = new Date(data.created_at);
  const date = dateTime.toDateString();
  const time = dateTime.toLocaleTimeString();
  const userData = useStore((state) => state.userData);

  return (
    <Card className="shadow-md">
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
      <CardHeader>
        <div className="flex justify-between items-center relative">
          <CardTitle className="text-md md:text-xl lg:text-2xl xl:text-3xl">
            {data?.title}
          </CardTitle>
          {userData?.id === data?.admin && (
            <button
              className="p-2  text-gray-500 bg-white shadow-md shadow-gray-700  rounded-full hover:bg-gray-200"
              onClick={() => setToggle((prev) => !prev)}
            >
              <EllipsisVertical size={24} />
            </button>
          )}
          {/* Announcement Edit toggle */}
          {toggle && (
            <div
              className={`absolute z-40 bottom-14 right-0  md:-right-96 bg-white shadow-md shadow-gray-600 p-4 rounded-lg w-88 }`}
            >
              <AnnSettingCard
                setToggleEdit={setToggleEdit}
                setToggle={setToggle}
              />
            </div>
          )}
        </div>
        <AdminInfo admin_id={data?.admin} />
      </CardHeader>

      <CardContent>
        <p className="text-gray-500 dark:text-gray-400">{data?.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start  sm:flex-row sm:items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <CalendarDaysIcon className="h-4 w-4" />
          <span>Created on {date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
          <WalletIcon className="h-4 w-4" />
          <span>Paid</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
          <GaugeIcon className="h-4 w-4" />
          <span>Status: {data.status}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
