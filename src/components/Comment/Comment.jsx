import React, { useState } from "react";
import { Card } from "../Card";
import { Avatar } from "../User/Avatar";
import { format } from "timeago.js";
import { Votes } from "./Votes";
import { Buttons as ActionButtons } from "./Actions/Buttons";
import FormSubmitButton from "./FormSubmitButton";
import ReplyForm from "./Form";
import {
  upvoteComment,
  downvoteComment,
  getVotesForComment,
  getUsers,
} from "../../commentsManager";

const Comment = ({
  comment,
  currentUser,
  replyHandler,
  updateHandler,
  deleteHandler,
}) => {
  const [commentBody, setCommentBody] = useState(comment.body);

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

  const [editing, setEditing] = useState(false);
  const onUpdate = (event) => {
    event.preventDefault();
    setEditing(false);
    updateHandler({ commentId: comment.id, body: commentBody });
  };
  const onKeyUp = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      onUpdate(event);
    }
  };

  const [replying, setReplying] = useState(false);
  const onReply = ({ body }) => {
    setReplying(false);
    replyHandler({ replyTo: comment.id, body });
  };

  const author = getUsers().find(({ id }) => id === comment.authorId);
  const isTheAuthor = author.id === currentUser.id;

  return (
    <div>
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
                editHandler={() => setEditing(true)}
                replyHandler={() => setReplying(true)}
                deleteHandler={deleteHandler}
              />
            </div>
            <div className="mt-4">
              {editing ? (
                <form onSubmit={onUpdate}>
                  <textarea
                    className="w-full resize-none rounded-md border border-gray-light px-4 py-2 transition focus-within:border-gray hover:border-gray focus:outline-none"
                    placeholder="Update the comment..."
                    rows="3"
                    value={commentBody}
                    onChange={(event) => setCommentBody(event.target.value)}
                    onKeyUp={onKeyUp}
                  ></textarea>
                  <div className="flex justify-end">
                    <FormSubmitButton disabled={!commentBody.length}>
                      Update
                    </FormSubmitButton>
                  </div>
                </form>
              ) : (
                <div>{commentBody}</div>
              )}
            </div>
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
          <ActionButtons
            canManage={isTheAuthor}
            editHandler={() => setEditing(true)}
            replyHandler={() => setReplying(true)}
            deleteHandler={deleteHandler}
          />
        </div>
      </Card>
      {replying && (
        <div className="mt-4 border-l border-blue-light pl-4 tablet:ml-10 tablet:pl-8">
          <ReplyForm onSend={onReply} onCancel={() => setReplying(false)} />
        </div>
      )}
    </div>
  );
};

export default Comment;
