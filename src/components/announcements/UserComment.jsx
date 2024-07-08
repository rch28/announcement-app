"use client";
import { FetchUserData } from "../../index";
import CommentDropDown from "./CommentDropDown";
import { EllipsisVertical, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/stores/store";

const UserComment = ({ userData, comment, replyMode }) => {
  const [timePassed, setTimePassed] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [validUser, setValidUser] = useState(false);
  const loggedUser = useStore((state) => state.userData);

  useEffect(() => {
    if (loggedUser.id === comment?.user) {
      setValidUser(true);
    } else {
      setValidUser(false);
    }
  }, [comment, loggedUser]);

  const dateTime = new Date(comment?.created_at);
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
  return (
    <>
      <div
        className={`flex-1  px-2 shadow shadow-gray-400 rounded-md  py-2 ${
          replyMode ? "bg-slate-300" : "bg-slate-100"
        } `}
      >
        <div className="flex items-center justify-between">
          <div className="font-medium capitalize text-black/80">
            {userData?.first_name} {userData?.last_name}
          </div>
          <div className="flex items-center ">
            <div className="text-xs text-gray-900 dark:text-gray-800 px-2 rounded-full mr-4 bg-white">
              {timePassed}
            </div>
            {validUser && (
              <button
                className={` text-gray-500  shadow-sm shadow-gray-400  rounded-full  hover:bg-purple-600 hover:text-white `}
                onClick={() => setToggleEdit(!toggleEdit)}
              >
                {toggleEdit ? <XIcon size={16} className="bg-red-500 rounded-full hover:bg-red-700 text-white w-6 h-6 p-1" /> : <EllipsisVertical size={16} className=" bg-purple-700 hover:bg-purple-900 rounded-full text-white w-5 h-5 p-0.5" />}
              </button>
            )}
          </div>
          {toggleEdit && (
            <CommentDropDown id={comment.id} setToggleEdit={setToggleEdit} />
          )}
        </div>
        <p className="text-gray-700 font-sans font-medium text-wrap text-sm">
          {comment?.comment}
        </p>
      </div>
    </>
  );
};

export default UserComment;
