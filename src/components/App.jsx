import React from "react";
import commentsManager from "../commentsManager";
import CommentForm from "./Comment/Form";
import { List as CommentList } from "./Comment/List";
import { Seeder as CommentSeeder } from "./Comment/Seeder";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.commentsManager = new commentsManager();

    this.state = {
      comments: this.commentsManager.getAll(),
      currentUser: this.commentsManager.getCurrentUser(),
    };

    this.onSend = this.onSend.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  reloadComments() {
    this.setState({ comments: this.commentsManager.getAll() });
  }

  onSend({ comment }) {
    this.commentsManager.send({
      author: this.state.currentUser,
      body: comment,
      likesCount: 0,
      id: Date.now(),
      createdAt: new Date(),
    });

    this.reloadComments();
  }

  onDelete(commentId) {
    this.commentsManager.deleteComment(commentId);

    this.reloadComments();
  }

  render() {
    return (
      <div className="mx-auto max-w-2xl">
        <CommentList
          comments={this.state.comments}
          currentUser={this.state.currentUser}
          onDeleteComment={this.onDelete}
        />

        <CommentForm className="mt-6" onSend={this.onSend} />

        <CommentSeeder className="mt-6 border-y border-blue-light py-4" />
      </div>
    );
  }
}

export default App;
