import DownvoteButton from "./DownvoteButton";
import UpvoteButton from "./UpvoteButton";

const Votes = ({
  upvotesCount,
  downvotesCount,
  upvoted,
  downvoted,
  onUpvote,
  onDownvote,
  className,
}) => (
  <div className={className}>
    <div className="flex tablet:flex-col">
      <UpvoteButton voted={upvoted} onClick={onUpvote} />
      <span className="bg-gray-light p-2 text-center font-bold text-blue">
        {upvotesCount - downvotesCount}
      </span>
      <DownvoteButton voted={downvoted} onClick={onDownvote} />
    </div>
  </div>
);

export default Votes;
