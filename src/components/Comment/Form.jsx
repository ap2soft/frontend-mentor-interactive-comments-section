import React from "react";
import { Avatar } from "../User/Avatar";
import { Card } from "../Card";
import commentsManager from "../../commentsManager";
import FormSubmitButton from "./FormSubmitButton";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.manager = new commentsManager();

    this.user = props.comment?.user || this.manager.getCurrentUser();

    this.state = { comment: props.comment?.body || "" };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSend = props.onSend || undefined;
  }

  onChange(event) {
    this.setState({ comment: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    if (!this.state.comment.length) return;

    this.onSend && this.onSend(this.state);

    this.setState({ comment: "" });
  }

  render() {
    return (
      <Card className={this.props.className}>
        <form onSubmit={this.onSubmit}>
          <div className="tablet: flex tablet:items-start tablet:gap-4">
            <Avatar user={this.user} className="hidden tablet:block" />
            <textarea
              className="w-full resize-none rounded-md border border-gray-light px-4 py-2 transition focus-within:border-gray hover:border-gray focus:outline-none"
              placeholder="Add a comment..."
              value={this.state.comment}
              onChange={this.onChange}
            ></textarea>
            <FormSubmitButton className="hidden tablet:block" />
          </div>
          <div className="mt-4 flex justify-between tablet:hidden">
            <Avatar user={this.user} />
            <FormSubmitButton />
          </div>
        </form>
      </Card>
    );
  }
}

export default Form;
