import { IconReply } from "../../Icons";

export const ReplyButton = ({ className, onClick }) => (
  <button
    className={`flex items-center gap-2 font-bold text-blue transition hover:text-blue-light ${className}`}
    onClick={onClick}
  >
    <IconReply className="h-3 w-3" />
    <span>Reply</span>
  </button>
);
