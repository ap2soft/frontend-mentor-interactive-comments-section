import { IconPlus, IconMinus } from "../Icons";

const AbstractButton = ({ className, active, onClick, children: slot }) => {
  const activeClasses = active ? "text-blue" : "text-blue-light";

  return (
    <button
      className={`grid h-10 w-10 place-content-center bg-gray-light font-bold ${activeClasses} transition hover:text-blue tablet:h-8 ${className}`}
      onClick={onClick}
    >
      {slot}
    </button>
  );
};

const UpvoteButton = ({ className, voted, onClick }) => (
  <AbstractButton
    className={`rounded-tl-md rounded-bl-md tablet:rounded-bl-none tablet:rounded-tr-md ${className}`}
    active={voted}
    onClick={onClick}
  >
    <IconPlus className="h-3 w-3" />
  </AbstractButton>
);

const DownvoteButton = ({ className, voted, onClick }) => (
  <AbstractButton
    className={`rounded-tr-md rounded-br-md tablet:rounded-tr-none tablet:rounded-bl-md ${className}`}
    active={voted}
    onClick={onClick}
  >
    <IconMinus className="h-3 w-3" />
  </AbstractButton>
);

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
