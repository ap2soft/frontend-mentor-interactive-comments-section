import React, { useState } from "react";
import { Card } from "../Card";
import { Avatar } from "../User/Avatar";
import { format } from "timeago.js";
import { Votes } from "./Votes";
import { Buttons as ActionButtons } from "./Actions/Buttons";
import {
  upvoteComment,
  downvoteComment,
  getVotesForComment,
  getUsers,
} from "../../commentsManager";

const Comment = ({ comment, currentUser, deleteHandler }) => {
  const [votes, setVotes] = useState(getVotesForComment(comment.id));

  const currentUserUpvoted = () =>
    votes.find(
      ({ authorId, vote }) => authorId === currentUser.id && vote === "up"
    ) !== undefined;
  const currentUserDownvoted = () =>
    votes.find(
      ({ authorId, vote }) => authorId === currentUser.id && vote === "down"
    ) !== undefined;

  const upvoteHandler = () => {
    upvoteComment(comment.id, currentUser.id);
    setVotes(getVotesForComment(comment.id));
  };
  const downvoteHandler = () => {
    downvoteComment(comment.id, currentUser.id);
    setVotes(getVotesForComment(comment.id));
  };
  const author = getUsers().find(({ id }) => id === comment.authorId);
  const isTheAuthor = author.id === currentUser.id;

  return (
    <Card>
      <div className="flex flex-col tablet:flex-row">
        <Votes
          className="hidden tablet:block"
          upvotesCount={votes.filter(({ vote }) => vote === "up").length}
          downvotesCount={votes.filter(({ vote }) => vote === "down").length}
          upvoted={currentUserUpvoted()}
          downvoted={currentUserDownvoted()}
          onUpvote={upvoteHandler}
          onDownvote={downvoteHandler}
        />
        <div className="tablet:ml-6 tablet:flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar user={author} />
              <span className="font-bold text-gray-dark">
                {author.username}
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
        <Votes
          upvotesCount={votes.filter(({ vote }) => vote === "up").length}
          downvotesCount={votes.filter(({ vote }) => vote === "down").length}
          upvoted={currentUserUpvoted()}
          downvoted={currentUserDownvoted()}
          onUpvote={upvoteHandler}
          onDownvote={downvoteHandler}
        />
        <ActionButtons canManage={isTheAuthor} deleteHandler={deleteHandler} />
      </div>
    </Card>
  );
};

export default Comment;
