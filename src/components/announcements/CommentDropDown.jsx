"use client";
import { useStore } from "@/stores/store";
import React, { useState } from "react";
import DeleteConfirm from "../utils/DeleteConfirm";
import { GetAccessToken } from "@/index";
import { Edit2, ReplyIcon, Trash } from "lucide-react";
import PopUpWrapper from "../PopUpWrapper";

const CommentDropDown = ({ id, setToggleEdit }) => {
  const [deleteToggle, setDeleteToggle] = useState(false);
  const setCommentId = useStore((state) => state.setCommentId);
  const setEditCommentMode = useStore((state) => state.setEditCommentMode);
  const setReplyMode = useStore((state) => state.setReplyMode);
  const setCommentFetch = useStore((state) => state.setCommentFetch);
  const access_token = GetAccessToken();
  const handleDeleteComment = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/announcement/comment/delete/${id}/`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.ok) {
        setDeleteToggle(!deleteToggle);
        setCommentFetch((prev) => !prev);
      } else {
        const result = await response.json();
        console.log(result);
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };
  return (
    <div className="absolute top-0 right-10 bg-white rounded-md border border-gray-300  shadow-md shadow-gray-500  z-50">
      <div className="flex flex-col ">
        <div className="px-4 py-2 border-b border-gray-400">
          <button
            onClick={() => {
              setReplyMode(true);
              setToggleEdit(false);
              setCommentId(id);
            }}
            className="flex justify-start gap-2 p-2 text-sm hover:bg-purple-600 items-center w-full rounded-md hover:text-white"
          >
            <ReplyIcon size={14} />
            <span className={`font-medium`}>Reply</span>
          </button>
        </div>
        <div className="px-4 py-2 border-b border-gray-400">
          <button
            onClick={() => {
              setEditCommentMode(true);
              setToggleEdit(false);
              setCommentId(id);
            }}
            className={`flex justify-start gap-2 p-2 text-sm hover:bg-green-600 items-center w-full rounded-md hover:text-white`}
          >
            <Edit2 size={14} />

            <span className="font-medium">Edit</span>
          </button>
        </div>
        <div className="px-4 py-2 ">
          <button
            onClick={() => setDeleteToggle(!deleteToggle)}
            className="flex justify-between gap-2 p-2 text-sm hover:bg-red-600 items-center w-full rounded-md hover:text-white"
          >
            <Trash size={14} />
            <span className="font-medium">Delete</span>
          </button>
        </div>
      </div>
      {deleteToggle && (
        <PopUpWrapper>
          <DeleteConfirm title={"Delete Comment"}>
            <div className="flex gap-4 ">
              <button
                onClick={() => setDeleteToggle(!deleteToggle)}
                className="px-6 py-2 bg-gray-600 rounded-full  text-white font-bold hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteComment}
                className="px-6 py-2 bg-red-600 rounded-full  text-white font-bold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </DeleteConfirm>
        </PopUpWrapper>
      )}
    </div>
  );
};

export default CommentDropDown;
