import DownvoteButton from "./DownvoteButton";
import UpvoteButton from "./UpvoteButton";

const Votes = ({
  initialScore,
  upvotesCount,
  downvotesCount,
  upvoted,
  downvoted,
  onUpvote,
  onDownvote,
}) => (
  <div className="flex tablet:flex-col">
    <UpvoteButton voted={upvoted} onClick={onUpvote} />
    <span className="bg-gray-light p-2 text-center font-bold text-blue">
      {initialScore + upvotesCount - downvotesCount}
    </span>
    <DownvoteButton voted={downvoted} onClick={onDownvote} />
  </div>
);

export default Votes;
