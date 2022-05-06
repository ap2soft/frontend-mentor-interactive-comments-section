import CommentForm from "./CommentForm";

export default function NewCommentForm({ currentUser, onSend }) {
  return (
    <CommentForm
      currentUser={currentUser}
      submitButtonText="Send"
      placeholder="Add a comment..."
      onSend={onSend}
    />
  );
}
