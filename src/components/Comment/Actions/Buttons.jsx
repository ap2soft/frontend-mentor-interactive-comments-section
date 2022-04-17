import DeleteButton from "./Delete";
import EditButton from "./Edit";
import ReplyButton from "./Reply";

export default function Buttons({ className, canManage }) {
  return (
    <div className={`flex ${className}`}>
      {canManage ? (
        <div className="flex shrink-0 gap-4 tablet:gap-6">
          <DeleteButton />
          <EditButton />
        </div>
      ) : (
        <ReplyButton />
      )}
    </div>
  );
}
