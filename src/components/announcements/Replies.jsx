"use client";

import { useEffect, useState } from "react";
import { FetchUserData } from "@/index";
import UserComment from "./UserComment";
import UserCommentProfile from "./UserCommentProfile";
import Comment from "./Comment";

const Replies = ({ comment }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await FetchUserData(comment?.user);
      setUserData(data);
    };
    fetchUserData();
  }, [comment]);
  return (
    <>
      <div className="flex items-start gap-2 relative mr-2 ">
        <UserCommentProfile userData={userData} />
        <UserComment userData={userData} comment={comment} replyMode={true} />
      </div>
      <div className="ml-6">
        {comment?.replies &&
          comment?.replies.length > 0 &&
          comment?.replies.map((child) => (
            <Comment key={child.id} comment={child} replyMode={true}/>
          ))}
      </div>
    </>
  );
};

export default Replies;
