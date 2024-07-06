"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FetchUserData, getLoggedInUserData } from "@/index";
import { useStore } from "@/stores/store";
import UserComment from "./UserComment";
import UserCommentProfile from "./UserCommentProfile";
import { Reply } from "lucide-react";
import ReplyForm from "./ReplyForm";

const Comment = ({ comment, replyMode }) => {
  const [userData, setUserData] = useState({});
  const [latestReply, setLatestReply] = useState(null);
  const [repliedUser, setRepliedUser] = useState({});
  const [replyCount, setReplyCount] = useState(0);
  const [replyToggle, setReplyToggle] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null)
  const setCommentId = useStore((state) => state.setCommentId);
  const setReplyMode = useStore((state) => state.setReplyMode);
  useEffect(() => {
    if (comment.replies && comment.replies.length > 0) {
      setReplyCount(comment.replies.length);
      setLatestReply(comment.replies[0]);
    }
    
    const fetchUserData = async () => {
      if (comment.replies.length > 0) {
        const data = await FetchUserData(comment.replies[0].user);
        setRepliedUser(data);
      }
      const loggedUserData= await getLoggedInUserData();
      setLoggedUser(loggedUserData)
      const data = await FetchUserData(comment.user);
      setUserData(data);
    };
    fetchUserData();
  }, [comment]);

  return (
    <div className="flex items-start gap-2 relative mr-2">
      <UserCommentProfile userData={userData} replyMode={replyMode} />
      <div className="w-full">
        <UserComment userData={userData} comment={comment} />
        <div className="flex flex-col px-2 py-3 gap-2">
          <div className="flex justify-between w-full">
            <div className="w-full ">
              {replyToggle && (
                <div className="flex items-center gap-2">
                  <UserCommentProfile userData={loggedUser} replyMode={true} />

                  <ReplyForm
                    parentId={comment.id}
                    setReplyToggle={setReplyToggle}
                    replyToggle={replyToggle}
                  />
                </div>
              )}

              {latestReply && (
                <button
                  className="text-xs font-medium cursor-pointer text-gray-700  hover:bg-gray-300 p-1 rounded-md"
                  onClick={() => {
                    setReplyMode(true);
                    setCommentId(comment.id);
                  }}
                >
                  View all replies({replyCount})
                </button>
              )}
            </div>
            {!replyToggle && (
              <div className="px-4 w-full flex-1 flex justify-end">
                <button
                  className="flex justify-end items-center gap-1  hover:bg-gray-300 p-1 rounded-md text-gray-800"
                  onClick={() => setReplyToggle(true)}
                >
                  <Reply size={12} />
                  <span className="text-xs font-medium  cursor-pointer text-gray-800">
                    reply
                  </span>
                </button>
              </div>
            )}
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
              <p className="font-medium text-xs capitalize flex gap-1 items-center text-gray-900">
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
    </div>
  );
};

export default Comment;
