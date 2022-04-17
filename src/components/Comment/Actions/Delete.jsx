import { IconDelete } from "../../Icons";

export default function Delete({ classNames }) {
  return (
    <button
      className={`flex items-center gap-2 font-bold text-red transition hover:text-red-light ${classNames}`}
    >
      <IconDelete className="h-3 w-3" />
      <span>Delete</span>
    </button>
  );
}
