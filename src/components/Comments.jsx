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
  const sendHandler = ({ context, originalCommentId, replyingTo }) => {
    if (originalCommentId) {
      // TODO: Reply
    } else {
      sendComment({
        id: Date.now(),
        context,
        user: currentUser,
        score: 0,
        replies: [],
        createdAt: new Date(),
      });

      reloadComments();
    }
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
    <div>
      <div className="grid gap-4">
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="">
              <div className="grid gap-4">
                <Comment
                  comment={comment}
                  onUpdate={reloadComments}
                  onDelete={setCommentToDelete}
                />
                <Replies
                  comment={comment}
                  onUpdate={reloadComments}
                  onDelete={setCommentToDelete}
                />
              </div>
            </div>
          );
        })}
        <div className="mt-4">
          <NewCommentForm submitButtonText="Send" onSend={sendHandler} />
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
