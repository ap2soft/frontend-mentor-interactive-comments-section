import CommentForm from "./CommentForm";

export default function ReplyForm({ show, currentUser, onSend, onCancel }) {
  if (show) {
    return (
      <CommentForm
        currentUser={currentUser}
        submitButtonText="Reply"
        placeholder="Reply..."
        onSend={onSend}
        onCancel={onCancel}
      />
    );
  }
}
