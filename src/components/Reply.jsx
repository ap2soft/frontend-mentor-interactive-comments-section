import Comment from "./Comment";

export default function Reply({ reply, parentCommentId, onUpdate }) {
  return (
    <Comment
      comment={reply}
      parentCommentId={parentCommentId}
      onUpdate={onUpdate}
    />
  );
}
