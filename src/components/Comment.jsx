import { useState } from "react";
import { Card } from "./Card";
import { format } from "timeago.js";
import Avatar from "./Avatar";
import Votes from "./Comment/Votes";
import ActionButtons from "./ActionButtons";
import {
  getCurrentUser,
  upvoteComment,
  downvoteComment,
  currentUserUpvotedComment,
  currentUserDownvotedComment,
  getVotesForComment,
  updateComment,
} from "../commentsManager";

export default function Comment({
  comment,
  parentCommentId,
  onUpdate,
  onDelete,
}) {
  const isLegacyDateFormat = isNaN(Date.parse(comment.createdAt));

  const isTheAuthor = comment.user.username === getCurrentUser().username;

  //#region Vote logic
  //#region Upvote
  const [upvoted, setUpvoted] = useState(currentUserUpvotedComment(comment.id));

  const getUpvotesCount = () =>
    getVotesForComment(comment.id).filter(({ vote }) => vote === "up").length;

  const [upvotesCount, setUpvotesCount] = useState(getUpvotesCount());

  const upvoteHandler = () => {
    upvoteComment(comment.id, comment.user.username);
    refreshVotes();
  };
  //#endregion

  //#region Downvote
  const [downvoted, setDownvoted] = useState(
    currentUserDownvotedComment(comment.id)
  );

  const getDownvotesCount = () =>
    getVotesForComment(comment.id).filter(({ vote }) => vote === "down").length;

  const [downvotesCount, setDownvotesCount] = useState(getUpvotesCount());

  const downvoteHandler = () => {
    downvoteComment(comment.id, comment.user.username);
    refreshVotes();
  };
  //#endregion

  const refreshVotes = () => {
    setUpvoted(currentUserUpvotedComment(comment.id));
    setUpvotesCount(getUpvotesCount());
    setDownvoted(currentUserDownvotedComment(comment.id));
    setDownvotesCount(getDownvotesCount());
  };
  //#endregion Vote logic

  //#region Edit comment
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const startEditing = () => {
    setContent(comment.content);
    setEditing(true);
  };

  const updateHandler = (event) => {
    event.preventDefault();
    updateComment(content, comment.id, parentCommentId);
    setEditing(false);
    onUpdate();
  };

  const onKeyUp = (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      updateHandler(event);
    }
  };
  //#endregion

  return (
    <Card className="flex items-start gap-4">
      <div className="hidden tablet:block">
        <Votes
          initialScore={comment.score}
          upvotesCount={upvotesCount}
          downvotesCount={downvotesCount}
          upvoted={upvoted}
          downvoted={downvoted}
          onUpvote={upvoteHandler}
          onDownvote={downvoteHandler}
        />
      </div>
      <div className="grid w-full gap-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar user={comment.user} />
            <span className="font-bold text-gray">{comment.user.username}</span>
            {isTheAuthor && (
              <span className="h-6 rounded bg-blue px-2 text-sm lowercase text-white">
                you
              </span>
            )}
            <time
              className="text-gray/600"
              dateTime={isLegacyDateFormat ? "" : comment.createdAt}
            >
              {isLegacyDateFormat
                ? comment.createdAt
                : format(comment.createdAt)}
            </time>
          </div>
          <div className="hidden tablet:block">
            <ActionButtons
              canManage={isTheAuthor}
              editHandler={startEditing}
              replyHandler={() => {}}
              deleteHandler={() =>
                onDelete({ commentId: comment.id, parentCommentId })
              }
            />
          </div>
        </div>

        {/* Show content or Update content form  */}
        {(() => {
          if (editing) {
            return (
              <form onSubmit={updateHandler}>
                <textarea
                  className="w-full resize-none rounded-md border border-gray-light px-4 py-2 transition focus-within:border-gray hover:border-gray focus:outline-none"
                  placeholder="Edit comment..."
                  rows="3"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  onKeyUp={onKeyUp}
                ></textarea>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setEditing(false)}>Cancel</button>
                  <button type="submit">Update</button>
                </div>
              </form>
            );
          }

          // Show comment content
          return (
            <div>
              {comment.replyingTo && (
                <span className="mr-1 font-bold text-blue">
                  @{comment.replyingTo}
                </span>
              )}
              {comment.content}
            </div>
          );
        })()}

        <div className="flex items-center justify-between tablet:hidden">
          <Votes
            initialScore={comment.score}
            upvotesCount={upvotesCount}
            downvotesCount={downvotesCount}
            upvoted={upvoted}
            downvoted={downvoted}
            onUpvote={upvoteHandler}
            onDownvote={downvoteHandler}
          />
          <ActionButtons
            canManage={isTheAuthor}
            editHandler={startEditing}
            replyHandler={() => {}}
            deleteHandler={() => {}}
          />
        </div>
      </div>
    </Card>
  );
}