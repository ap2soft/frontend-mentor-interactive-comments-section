import React from "react";
import commentsManager from "./commentsManager";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import CommentsSeeder from "./CommentsSeeder";

class App extends React.Component {
  constructor() {
    super();
    this.commentsManager = new commentsManager();
    this.comments = this.commentsManager.getAll();
    this.currentUser = this.commentsManager.getCurrentUser();

    this.onSend = this.onSend.bind(this);
  }

  onSend() {
    console.log("parent received onSend");
    this.comments = this.setState(
      () => (this.comments = this.commentsManager.getAll())
    );
  }

  render() {
    return (
      <div>
        <div className="flex flex-col gap-4">
          {!this.comments.length > 0 && (
            <p className="text-center text-sm italic text-gray">
              No comments yet.
            </p>
          )}
          {this.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
        <CommentForm className="mt-6" onSend={this.onSend} />
        <CommentsSeeder className="mt-6 border-y border-gray py-4" />
      </div>
    );
  }
}

export default App;
