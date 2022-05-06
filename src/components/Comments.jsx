import { useEffect, useState } from "react";
import {
  getComments,
  getCurrentUser,
  reseedDatabase,
  sendComment,
  deleteComment,
} from "../commentsManager";
import Comment from "./Comment";
import Replies from "./Replies";
import NewCommentForm from "./NewCommentForm";
import DeleteCommentConfirmationModal from "./DeleteCommentConfirmationModal";

export default function Comments() {
  const currentUser = getCurrentUser();

  const [comments, setComments] = useState(getComments());

  useEffect(() => {
    // Reseed database from data.json
    if (!comments.length) {
      (async function () {
        await reseedDatabase();
        reloadComments();
      })();
    }
  });

  //#region Send comment
  const sendHandler = ({ content, replyToCommentId, replyingTo }) => {
    let comment = {
      id: Date.now(),
      user: currentUser,
      score: 0,
      createdAt: new Date(),
      content,
    };

    if (replyToCommentId) {
      comment = { ...comment, replyingTo };
    } else {
      comment = { ...comment, replies: [] };
    }

    sendComment(comment, replyToCommentId);

    reloadComments();
  };
  //#endregion

  //#region Delete comment
  const [commentToDelete, setCommentToDelete] = useState({});

  const deleteHandler = () => {
    deleteComment(commentToDelete);
    setCommentToDelete({});
    reloadComments();
  };
  //#endregion

  const reloadComments = () => setComments(getComments());

  return (
    <div className="mx-auto max-w-2xl">
      <div className="grid gap-4">
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="">
              <div className="grid gap-4">
                <Comment
                  comment={comment}
                  onUpdate={reloadComments}
                  onDelete={setCommentToDelete}
                  onReply={sendHandler}
                />
                <Replies
                  comment={comment}
                  currentUser={currentUser}
                  onUpdate={reloadComments}
                  onDelete={setCommentToDelete}
                  onReply={sendHandler}
                />
              </div>
            </div>
          );
        })}
        <div className="mt-4">
          <NewCommentForm currentUser={currentUser} onSend={sendHandler} />
        </div>
      </div>

      {(() => {
        if (commentToDelete.commentId) {
          return (
            <DeleteCommentConfirmationModal
              onCancel={() => setCommentToDelete({})}
              onConfirm={deleteHandler}
            />
          );
        }
      })()}
    </div>
  );
}
