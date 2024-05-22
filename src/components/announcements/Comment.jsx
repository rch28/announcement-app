"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FetchUserData } from "@/index";
import { EllipsisVertical, Reply } from "lucide-react";
import CommentDropDown from "./CommentDropDown";
import { useStore } from "@/stores/store";
import ReplyForm from "./ReplyForm";
import UserComment from "./UserComment";
import UserCommentProfile from "./UserCommentProfile";

const Comment = ({ comment, replyMode}) => {
  const [userData, setUserData] = useState({});
  const [latestReply, setLatestReply] = useState(null);
  const [repliedUser, setRepliedUser] = useState({});
  const [replyCount, setReplyCount] = useState(0);


  useEffect(() => {
    if (comment.children.length > 0) {
      setReplyCount(comment.children.length);
      setLatestReply(comment.children[0]);
    }
    const fetchUserData = async () => {
      if (comment.children.length > 0) {
        const data = await FetchUserData(comment.children[0].user);
        setRepliedUser(data);
      }
      const data = await FetchUserData(comment.user);
      setUserData(data);
    };
    fetchUserData();
  }, [comment]);


  return (
    <div className="flex items-start gap-2 relative mr-2">
      <UserCommentProfile userData={userData} replyMode={replyMode} />
      <div className="w-full">
        <UserComment
          userData={userData}
          comment={comment}
        />
        <div className="flex flex-col px-2 py-3 gap-2">
          <div className="flex justify-between">
            {latestReply && (
              <p className="text-xs font-medium cursor-pointer  ">
                View all replies({replyCount})
              </p>
            )}

            <div className="px-4 w-full flex-1 flex justify-end">
              <button className="flex justify-end items-center gap-1">
                <Reply size={12} />
                <span className="text-xs font-medium  cursor-pointer text-gray-800">
                  reply
                </span>
              </button>
            </div>
          </div>

          {latestReply && (
            <div className="flex gap-2 items-center">
              {repliedUser.profilepic && (
                <Avatar className="h-5 w-5 shadow-md shadow-gray-500 p-0.5">
                  <AvatarImage
                    alt="@shadcn"
                    src={repliedUser.profilepic}
                    className="rounded-full"
                  />
                  <AvatarFallback>
                    {repliedUser.first_name[0]}
                    {repliedUser.last_name[0]}
                  </AvatarFallback>
                </Avatar>
              )}
              {!repliedUser.profilepic && (
                <Avatar className="h-5 w-5 shadow-md shadow-gray-500">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>YS</AvatarFallback>
                </Avatar>
              )}
              <p className="font-medium text-xs capitalize flex gap-1 items-center">
                <span>{repliedUser.first_name}</span>
                <span>{repliedUser.last_name}</span>
                <span className="text-gray-700 line-clamp-1">
                  {latestReply?.comment}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      {/* <div>
            <ReplyForm commentId={comment.id}/>
          </div> */}
    </div>
  );
};

export default Comment;
