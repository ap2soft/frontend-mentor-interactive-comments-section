import { IconPlus } from "../../Icons";
import AbstractButton from "./AbstractButton";

const UpvoteButton = ({ className, onClick }) => (
  <AbstractButton
    className={`rounded-tl-md rounded-bl-md tablet:rounded-bl-none tablet:rounded-tr-md ${className}`}
    onClick={onClick}
  >
    <IconPlus className="h-3 w-3" />
  </AbstractButton>
);

export default UpvoteButton;
