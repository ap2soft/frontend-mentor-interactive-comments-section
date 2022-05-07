import { useCallback, useEffect } from "react";

const DeleteCommentConfirmationModal = ({ show, onCancel, onConfirm }) => {
  if (!show) {
    return <></>;
  }

  const keyupHandler = useCallback((event) => {
    if (event.key === "Escape") {
      onCancel();
    } else if (event.key === "Enter") {
      onConfirm();
    }
  });

  useEffect(() => {
    document.addEventListener("keyup", keyupHandler, false);

    return () => document.removeEventListener("keyup", keyupHandler, false);
  });

  return (
    <div className="fixed inset-0 bg-gray-dark/60 transition">
      <div className="grid h-full w-full place-content-center">
        <div className="m-4 max-w-sm rounded-md bg-white p-8">
          <header>
            <h1 className="text-lg font-bold text-gray-dark">Delete comment</h1>
          </header>
          <main className="mt-4 tracking-wide">
            Are you sure want to delete this comment? This will remove the
            comment and can't be undone.
          </main>
          <footer className="mt-4 flex items-center justify-between">
            <button
              className="rounded-md bg-gray px-6 py-2 font-bold uppercase text-white"
              onClick={onCancel}
            >
              No, Cancel
            </button>
            <button
              className="rounded-md bg-red px-6 py-2 font-bold uppercase text-white"
              onClick={onConfirm}
            >
              Yes, Delete
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DeleteCommentConfirmationModal;
