import DownvoteButton from "./DownvoteButton";
import UpvoteButton from "./UpvoteButton";

export default function Likes({
  likesCount,
  canManage,
  onUpvote,
  onDownvote,
  className,
}) {
  const upvoteHandler = () => canManage && onUpvote && onUpvote();
  const downvoteHandler = () => canManage && onDownvote && onDownvote();

  return (
    <div className={className}>
      <div className="flex tablet:flex-col">
        <UpvoteButton
          className="rounded-tl-md rounded-bl-md tablet:rounded-bl-none tablet:rounded-tr-md"
          onClick={upvoteHandler}
        />
        <span className="bg-gray-light p-2 text-center font-bold text-blue">
          {likesCount}
        </span>
        <DownvoteButton
          className="rounded-tr-md rounded-br-md tablet:rounded-tr-none tablet:rounded-bl-md"
          onClick={downvoteHandler}
        />
      </div>
    </div>
  );
}
