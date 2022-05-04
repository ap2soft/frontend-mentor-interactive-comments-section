import Reply from "./Reply";

const Replies = ({ comment, onUpdate, onDelete }) => {
  if (!comment.replies.length) return;

  return (
    <div className="grid gap-4 border-l border-gray/30 pl-4 tablet:ml-10 tablet:pl-10">
      {comment.replies.map((reply) => (
        <div key={reply.id}>
          <Reply
            reply={reply}
            parentCommentId={comment.id}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default Replies;
