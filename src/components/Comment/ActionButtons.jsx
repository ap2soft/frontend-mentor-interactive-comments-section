import { IconDelete, IconEdit, IconReply } from "../Icons";

const DeleteAndEditButtons = ({ deleteHandler, editHandler }) => {
  return (
    <div className="flex gap-4">
      <DeleteButton onClick={deleteHandler} />
      <EditButton onClick={editHandler} />
    </div>
  );
};

const DeleteButton = ({ onClick }) => {
  return (
    <button
      className="flex items-center gap-2 font-bold text-red transition hover:text-red-light"
      onClick={onClick}
    >
      <IconDelete className="h-3 w-3" />
      <span>Delete</span>
    </button>
  );
};

const EditButton = ({ onClick }) => {
  return (
    <button
      className="flex items-center gap-2 font-bold text-blue transition hover:text-blue-light"
      onClick={onClick}
    >
      <IconEdit className="h-3 w-3" />
      <span>Edit</span>
    </button>
  );
};

const ReplyButton = ({ onClick }) => {
  return (
    <button
      className="flex items-center gap-2 font-bold text-blue transition hover:text-blue-light"
      onClick={onClick}
    >
      <IconReply className="h-3 w-3" />
      <span>Reply</span>
    </button>
  );
};

const ActionButtons = ({
  canManage,
  editHandler,
  replyHandler,
  deleteHandler,
}) => {
  if (canManage) {
    return (
      <div className="flex">
        <DeleteAndEditButtons
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      </div>
    );
  } else {
    return <ReplyButton onClick={replyHandler} />;
  }
};

export default ActionButtons;
