import React, { useState } from "react";
import { Avatar } from "../User/Avatar";
import { Card } from "../Card";
import { getCurrentUser } from "../../commentsManager";
import FormSubmitButton from "./FormSubmitButton";

const Form = ({ className, comment, onSend, onCancel }) => {
  const user = comment?.user || getCurrentUser();
  const [commentBody, setCommentBody] = useState(comment?.body || "");

  const onSubmit = (event) => {
    event.preventDefault();

    if (!commentBody.length) return;

    onSend && onSend({ body: commentBody });

    setCommentBody("");
  };
  const onKeyUp = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      onSubmit(event);
    }
  };

  return (
    <Card className={className}>
      <form onSubmit={onSubmit}>
        <div className="tablet: flex tablet:items-start tablet:gap-4">
          <Avatar user={user} className="hidden tablet:block" />
          <textarea
            className="w-full resize-none rounded-md border border-gray-light px-4 py-2 transition focus-within:border-gray hover:border-gray focus:outline-none"
            placeholder="Add a comment..."
            rows="3"
            value={commentBody}
            onChange={(event) => setCommentBody(event.target.value)}
            onKeyUp={onKeyUp}
          ></textarea>
          <div className="hidden flex-col space-y-4 tablet:flex">
            <FormSubmitButton>Send</FormSubmitButton>
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
        <div className="mt-4 flex justify-between tablet:hidden">
          <Avatar user={user} />
          <div className="items-center space-x-4">
            {onCancel && (
              <button
                onClick={onCancel}
                className="text-blue-light underline transition hover:text-blue"
              >
                Cancel
              </button>
            )}
            <FormSubmitButton>Send</FormSubmitButton>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default Form;
