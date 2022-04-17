import Comment from "./Comment";

const deleteHandler = (commentId) => {
  // TODO: confirmation modal
  console.log("deleting", commentId);
};

export const List = ({ comments, currentUser }) => (
  <div className="flex flex-col gap-4">
    {!comments.length > 0 && (
      <p className="text-center text-sm italic text-gray">No comments yet.</p>
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
);
