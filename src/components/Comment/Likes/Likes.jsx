import DownvoteButton from "./DownvoteButton";
import UpvoteButton from "./UpvoteButton";

const Likes = ({ likesCount, canManage, onUpvote, onDownvote, className }) => (
  <div className={className}>
    <div className="flex tablet:flex-col">
      <UpvoteButton onClick={() => canManage && onUpvote && onUpvote()} />
      <span className="bg-gray-light p-2 text-center font-bold text-blue">
        {likesCount}
      </span>
      <DownvoteButton onClick={() => canManage && onDownvote && onDownvote()} />
    </div>
  </div>
);

export default Likes;
