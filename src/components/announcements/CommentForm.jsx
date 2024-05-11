"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/stores/store";

const CommentForm = () => {
  const searchParams = useSearchParams();
  const [text, setText] = useState("");

  const userData = useStore((state) => state.userData);
  const user_id = userData.id;
  const ann_id = searchParams.get("ann_id");

  const commentPosted = useStore((state)=>state.commentPosted)
  const setCommentPosted= useStore((state=>state.setCommentPosted))

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      return;
    }
    const postComment = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/announcement/give/comment/",
          {
            method: "POST",
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
        setCommentPosted(!commentPosted)
        console.log(data);
        setText("");
      } catch (error) {
        console.log(error);
      }
    };
    postComment();
  };
  return (
    <div>
      <form
        className="flex flex-col md:flex-row items-center gap-4"
        onSubmit={handleSubmit}
      >
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
        <div className="flex-1">
          <Textarea
            className="min-h-[40px] w-full focus-visible:ring-0 border border-gray-300 dark:border-gray-800 focus:border-gray-400 rounded-xl text-wrap   overflow-hidden placeholder:text-nowrap"
            placeholder="Write your comment..."
            value={text}
            onChange={handleChange}
            onInput={(e) => calculateHeight(e.target)}
          />
        </div>
        <Button className="" type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
