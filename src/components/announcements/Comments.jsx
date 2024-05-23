"use client";
import React, { useEffect, useState } from "react";

import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/stores/store";
import { fetchComments } from "@/index";
import Replies from "./Replies";
import { XIcon } from "lucide-react";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const commentFetch = useStore((state) => state.commentFetch);
  const searchParams = useSearchParams();
  const ann_id = searchParams.get("ann_id");
  const [loadMore, setLoadMore] = useState(false);
  const [limit, setLimit] = useState(3)

  const [comment, setComment] = useState({});
  const [commentId, setCommentId] = useState("");
  const replyMode = useStore((state) => state.replyMode);
  const setReplyMode = useStore((state) => state.setReplyMode);
  useEffect(() => {
    if (ann_id) {
      const loadComment = async () => {
        setLoadMore(false)
        try {
          const commentData = await fetchComments(ann_id, limit);
          if (commentData.next) {
            setLoadMore(true);
          }
          setComments(commentData.results);
        } catch (err) {
          // setError(err.message);
          console.log(err.message);
        }
      };
      loadComment();
    }
  }, [ann_id, commentFetch, limit]);

  
  useEffect(() => {
    if (!commentId) {
      return;
    }
    const fetchComment = async () => {
      try {
        const data = await fetch(
          `http://127.0.0.1:8000/api/v1/announcement/comment/retrieve/${commentId}/`
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
  }, [commentId, replyMode, commentFetch]);
  return (
    <div className="border-t md:mt-12 border-gray-200 dark:border-gray-800 pt-6 md:border-t-0 md:border-l">
      {!replyMode && (
        <div className="bg-white p-4 rounded-md shadow shadow-gray-400">
          <h3 className="text-lg font-semibold">Comments</h3>
          <div className="mt-4 space-y-4 max-h-96 flex flex-col overflow-auto">
            {comments.length === 0 && (
              <div className="text-gray-500 dark:text-gray-400">
                No comments yet
              </div>
            )}
            {comments.length > 0 &&
              comments.map((comm) => (
                <Comment
                  key={comm.id}
                  comment={comm}
                  replyMode={replyMode}
                  setCommentId={setCommentId}
                />
              ))}
          </div>
          {loadMore && (
            <div className="flex justify-end items-center px-6">
              <button onClick={()=>setLimit(limit+3)} className="text-purple-800 font-bold text-sm tracking-tighter hover:underline">
                Load More..
              </button>
            </div>
          )}
          <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
            <CommentForm />
          </div>
        </div>
      )}
      {replyMode && (
        <div className="bg-white p-4 rounded-md shadow shadow-gray-400">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Replies</h3>
            <button
              onClick={() => setReplyMode(false)}
              className="mr-6 bg-white shadow-md shadow-gray-600 rounded-full p-1"
            >
              <XIcon color="purple" />
            </button>
          </div>
          <div className="mt-4 space-y-4 max-h-96 flex flex-col overflow-auto">
            <Replies
              comment={comment}
              comments={comments}
              setCommentId={setCommentId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
