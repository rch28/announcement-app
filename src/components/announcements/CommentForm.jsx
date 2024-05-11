"use client";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/stores/store";
import toast from "react-hot-toast";

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
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const calculateHeight = (element) => {
    const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
    const paddingY =
      parseInt(window.getComputedStyle(element).paddingTop) +
      parseInt(window.getComputedStyle(element).paddingBottom);
    const lines = Math.ceil((element.scrollHeight - paddingY) / lineHeight);
    element.style.height = `${lines * lineHeight}px`;
  };


  useEffect(() => {
    if (!editCommentMode || !commentId) {
      return;
    }
    inpRef.current.focus();
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
        setText(data.comment);
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
      <div className="flex  w-full items-center gap-4">
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
            <Textarea
              ref={inpRef}
              className="min-h-[40px] md:w-full focus-visible:ring-0 border border-gray-300 dark:border-gray-800 focus:border-gray-400 rounded-xl text-wrap   overflow-hidden placeholder:text-nowrap"
              placeholder="Write your comment..."
              value={text}
              onChange={handleChange}
              onInput={(e) => calculateHeight(e.target)}
            />
          </div>
          <Button className="" type="submit">
            {editCommentMode ? "Edit" : "Post"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
