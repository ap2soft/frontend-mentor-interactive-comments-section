import { useState } from "react";
import { format } from "timeago.js";
import { Card } from "../Card";
import Avatar from "../User/Avatar";
import Votes from "./Votes";
import ActionButtons from "./ActionButtons";
import ReplyForm from "./Forms/ReplyForm";
import UpdateCommentForm from "./Forms/UpdateCommentForm";
import {
  getCurrentUser,
  updateComment,
  getUpvotesCount,
  currentUserUpvotedComment,
  upvoteComment,
  getDownvotesCount,
  currentUserDownvotedComment,
  downvoteComment,
} from "../../commentsManager";

const CurrentUserBadge = ({ show }) => {
  if (show) {
    return (
      <span className="h-6 rounded bg-blue px-2 text-sm lowercase text-white">
        you
      </span>
    );
  }
};

const DateTimeInfo = ({ date, className }) => {
  const isLegacyDateFormat = isNaN(Date.parse(date));

  return (
    <time className={className} dateTime={isLegacyDateFormat ? "" : date}>
      {isLegacyDateFormat ? date : format(date)}
    </time>
  );
};

const CommentContent = ({ show, comment }) => {
  if (show) {
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
  }
};

export default function Comment({
  comment,
  parentCommentId,
  onUpdate,
  onDelete,
  onReply,
}) {
  const currentUser = getCurrentUser();

  const isTheAuthor = comment.user.username === currentUser.username;

  //#region Vote logic
  //#region Upvote
  const [upvoted, setUpvoted] = useState(currentUserUpvotedComment(comment.id));

  const [upvotesCount, setUpvotesCount] = useState(getUpvotesCount(comment.id));

  const upvoteHandler = () => {
    upvoteComment(comment.id, comment.user.username);
    refreshVotes();
  };
  //#endregion

  //#region Downvote
  const [downvoted, setDownvoted] = useState(
    currentUserDownvotedComment(comment.id)
  );

  const [downvotesCount, setDownvotesCount] = useState(
    getDownvotesCount(comment.id)
  );

  const downvoteHandler = () => {
    downvoteComment(comment.id, comment.user.username);
    refreshVotes();
  };
  //#endregion

  const refreshVotes = () => {
    setUpvoted(currentUserUpvotedComment(comment.id));
    setUpvotesCount(getUpvotesCount(comment.id));
    setDownvoted(currentUserDownvotedComment(comment.id));
    setDownvotesCount(getDownvotesCount(comment.id));
  };
  //#endregion Vote logic

  //#region Edit comment
  const [editing, setEditing] = useState(false);

  const updateHandler = (content) => {
    updateComment(content, comment.id, parentCommentId);
    setEditing(false);
    onUpdate();
  };
  //#endregion

  //#region Replying
  const [replying, setReplying] = useState(false);

  const replyHandler = ({ content }) => {
    onReply({
      content,
      replyToCommentId: parentCommentId || comment.id,
      replyingTo: comment.user.username,
    });

    setReplying(false);
  };
  //#endregion

  return (
    <div className="grid gap-4">
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
              <span className="font-bold text-gray">
                {comment.user.username}
              </span>
              <CurrentUserBadge show={isTheAuthor} />
              <DateTimeInfo className="text-gray/60" date={comment.createdAt} />
            </div>
            <div className="hidden tablet:block">
              <ActionButtons
                canManage={isTheAuthor}
                editHandler={() => setEditing(true)}
                replyHandler={() => setReplying(true)}
                deleteHandler={() =>
                  onDelete({ commentId: comment.id, parentCommentId })
                }
              />
            </div>
          </div>

          <CommentContent show={!editing} comment={comment} />
          <UpdateCommentForm
            show={isTheAuthor && editing}
            defaultContent={comment.content}
            onUpdate={updateHandler}
            onCancel={() => setEditing(false)}
          />

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
              editHandler={() => setEditing(true)}
              replyHandler={() => setReplying(true)}
              deleteHandler={() =>
                onDelete({ commentId: comment.id, parentCommentId })
              }
            />
          </div>
        </div>
      </Card>

      <ReplyForm
        show={replying}
        currentUser={currentUser}
        onSend={replyHandler}
        onCancel={() => setReplying(false)}
      />
    </div>
  );
}
