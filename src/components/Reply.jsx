import Comment from "./Comment";

export default function Reply({ reply, parentCommentId, onUpdate, onDelete }) {
  return (
    <Comment
      comment={reply}
      parentCommentId={parentCommentId}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
