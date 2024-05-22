"use client";
import React, { useEffect, useState } from "react";

import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/stores/store";
import { fetchComments } from "@/index";
import Replies from "./Replies";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const commentFetch = useStore((state) => state.commentFetch);
  const searchParams = useSearchParams();
  const ann_id = searchParams.get("ann_id");

  const [comment, setComment] = useState({});

  const viewAllCommentsReply = useStore((state) => state.viewAllCommentsReply);
  useEffect(() => {
    if (ann_id) {
      const loadComment = async () => {
        try {
          const commentData = await fetchComments(ann_id);
          setComments(commentData);
        } catch (err) {
          // setError(err.message);
          console.log(err.message);
        }
      };
      loadComment();
    }
  }, [ann_id, commentFetch]);

  // 5fea9d4c-e681-4696-9975-142360c01f2a
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const data = await fetch(
          "http://127.0.0.1:8000/api/v1/announcement/comment/retrieve/5fea9d4c-e681-4696-9975-142360c01f2a/"
        );
        if (!data.ok) {
          throw new Error("Failed to fetch comments");
        }
        const comment = await data.json();
        setComment(comment);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComment();
  }, []);
  const replymode = true;
  // console.log(comment)
  return (
    <div className="border-t md:mt-12 border-gray-200 dark:border-gray-800 pt-6 md:border-t-0 md:border-l">
      {!replymode && (
        <div className="bg-white p-4 rounded-md shadow shadow-gray-400">
          <h3 className="text-lg font-semibold">Comments</h3>
          <div className="mt-4 space-y-4 max-h-96 flex flex-col overflow-auto">
            {comments.length === 0 && (
              <div className="text-gray-500 dark:text-gray-400">
                No comments yet
              </div>
            )}
            {comments.length > 0 &&
              comments.map((comment) => (
                <Comment key={comment.id} comment={comment}  replyMode={false}/>
              ))}
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
            <CommentForm />
          </div>
        </div>
      )}
      {replymode && (
        <div className="bg-white p-4 rounded-md shadow shadow-gray-400">
          <h3 className="text-lg font-semibold">Replies</h3>
          <div className="mt-4 space-y-4 max-h-96 flex flex-col overflow-auto">

          <Replies comment={comment} comments={comments} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
