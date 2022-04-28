import { useState } from "react";
import Comment from "./Comment";
import ConfirmationModal from "../Modals/ConfirmationModal";

export const List = ({ comments, currentUser, onDeleteComment }) => {
  const [deleteCommentId, setDeleteCommentId] = useState(null);

  const deleteHandler = (commentId) => setDeleteCommentId(commentId);
  const cancelDelete = () => setDeleteCommentId(null);
  const processDelete = () => {
    onDeleteComment(deleteCommentId);
    setDeleteCommentId(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        {!comments.length > 0 && (
          <p className="text-center text-sm italic text-gray">
            No comments yet.
          </p>
        )}
        {comments.map((comment) => (
          <Comment
            comment={comment}
            currentUser={currentUser}
            key={comment.id}
            deleteHandler={() => deleteHandler(comment.id)}
          />
        ))}
      </div>
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
    </div>
  );
};
