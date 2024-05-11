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
import { getLoggedInUserData } from "@/index";
import { useStore } from "@/stores/store";

export function AnnouncementDetails({ data, setToggle }) {
  const dateTime = new Date(data.created_at);
  const date = dateTime.toDateString();
  const time = dateTime.toLocaleTimeString();
  const userData = useStore((state) => state.userData);

  return (
    <Card className="shadow-md">
      <DetailsHeader group_id={data.group} date={date} />
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
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{data?.title}</CardTitle>
          {userData?.id === data?.admin && (
            <button
              className="p-2 w-8 h-8 text-gray-500 bg-white shadow-sm shadow-gray-700  rounded-full hover:bg-gray-200"
              onClick={() => setToggle((prev) => !prev)}
            >
              <EllipsisVertical size={16} />
            </button>
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
