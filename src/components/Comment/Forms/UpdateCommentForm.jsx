import { useState } from "react";

const UpdateCommentForm = ({ show, defaultContent, onUpdate, onCancel }) => {
  const [content, setContent] = useState(defaultContent);

  const updateHandler = (event) => {
    event.preventDefault();
    onUpdate(content);
  };

  const onKeyUp = (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      updateHandler(event);
    }
  };

  if (show) {
    return (
      <form onSubmit={updateHandler}>
        <textarea
          className="w-full resize-none rounded-md border border-gray-light px-4 py-2 transition focus-within:border-gray hover:border-gray focus:outline-none"
          placeholder="Edit comment..."
          rows="3"
          autoFocus={true}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onKeyUp={onKeyUp}
        ></textarea>
        <div className="mt-4 flex justify-end gap-4">
          <button
            className="text-blue-light underline transition hover:text-blue"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue px-6 py-3 font-bold uppercase text-white transition hover:bg-blue-light disabled:cursor-not-allowed disabled:bg-blue-light"
            disabled={!content.length}
          >
            Update
          </button>
        </div>
      </form>
    );
  }
};

export default UpdateCommentForm;
