import { IconDelete, IconEdit, IconReply } from "./Icons";

const ActionButtons = ({
  canManage,
  editing,
  editHandler,
  replyHandler,
  deleteHandler,
}) => {
  return (
    <div className="flex">
      {(() => {
        if (canManage) {
          // Delete & Edit buttons
          return (
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 font-bold text-red transition hover:text-red-light"
                onClick={deleteHandler}
              >
                <IconDelete className="h-3 w-3" />
                <span>Delete</span>
              </button>
              <button
                className="flex items-center gap-2 font-bold text-blue transition hover:text-blue-light"
                onClick={editHandler}
              >
                <IconEdit className="h-3 w-3" />
                <span>Edit</span>
              </button>
            </div>
          );
        }

        // Reply button
        return (
          <button
            className="flex items-center gap-2 font-bold text-blue transition hover:text-blue-light"
            onClick={replyHandler}
          >
            <IconReply className="h-3 w-3" />
            <span>Reply</span>
          </button>
        );
      })()}
    </div>
  );
};

export default ActionButtons;
