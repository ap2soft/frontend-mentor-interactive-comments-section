import { IconPlus } from "../../Icons";
import AbstractButton from "./AbstractButton";

const UpvoteButton = ({ className, voted, onClick }) => (
  <AbstractButton
    className={`rounded-tl-md rounded-bl-md tablet:rounded-bl-none tablet:rounded-tr-md ${className}`}
    active={voted}
    onClick={onClick}
  >
    <IconPlus className="h-3 w-3" />
  </AbstractButton>
);

export default UpvoteButton;
