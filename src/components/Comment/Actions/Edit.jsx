import { IconEdit } from "../../Icons";

export default function Edit({ className }) {
  return (
    <button
      className={`flex items-center gap-2 font-bold text-blue transition hover:text-blue-light ${className}`}
    >
      <IconEdit className="h-3 w-3" />
      <span>Edit</span>
    </button>
  );
}
