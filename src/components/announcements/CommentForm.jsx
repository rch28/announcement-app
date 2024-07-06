"use client";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/stores/store";
import toast from "react-hot-toast";
import { GetAccessToken } from "@/index";
import { XIcon } from "lucide-react";

const CommentForm = () => {
  const inpRef = useRef(null);
  const searchParams = useSearchParams();
  const [text, setText] = useState("");

  const userData = useStore((state) => state.userData);
  const user_id = userData.id;
  const ann_id = searchParams.get("ann_id");

  const commentFetch = useStore((state) => state.commentFetch);
  const setCommentFetch = useStore((state) => state.setCommentFetch);

  const commentId = useStore((state) => state.commentId);
  const editCommentMode = useStore((state) => state.editCommentMode);
  const setEditCommentMode=useStore((state)=>state.setEditCommentMode)
  const handleChange = (event) => {
    setText(event.target.value);
  };


  const access_token= GetAccessToken()
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
        if(ann_id===data.announcement){
          setText(data.comment);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchComment();
  }, [editCommentMode, commentId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      return;
    }
    const postComment = async () => {
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
              comment: text,
              user: user_id,
            }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          console.log(data);
          return;
        }
        const data = await response.json();
        setCommentFetch(!commentFetch);
        setEditCommentMode(false)

        toast.success("Comment Posted");
        setText("");
      } catch (error) {
        console.log(error);
      }
    };
    postComment();
  };
  return (
    <>
      <div className="flex  w-full items-center gap-4 text-black">
        {userData.profilepic && (
          <Avatar className="h-10 w-10   shadow-md shadow-gray-500">
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
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 w-full"
        >
          <div className="flex-1">
           <div>
           <textarea 
            type="text"
              ref={inpRef}
              className="w-full focus:border-none  focus-visible:ring-0   dark:border-gray-800 focus:outline-none outline-none rounded-xl  px-2 py-4 resize-none placeholder:text-base text-xs behavior:smooth transition-all duration-300 ease-in-out  "
              placeholder="Write your comment..."
              value={text}
              onChange={handleChange}
              
            />
           </div>
          </div>
          {
            editCommentMode && (
              <button className="p-0.5 bb-white shadow-md shadow-gray-500 rounded-full">
                <XIcon
                  onClick={() => {
                    setText("");
                    setEditCommentMode(false);
                  }}
                />
              </button>
            )
          }
          <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white"  type="submit">
            {editCommentMode ? "Edit" : "Post"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
