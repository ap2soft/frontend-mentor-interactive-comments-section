import { useState } from "react";
import { getCurrentUser } from "../commentsManager";
import Avatar from "./Avatar";
import { Card } from "./Card";

export default function NewCommentForm({
  comment,
  submitButtonText,
  onSend,
  onCancel,
}) {
  // Extend abstract CommentForm component
  const [content, setContent] = useState(comment?.content || "");

  const onSubmit = (event) => {
    event.preventDefault();

    if (!content.length) return;

    onSend({ content });
    setContent("");
  };

  const onKeyUp = (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      onSubmit(event);
    }
  };

  return (
    <Card>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 tablet:flex-row tablet:items-start"
      >
        <Avatar user={getCurrentUser()} className="hidden tablet:block" />
        <textarea
          className="w-full resize-none rounded-md border border-gray-light px-4 py-2 transition focus-within:border-gray hover:border-gray focus:outline-none"
          placeholder="Add a comment..."
          rows="3"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onKeyUp={onKeyUp}
        ></textarea>
        <div className="flex items-center justify-between">
          <Avatar user={getCurrentUser()} className="tablet:hidden" />
          <div className="">
            <button
              type="submit"
              className="rounded-md bg-blue px-6 py-3 font-bold uppercase text-white transition hover:bg-blue-light disabled:cursor-not-allowed disabled:bg-blue-light"
              disabled={!content.length}
            >
              {submitButtonText || "Submit"}
            </button>
            {onCancel && (
              <button
                onClick={onCancel}
                className="text-blue-light underline transition hover:text-blue"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
}
