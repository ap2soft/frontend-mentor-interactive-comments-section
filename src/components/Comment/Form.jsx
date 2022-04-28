import React, { useState } from "react";
import { Avatar } from "../User/Avatar";
import { Card } from "../Card";
import { getCurrentUser } from "../../commentsManager";
import FormSubmitButton from "./FormSubmitButton";

const Form = ({ className, comment, onSend }) => {
  const user = comment?.user || getCurrentUser();
  const [commentBody, setCommentBody] = useState(comment?.body || "");

  const onSubmit = (event) => {
    event.preventDefault();

    if (!commentBody.length) return;

    onSend && onSend({ body: commentBody });

    setCommentBody("");
  };

  return (
    <Card className={className}>
      <form onSubmit={onSubmit}>
        <div className="tablet: flex tablet:items-start tablet:gap-4">
          <Avatar user={user} className="hidden tablet:block" />
          <textarea
            className="w-full resize-none rounded-md border border-gray-light px-4 py-2 transition focus-within:border-gray hover:border-gray focus:outline-none"
            placeholder="Add a comment..."
            value={commentBody}
            onChange={(event) => setCommentBody(event.target.value)}
          ></textarea>
          <FormSubmitButton className="hidden tablet:block">
            Send
          </FormSubmitButton>
        </div>
        <div className="mt-4 flex justify-between tablet:hidden">
          <Avatar user={user} />
          <FormSubmitButton>Send</FormSubmitButton>
        </div>
      </form>
    </Card>
  );
};

export default Form;
