"use client";
import React, { useEffect, useState } from "react";

import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/stores/store";

const Comments =  () => {
  const [comments, setComments] = useState({})
  const commentPosted = useStore((state)=>state.commentPosted)

  const searchParams = useSearchParams()
  const ann_id= searchParams.get("ann_id")
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/announcement/${ann_id}/comment/list/`
        );
        if (!response.ok) {
          const result = await response.json();
          return;
        }
        const result = await response.json();
        setComments(result);
      } catch (error) {
        return error;
      }
    };
    fetchComments()
  }, [commentPosted]);
  console.log(comments);
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6">
      <h3 className="text-lg font-semibold">Comments</h3>
      <div className="mt-4 space-y-4">
        {
          comments.count===0 && <div className="text-gray-500 dark:text-gray-400">No comments yet</div>
        }
        {
         comments.count>0 &&  comments.results.map((comment)=>(
          <Comment key={comment.id} comment={comment} />
        ))
        }
       
       
      </div>
      <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
        <CommentForm />
      </div>
    </div>
  );
};

export default Comments;
