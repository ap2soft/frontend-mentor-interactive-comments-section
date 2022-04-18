const ConfirmationModal = ({
  show,
  title,
  body,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onConfirm,
}) => (
  <div
    className={`fixed inset-0 bg-gray-dark/60 ${!show && "hidden"} transition`}
  >
    <div className="grid h-full w-full place-content-center">
      <div className="m-4 max-w-sm rounded-md bg-white p-8">
        <header className="">
          <h1 className="text-lg font-bold text-gray-dark">
            {title || Confirmation}
          </h1>
        </header>
        {body && <main className="mt-4 tracking-wide">{body}</main>}
        <footer className="mt-4 flex items-center justify-between">
          <button
            className="rounded-md bg-gray px-4 py-2 font-bold uppercase text-white"
            onClick={onCancel}
          >
            {cancelButtonText || "Cancel"}
          </button>
          <button
            className="rounded-md bg-red px-4 py-2 font-bold uppercase text-white"
            onClick={onConfirm}
          >
            {confirmButtonText || "Confirm"}
          </button>
        </footer>
      </div>
    </div>
  </div>
);

export default ConfirmationModal;