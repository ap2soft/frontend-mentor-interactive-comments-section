import { useEffect, useState } from "react";
import {
  sendComment,
  updateComment,
  deleteComment,
  getCurrentUser,
  getComments,
  reseedDatabase,
} from "../commentsManager";
import CommentForm from "./Comment/CommentForm";
import { Card } from "./Card";
import { List as CommentList } from "./Comment/List";
import { Seeder as CommentSeeder } from "./Comment/Seeder";

const App = () => {
  const [comments, setComments] = useState(getComments());
  const topLevelComments = []; //comments.filter(({ replyTo }) => !replyTo);
  const currentUser = getCurrentUser();

  const reloadComments = () => setComments(getComments());

  const sendHandler = ({ content }) => {
    setComments([
      ...comments,
      {
        id: Date.now(),
        content,
        user: getCurrentUser(),
        score: 0,
        createdAt: new Date(),
        replies: [],
      },
    ]);

    reloadComments();
  };

  const updateHandler = ({ commentId, body }) => updateComment(commentId, body);

  const deleteHandler = (commentId) => {
    deleteComment(commentId);

    reloadComments();
  };

  useEffect(() => {
    if (!comments.length) reseedDatabase();
  });

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
        onReply={sendHandler}
        onUpdate={updateHandler}
        onDelete={deleteHandler}
      />

      <CommentForm className="mt-6" onSend={sendHandler} />

      <CommentSeeder className="mt-6 border-y border-blue-light py-4" />
    </div>
  );
};

export default App;
