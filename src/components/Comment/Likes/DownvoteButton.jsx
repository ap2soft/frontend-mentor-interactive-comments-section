import { IconMinus } from "../../Icons";
import AbstractButton from "./AbstractButton";

const DownvoteButton = ({ className, onClick }) => (
  <AbstractButton
    className={`rounded-tr-md rounded-br-md tablet:rounded-tr-none tablet:rounded-bl-md ${className}`}
    onClick={onClick}
  >
    <IconMinus className="h-3 w-3" />
  </AbstractButton>
);

export default DownvoteButton;
