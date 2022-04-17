import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { ReplyButton } from "./ReplyButton";

export const Buttons = ({
  className,
  canManage,
  deleteHandler,
  editHandler,
  replyHandler,
}) => (
  <div className={`flex ${className}`}>
    {canManage ? (
      <div className="flex shrink-0 gap-4 tablet:gap-6">
        <DeleteButton onClick={deleteHandler} />
        <EditButton onClick={editHandler} />
      </div>
    ) : (
      <ReplyButton onClick={replyHandler} />
    )}
  </div>
);
