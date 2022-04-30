import { useState } from "react";
import {
  sendComment,
  updateComment,
  deleteComment,
  getCurrentUser,
  getAllComments,
} from "../commentsManager";
import CommentForm from "./Comment/Form";
import { Card } from "./Card";
import { List as CommentList } from "./Comment/List";
import { Seeder as CommentSeeder } from "./Comment/Seeder";

const App = () => {
  const [comments, setComments] = useState(getAllComments());
  const topLevelComments = comments.filter(({ replyTo }) => !replyTo);
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

  const updateHandler = ({ commentId, body }) => updateComment(commentId, body);

  const deleteHandler = (commentId) => {
    deleteComment(commentId);

    reloadComments();
  };

  return (
    <div className="mx-auto max-w-2xl">
      {!topLevelComments.length && (
        <Card className="text-center text-sm italic text-gray-dark">
          No comments yet
        </Card>
      )}
      <CommentList
        comments={topLevelComments}
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
