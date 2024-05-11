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
import Comments from "./Comments";
import { CalendarDaysIcon, GaugeIcon, WalletIcon } from "lucide-react";

export function AnnouncementDetails({ data }) {
  const dateTime = new Date(data.created_at);
  const date = dateTime.toDateString();
  const time = dateTime.toLocaleTimeString();

  return (
    <div className="w-full max-w-6xl mx-auto grid md:grid-cols-[1fr_350px] gap-6">
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
          <CardTitle>{data?.title}</CardTitle>
          <AdminInfo admin_id={data?.admin} />
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400">
            {data?.description}
          </p>
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
      {/* Announcement comments */}
      <Comments />
    </div>
  );
}