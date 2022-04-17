import Comment from "./Comment";

export default function List({ comments, currentUser }) {
  return (
    <div className="flex flex-col gap-4">
      {!comments.length > 0 && (
        <p className="text-center text-sm italic text-gray">No comments yet.</p>
      )}
      {comments.map((comment) => (
        <Comment comment={comment} currentUser={currentUser} key={comment.id} />
      ))}
    </div>
  );
}
