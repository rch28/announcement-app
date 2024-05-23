"use client";
import { GetAccessToken } from "@/index";
import { useStore } from "@/stores/store";
import { EnterIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

const ReplyForm = ({ parentId, setReplyToggle, setCommentId, replyToggle }) => {
  const inpRef = useRef(null);
  const searchParams = useSearchParams();
  const [reply, setReply] = useState("");
  const userData = useStore((state) => state.userData);

  const user_id = userData.id;
  const ann_id = searchParams.get("ann_id");
  const access_token = GetAccessToken();
  const commentId = useStore((state) => state.commentId);
  const setCommentFetch = useStore((state) => state.setCommentFetch);
  const commentFetch = useStore((state) => state.commentFetch);
  const setReplyMode = useStore((state) => state.setReplyMode);

  const editCommentMode = useStore((state) => state.editCommentMode);
  const setEditCommentMode = useStore((state) => state.setEditCommentMode);

  useEffect(() => {
    inpRef.current.focus();
    if (!editCommentMode || !commentId) {
      return;
    }
    const fetchComment = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/announcement/comment/retrieve/${commentId}/`
        );

        if (!response.ok) {
          const data = await response.json();
          console.log(data);
          return;
        }
        const data = await response.json();
        if (ann_id === data.announcement) {
          setReply(data.comment);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchComment();
  }, [editCommentMode, commentId]);
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
            parent: parentId,
          }),
        }
      );
      console.log(response);
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        return;
      }
      const data = await response.json();
      setCommentFetch(!commentFetch);
      if (replyToggle) {
        setReplyToggle(false);
        setCommentId(parentId);
      }
      setReplyMode(true);
      setEditCommentMode(false);
      toast.success("Comment Posted");
      setReply("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-2 items-center">
      <form
        onSubmit={handleCommentSubmit}
        className="flex gap-1 relative  items-center"
      >
        <input
          type="text"
          ref={inpRef}
          placeholder="Reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className={`block ${
            replyToggle
              ? " pl-2 pr-6 py-1 outline-none w-full  rounded-md  shadow-md shadow-gray-400 bg-gray-200 text-xs border border-gray-400 focus:border-purple-500 "
              : "w-full focus:border-none  focus-visible:ring-0   dark:border-gray-800 focus:outline-none outline-none rounded-xl  p-4 text-xs "
          }`}
        />
        {replyToggle && (
          <button type="submit" className="absolute right-2 text-purple-700 ">
            <EnterIcon />
          </button>
        )}
        {!replyToggle && (
          <>
            {editCommentMode && (
              <button className="p-0.5 bb-white shadow-md shadow-gray-500 rounded-full">
                <XIcon
                  onClick={() => {
                    setReply("");
                    setEditCommentMode(false);
                  }}
                />
              </button>
            )}

            <button
              type="submit"
              className=" text-white bg-purple-700 hover:bg-purple-800 py-1  px-2 rounded-md text-sm font-bold"
            >
              {editCommentMode ? "Edit" : "Reply"}
            </button>
          </>
        )}
      </form>
      {replyToggle && (
        <button className="p-0.5 bb-white shadow-md shadow-gray-500 rounded-full">
          <XIcon onClick={() => setReplyToggle(false)} />
        </button>
      )}
    </div>
  );
};

export default ReplyForm;
