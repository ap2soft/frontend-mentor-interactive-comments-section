import Comment from "./Comment";

export default function Reply({
  comment,
  currentUser,
  parentCommentId,
  onUpdate,
  onDelete,
  onReply,
}) {
  return (
    <Comment
      comment={comment}
      currentUser={currentUser}
      parentCommentId={parentCommentId}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onReply={onReply}
    />
  );
}
