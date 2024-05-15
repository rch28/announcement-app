"use client";
import { useStore } from "@/stores/store";
import React, { useState } from "react";
import DeleteConfirm from "../utils/DeleteConfirm";
import { GetAccessToken } from "@/index";

const CommentDropDown = ({ id, setToggleEdit }) => {
  const [deleteToggle, setDeleteToggle] = useState(false);
  const setCommentId = useStore((state) => state.setCommentId);
  const setEditCommentMode = useStore((state) => state.setEditCommentMode);
  const setCommentFetch = useStore((state) => state.setCommentFetch);
  const access_token = GetAccessToken()
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
    <div className="absolute top-0 right-12 bg-white rounded-md border border-gray-300  shadow-md shadow-gray-500 w-24 z-50">
      <div className="flex flex-col  items-start">
        <button
          onClick={() => {
            setEditCommentMode(true);
            setToggleEdit(false);
            setCommentId(id);
          }}
          className={`hover:bg-green-500 hover:text-white  rounded-t-lg w-full p-2 border-b border-gray-300`}
        >
          Edit
        </button>
        <button
          onClick={() => setDeleteToggle(!deleteToggle)}
          className="hover:bg-red-500 hover:text-white rounded-b-md w-full p-2"
        >
          Delete
        </button>
      </div>
      {deleteToggle && (
        <div
          className={` fixed top-0 left-0 flex w-screen h-screen justify-center items-center ${
            deleteToggle && "bg-black/30 "
          }`}
        >
          <DeleteConfirm title={"Delete Group"}>
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
        </div>
      )}
    </div>
  );
};

export default CommentDropDown;
