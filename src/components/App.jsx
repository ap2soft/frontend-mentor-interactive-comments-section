import React from "react";
import commentsManager from "../commentsManager";
import CommentForm from "./Comment/Form";
import CommentList from "./Comment/List";
import CommentSeeder from "./Comment/Seeder";

class App extends React.Component {
  constructor() {
    super();
    this.commentsManager = new commentsManager();
    this.comments = this.commentsManager.getAll();
    this.currentUser = this.commentsManager.getCurrentUser();

    this.onSend = this.onSend.bind(this);
  }

  onSend() {
    this.comments = this.setState(
      () => (this.comments = this.commentsManager.getAll())
    );
  }

  render() {
    return (
      <div className="mx-auto max-w-2xl">
        <CommentList comments={this.comments} currentUser={this.currentUser} />
        <CommentForm className="mt-6" onSend={this.onSend} />

        <CommentSeeder className="mt-6 border-y border-gray py-4" />
      </div>
    );
  }
}

export default App;
