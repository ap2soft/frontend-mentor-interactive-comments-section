import { useEffect, useState } from "react";
import {
  getComments,
  getCurrentUser,
  reseedDatabase,
  sendComment,
} from "../commentsManager";
import Comment from "./Comment";
import Replies from "./Replies";
import NewCommentForm from "./NewCommentForm";

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

  const reloadComments = () => setComments(getComments());

  return (
    <div className="grid gap-4">
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="">
            <div className="grid gap-4">
              <Comment comment={comment} onUpdate={reloadComments} />
              <Replies comment={comment} onUpdate={reloadComments} />
            </div>
          </div>
        );
      })}
      <div className="mt-4">
        <NewCommentForm submitButtonText="Send" onSend={sendHandler} />
      </div>
    </div>
  );
}
