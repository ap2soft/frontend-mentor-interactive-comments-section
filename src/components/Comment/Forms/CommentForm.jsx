import { useState } from "react";
import Avatar from "../../User/Avatar";
import { Card } from "../../Card";

const CommentForm = ({
  currentUser,
  submitButtonText,
  placeholder,
  onSend,
  onCancel,
}) => {
  const [content, setContent] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (!content.length) return;

    onSend({ content });
    setContent("");
  };

  const onKeyUp = (event) => {
    const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);

    if (event.ctrlKey && event.key === "Enter") {
      onSubmit(event);
    } else if (event.key === "Escape" && isNotCombinedKey) {
      onCancel(event);
    }
  };

  return (
    <Card>
      <form
        className="flex flex-col gap-4 tablet:flex-row tablet:items-start"
        onSubmit={onSubmit}
      >
        <Avatar user={currentUser} className="hidden tablet:block" />
        <textarea
          className="w-full resize-none rounded-md border border-gray-light px-4 py-2 transition focus-within:border-gray hover:border-gray focus:outline-none"
          placeholder={placeholder || "Write somthing..."}
          rows="3"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onKeyUp={onKeyUp}
        ></textarea>
        <div className="flex items-center justify-between">
          <Avatar user={currentUser} className="tablet:hidden" />
          <div className="flex flex-row-reverse gap-4 tablet:flex-col">
            <button
              type="submit"
              className="rounded-md bg-blue px-6 py-3 font-bold uppercase text-white transition hover:bg-blue-light disabled:cursor-not-allowed disabled:bg-blue-light"
              disabled={!content.length}
            >
              {submitButtonText || "Submit"}
            </button>
            {onCancel && (
              <button
                type="button"
                className="text-blue-light underline transition hover:text-blue"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CommentForm;
