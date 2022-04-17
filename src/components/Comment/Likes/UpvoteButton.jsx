import { IconPlus } from "../../Icons";

export default function UpvoteButton({ className, onClick }) {
  return (
    <button
      className={`grid h-10 tablet:h-8 w-10 place-content-center bg-gray-light font-bold text-blue-light transition hover:text-blue ${className}`}
      onClick={onClick}
    >
      <IconPlus className="h-3 w-3" />
    </button>
  );
}
