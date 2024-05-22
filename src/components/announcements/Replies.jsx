"use client";

import { useEffect, useState } from "react";
import { FetchUserData } from "@/index";
import UserComment from "./UserComment";
import UserCommentProfile from "./UserCommentProfile";
import Comment from "./Comment";

const Replies = ({ comment, comments }) => {
  const [userData, setUserData] = useState({});
  const [filterComment] = comments.filter((item) => item.id === comment.id);
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
        <UserComment userData={userData} comment={comment} />
      </div>
      <div className="ml-6">
        {filterComment?.children &&
          filterComment?.children.length > 0 &&
          filterComment?.children.map((child) => (
            <Comment key={child.id} comment={child} replyMode={true} />
          ))}
      </div>
    </>
  );
};

export default Replies;
