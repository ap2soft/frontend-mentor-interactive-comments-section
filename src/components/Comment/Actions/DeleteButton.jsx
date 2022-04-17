import { IconDelete } from "../../Icons";

export const DeleteButton = ({ className, onClick }) => (
  <button
    className={`flex items-center gap-2 font-bold text-red transition hover:text-red-light ${className}`}
    onClick={onClick}
  >
    <IconDelete className="h-3 w-3" />
    <span>Delete</span>
  </button>
);
