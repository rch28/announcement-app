"use client";
import { GetAccessToken } from "@/index";
import { useStore } from "@/stores/store";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ReplyForm = ({ commentId }) => {
  const searchParams = useSearchParams();
  const [reply, setReply] = useState("");
  const userData = useStore((state) => state.userData);

  const user_id = userData.id;
  const ann_id = searchParams.get("ann_id");
  const access_token = GetAccessToken();
  const editCommentMode=false
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!reply) {
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/announcement/${
          editCommentMode ? `comment/update/${commentId}/` : "give/comment/"
        }`,
        {
          method: editCommentMode ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            announcement: ann_id,
            comment: reply,
            user: user_id,
            parent: commentId,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        return;
      }
      const data = await response.json();
    //   setCommentFetch(!commentFetch);
    //   setEditCommentMode(false);

      toast.success("Comment Posted");
      setText("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleCommentSubmit} className="flex">
      <input
        type="text"
        placeholder="reply"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className=""
      />
      <input type="submit" value="reply" />
    </form>
  );
};

export default ReplyForm;
