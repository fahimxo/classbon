import React from "react";
import { CommentProps } from "./comment.types";
import { Avatar } from "../avatar";
import { Rating } from "../rating";
import { API_URL } from "@/configs/global";

const Comment: React.FC<CommentProps> = ({
  commentText,
  date,
  fullName,
  isResponse,
  score,
  userId,
  variant = "neutral",
}) => {
  const srcPath = userId ? API_URL + "/picture/" + userId : undefined;
  return (
    <div className={`comment comment-${isResponse ? "end" : "start"}`}>
      <div className="comment-image">
        <Avatar
          src={srcPath}
          size="tiny"
          variant={!isResponse ? "neutral" : variant}
        />
      </div>
      <div className="comment-header">
        {fullName}
        <time className="text-xs opacity-50 mx-2">{date}</time>
      </div>
      <div
        className={`comment-bubble ${isResponse ? "comment-bubble-" + variant : ""}`}
      >
        {commentText}
      </div>
      {score && score > 0 && (
        <div className="comment-footer">
          <Rating rate={score!} size="tiny" variant="accent" />
        </div>
      )}
    </div>
  );
};

export default Comment;
