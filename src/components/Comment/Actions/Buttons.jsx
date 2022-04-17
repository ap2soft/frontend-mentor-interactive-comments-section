import DeleteButton from "./Delete";
import EditButton from "./Edit";
import ReplyButton from "./Reply";

export default function Buttons({ classNames, canManage }) {
  return (
    <div className={`flex ${classNames}`}>
      {canManage ? (
        <div className="flex shrink-0 gap-2">
          <DeleteButton />
          <EditButton />
        </div>
      ) : (
        <ReplyButton />
      )}
    </div>
  );
}
