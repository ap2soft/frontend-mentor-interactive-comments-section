import DownvoteButton from "./DownvoteButton";
import UpvoteButton from "./UpvoteButton";

export default function Likes({ likesCount, canManage, onUpvote, onDownvote }) {
  const upvoteHandler = () => canManage && onUpvote && onUpvote();
  const downvoteHandler = () => canManage && onDownvote && onDownvote();

  return (
    <div className="flex">
      <UpvoteButton className="rounded-l-md" onClick={upvoteHandler} />

      <span className="bg-gray-light p-2 font-bold text-blue">
        {likesCount}
      </span>

      <DownvoteButton className="rounded-r-md" onClick={downvoteHandler} />
    </div>
  );
}
