import { useState } from "react";
import {
  sendComment,
  updateComment,
  deleteComment,
  getCurrentUser,
  getAllComments,
} from "../commentsManager";
import CommentForm from "./Comment/Form";
import { List as CommentList } from "./Comment/List";
import { Seeder as CommentSeeder } from "./Comment/Seeder";

const App = () => {
  const [comments, setComments] = useState(getAllComments());
  const currentUser = getCurrentUser();

  const reloadComments = () => setComments(getAllComments());

  const sendHandler = ({ body }) => {
    sendComment({
      body,
      authorId: currentUser.id,
      replyTo: null,
      id: Date.now(),
      createdAt: new Date(),
    });

    reloadComments();
  };

  const replyHandler = ({ replyTo, body }) => {
    sendComment({
      id: Date.now(),
      replyTo,
      authorId: currentUser.id,
      body,
      createdAt: new Date(),
    });

    reloadComments();
  };

  const updateHandler = ({ commentId, body }) => {
    updateComment(commentId, body);
  };

  const deleteHandler = (commentId) => {
    deleteComment(commentId);

    reloadComments();
  };

  return (
    <div className="mx-auto max-w-2xl">
      <CommentList
        comments={comments}
        currentUser={currentUser}
        onReply={replyHandler}
        onUpdate={updateHandler}
        onDelete={deleteHandler}
      />

      <CommentForm className="mt-6" onSend={sendHandler} />

      <CommentSeeder className="mt-6 border-y border-blue-light py-4" />
    </div>
  );
};

export default App;
