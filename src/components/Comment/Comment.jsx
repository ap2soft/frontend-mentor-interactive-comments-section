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
        <div className="flex flex-col tablet:flex-row">
          <Likes
            likesCount={comment.likesCount}
            canManage={true}
            className="hidden tablet:block"
          />
          <div className="tablet:ml-6 tablet:flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar user={author} />
                <span className="font-bold text-gray-dark">{author.name}</span>
                {currentUser.name === comment.author.name && (
                  <span className="h-6 rounded bg-blue px-2 text-sm lowercase text-white">
                    you
                  </span>
                )}
                <time dateTime={comment.createdAt}>
                  {format(comment.createdAt)}
                </time>
              </div>
              <ActionButtons
                canManage={currentUser.name === comment.author.name}
                className="hidden tablet:block"
              />
            </div>
            <div className="mt-4">{comment.body}</div>
          </div>
        </div>
        <div className="mt-4 flex justify-between tablet:hidden">
          <Likes likesCount={comment.likesCount} canManage={true} />
          <ActionButtons canManage={currentUser.name === comment.author.name} />
        </div>
      </Card>
    );
  }
}

export default Comment;
