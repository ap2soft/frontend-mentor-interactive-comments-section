import { IconReply } from "../../Icons";

export default function Reply({ className }) {
  return (
    <button
      className={`flex items-center gap-2 font-bold text-blue transition hover:text-blue-light ${className}`}
    >
      <IconReply className="h-3 w-3" />
      <span>Reply</span>
    </button>
  );
}
