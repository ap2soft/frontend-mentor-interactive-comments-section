import { comment } from "postcss";
import React from "react";
import Avatar from "../User/Avatar";
import Card from "../Card";
import commentsManager from "../../commentsManager";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.manager = new commentsManager();

    this.user = props.comment?.user || this.manager.getCurrentUser();
    this.comment = props.comment?.body || "";

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSend = props.onSend || undefined;
  }

  onChange(event) {
    this.setState(() => (this.comment = event.target.value));
  }

  onSubmit(event) {
    event.preventDefault();

    this.manager.send({
      author: this.user,
      body: this.comment,
      likesCount: 0,
      id: Date.now(),
      createdAt: new Date(),
    });

    this.onSend && this.onSend();
  }

  render() {
    return (
      <Card className={this.props.className}>
        <form onSubmit={this.onSubmit}>
          <textarea
            className="w-full resize-none rounded-md border border-gray-light px-4 py-2 transition focus-within:border-gray hover:border-gray focus:outline-none"
            placeholder="Add a comment..."
            defaultValue={this.comment}
            onChange={this.onChange}
          ></textarea>
          <div className="mt-4 flex justify-between">
            <Avatar user={this.user} />
            <button
              type="submit"
              className={`rounded-md px-4 py-2 font-bold uppercase text-white transition hover:bg-blue-light ${
                this.comment.length > 0 ? "bg-blue" : "bg-blue-light"
              }`}
            >
              Send
            </button>
          </div>
        </form>
      </Card>
    );
  }
}

export default Form;
