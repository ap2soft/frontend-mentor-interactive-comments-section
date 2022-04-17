import { IconDelete } from "../../Icons";

export default function Delete({ className }) {
  return (
    <button
      className={`flex items-center gap-2 font-bold text-red transition hover:text-red-light ${className}`}
    >
      <IconDelete className="h-3 w-3" />
      <span>Delete</span>
    </button>
  );
}
