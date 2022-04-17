import { IconEdit } from "../../Icons";

export const EditButton = ({ className, onClick }) => (
  <button
    className={`flex items-center gap-2 font-bold text-blue transition hover:text-blue-light ${className}`}
    onClick={onClick}
  >
    <IconEdit className="h-3 w-3" />
    <span>Edit</span>
  </button>
);
