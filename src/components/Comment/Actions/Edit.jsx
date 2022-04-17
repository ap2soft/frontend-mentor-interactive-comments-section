import { IconEdit } from "../../Icons";

export default function Edit({ classNames }) {
  return (
    <button
      className={`flex items-center gap-2 font-bold text-blue transition hover:text-blue-light ${classNames}`}
    >
      <IconEdit className="h-3 w-3" />
      <span>Edit</span>
    </button>
  );
}
