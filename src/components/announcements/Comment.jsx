"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FetchUserData } from "@/index";
import { EllipsisVertical } from "lucide-react";
import CommentDropDown from "./CommentDropDown";
import { useStore } from "@/stores/store";

const Comment = ({ comment }) => {
  const [userData, setUserData] = useState({});
  const [timePassed, setTimePassed] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [validUser, setValidUser] = useState(false);

  const loggedUser = useStore((state) => state.userData);

  const dateTime = new Date(comment.created_at);
  const today = new Date();
  const millisecondsInSecond = 1000;
  const millisecondsInMinute = millisecondsInSecond * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;
  const millisecondsInWeek = millisecondsInDay * 7;
  const millisecondsInMonth = millisecondsInDay * 30;
  const millisecondsInYear = millisecondsInDay * 365;
  const differenceInMs = today - dateTime;

  useEffect(() => {
    const calculateTimePassed = () => {
      if (differenceInMs > millisecondsInYear) {
        setTimePassed(
          `${Math.floor(differenceInMs / millisecondsInYear)}y ago`
        );
        return;
      }

      if (differenceInMs > millisecondsInMonth) {
        setTimePassed(
          `${Math.floor(differenceInMs / millisecondsInMonth)}mo ago`
        );
        return;
      }
      if (differenceInMs > millisecondsInWeek) {
        setTimePassed(
          `${Math.floor(differenceInMs / millisecondsInWeek)}w ago`
        );
        return;
      }

      if (differenceInMs > millisecondsInDay) {
        setTimePassed(`${Math.floor(differenceInMs / millisecondsInDay)}d ago`);
        return;
      }
      if (differenceInMs > millisecondsInHour) {
        setTimePassed(
          `${Math.floor(differenceInMs / millisecondsInHour)}h ago`
        );
        return;
      }
      if (differenceInMs > millisecondsInMinute) {
        setTimePassed(
          `${Math.floor(differenceInMs / millisecondsInMinute)}m ago`
        );
        return;
      }
      setTimePassed(`Just now`);
    };
    calculateTimePassed();
  }, [comment]);
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await FetchUserData(comment.user);
      setUserData(data);
    };
    fetchUserData();
  }, [comment]);
  useEffect(() => {
    if (loggedUser.id === comment.user) {
      setValidUser(true);
    } else {
      setValidUser(false);
    }
  }, [comment, loggedUser]);
  return (
    <div className="flex items-start gap-2 relative pt-2">
      {userData.profilepic && (
        <Avatar className="h-10 w-10 shadow-md shadow-gray-500">
          <AvatarImage
            alt="@shadcn"
            src={userData.profilepic}
            className="rounded-full"
          />
          <AvatarFallback>
            {userData.first_name[0]}
            {userData.last_name[0]}
          </AvatarFallback>
        </Avatar>
      )}
      {!userData.profilepic && (
        <Avatar className="h-10 w-10 shadow-md shadow-gray-500">
          <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
          <AvatarFallback>YS</AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1  px-2 bg-slate-100 shadow shadow-gray-400 rounded-md py-2 pb-4">
        <div className="flex items-center justify-between">
          <div className="font-medium capitalize">
            {userData.first_name} {userData.last_name}
          </div>
          <div className="flex items-center ">
            <div className="text-xs text-gray-900 dark:text-gray-400 p-1 rounded-full mr-4 bg-white">
              {timePassed}
            </div>
            {validUser && (
              <button
                className="p-1 text-gray-500 bg-white shadow-sm shadow-gray-400  rounded-full hover:bg-gray-400 hover:text-white"
                onClick={() => setToggleEdit(!toggleEdit)}
              >
                <EllipsisVertical size={16} />
              </button>
            )}
          </div>
          {toggleEdit && (
            <CommentDropDown id={comment.id} setToggleEdit={setToggleEdit} />
          )}
        </div>
        <p className="text-gray-700 dark:text-gray-600">{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
