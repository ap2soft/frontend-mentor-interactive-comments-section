import React from "react";
import Card from "../Card";
import Avatar from "../User/Avatar";
import { format } from "timeago.js";
import { Likes } from "./Likes";
import ActionButtons from "./Actions/Buttons";

class Comment extends React.Component {
  render() {
    const { comment, currentUser } = this.props;
    const { author } = comment;

    return (
      <Card>
        <div className="flex gap-4">
          <Avatar user={author} />
          <span className="font-bold text-gray-dark">{author.name}</span>
          <time dateTime={comment.createdAt}>{format(comment.createdAt)}</time>
        </div>
        <div className="mt-4">{comment.body}</div>
        <div className="mt-4 flex justify-between">
          <Likes likesCount={comment.likesCount} canManage={true} />
          <ActionButtons canManage={currentUser.name === comment.author.name} />
        </div>
      </Card>
    );
  }
}

export default Comment;
