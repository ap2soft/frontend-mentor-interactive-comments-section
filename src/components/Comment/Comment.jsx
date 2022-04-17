import React from "react";
import { Card } from "../Card";
import { Avatar } from "../User/Avatar";
import { format } from "timeago.js";
import { Likes } from "./Likes";
import { Buttons as ActionButtons } from "./Actions/Buttons";

const Comment = ({ comment, currentUser, deleteHandler }) => {
  const upvoteHandler = () => {
    console.log("upvoted");
  };
  const downvoteHandler = () => {
    console.log("downvoted");
  };
  const isTheAuthor = comment.author.name === currentUser.name;

  return (
    <Card>
      <div className="flex flex-col tablet:flex-row">
        <Likes
          className="hidden tablet:block"
          likesCount={comment.likesCount}
          canManage={true}
          onUpvote={upvoteHandler}
          onDownvote={downvoteHandler}
        />
        <div className="tablet:ml-6 tablet:flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar user={comment.author} />
              <span className="font-bold text-gray-dark">
                {comment.author.name}
              </span>
              {isTheAuthor && (
                <span className="h-6 rounded bg-blue px-2 text-sm lowercase text-white">
                  you
                </span>
              )}
              <time dateTime={comment.createdAt}>
                {format(comment.createdAt)}
              </time>
            </div>
            <ActionButtons
              className="hidden tablet:block"
              canManage={isTheAuthor}
              deleteHandler={deleteHandler}
            />
          </div>
          <div className="mt-4">{comment.body}</div>
        </div>
      </div>
      <div className="mt-4 flex justify-between tablet:hidden">
        <Likes
          likesCount={comment.likesCount}
          canManage={true}
          onUpvote={upvoteHandler}
          onDownvote={downvoteHandler}
        />
        <ActionButtons canManage={isTheAuthor} deleteHandler={deleteHandler} />
      </div>
    </Card>
  );
};

export default Comment;
