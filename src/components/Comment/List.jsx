import { useState } from "react";
import Comment from "./Comment";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { getRepliesFor } from "../../commentsManager";

export const List = ({
  className,
  comments,
  currentUser,
  onReply,
  onUpdate,
  onDelete,
}) => {
  const [deleteCommentId, setDeleteCommentId] = useState(null);

  const deleteHandler = (commentId) => setDeleteCommentId(commentId);
  const cancelDelete = () => setDeleteCommentId(null);
  const processDelete = () => {
    onDelete(deleteCommentId);
    setDeleteCommentId(null);
  };

  return (
    <div>
      <div className={`${className} flex flex-col gap-4`}>
        {comments.map((comment) => (
          <div
            key={`comment-wrapper-${comment.id}`}
            className={
              comment.replyTo &&
              "border-l border-blue-light pl-4 tablet:ml-10 tablet:pl-8"
            }
          >
            <Comment
              comment={comment}
              currentUser={currentUser}
              key={comment.id}
              replyHandler={onReply}
              updateHandler={onUpdate}
              deleteHandler={() => deleteHandler(comment.id)}
            />
            {getRepliesFor(comment.id) && (
              <List
                key={`replies-for-${comment.id}`}
                className="mt-4"
                comments={getRepliesFor(comment.id)}
                currentUser={currentUser}
                onReply={onReply}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            )}
          </div>
        ))}
      </div>
      {deleteCommentId && (
        <ConfirmationModal
          show={deleteCommentId}
          title="Delete comment"
          body="Are you sure want to delete this comment? This will remove the comment and can't be undone."
          cancelButtonText="No, cancel"
          confirmButtonText="Yes, delete"
          confirmButtonClasses="bg-red"
          onCancel={cancelDelete}
          onConfirm={processDelete}
        />
      )}
    </div>
  );
};
