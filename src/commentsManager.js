import { useEffect } from "react";

/**
 * Get comments from data.json
 */
export const reseedDatabase = async () => {
  const data = await (await fetch("./data.json")).json();

  setItem("comments", data.comments);

  setItem("currentUser", data.currentUser);
};

export const getComments = () =>
  getItem("comments", "[]").sort((a, b) =>
    a.createdAt > b.createdAt ? 1 : -1
  );

export const getRepliesFor = (commentId) =>
  getComments().filter(({ replyTo }) => replyTo === commentId);

export const getUsers = () => getItem("users", "[]");

export const getCurrentUser = () => getItem("currentUser", "{}");

export const getVotesForComment = (commentId) =>
  getItem("votes", "[]").filter((vote) => vote.commentId === commentId);

export const sendComment = (comment) =>
  storeComments([...getComments(), comment]);

export const updateComment = (content, commentId, parentCommentId) => {
  const allComments = getComments();
  if (parentCommentId) {
    // Update reply with ID of commentId of the parent comment with ID = replyingTo
    console.log(
      `updating reply #${commentId} of parent comment #${parentCommentId}`
    );
    const parentComment = allComments.find(({ id }) => id === parentCommentId);
    console.log(parentComment.id);
    const reply = parentComment.replies.find(({ id }) => id === commentId);
    console.log(reply.id);
    parentComment.replies = [
      ...parentComment.replies.filter(({ id }) => id !== reply.id),
      { ...reply, content },
    ];
    storeComments([
      ...allComments.filter(({ id }) => id !== parentComment.id),
      parentComment,
    ]);
  } else {
    // Update comment with ID of commentId
    const comment = allComments.find(({ id }) => id === commentId);
    storeComments([
      ...allComments.filter(({ id }) => id !== commentId),
      { ...comment, content },
    ]);
  }
};

export const currentUserUpvotedComment = (commentId) =>
  currentUsersVoteForComment(commentId)?.vote === "up";

export const currentUserDownvotedComment = (commentId) =>
  currentUsersVoteForComment(commentId)?.vote === "down";

export const currentUsersVoteForComment = (commentId) => {
  const currentUser = getCurrentUser();
  return getVotesForComment(commentId).find(
    ({ author }) => author === currentUser.username
  );
};

export const upvoteComment = (commentId) => {
  storeVoteForComment(commentId, getCurrentUser().username, "up");
};

export const downvoteComment = (commentId) => {
  storeVoteForComment(commentId, getCurrentUser().username, "down");
};

const storeVoteForComment = (commentId, author, vote) => {
  let votes = getItem("votes", "[]");
  const currentVote = votes.find(
    (v) => v.commentId === commentId && v.author === author
  );

  // Filter out the current vote
  votes = votes.filter(
    (v) => !(v.commentId === commentId && v.author === author)
  );

  // Add new vote if it's different from the current vote
  // or current vote does not exist
  if (!currentVote || currentVote.vote !== vote) {
    votes.push({ commentId, author, vote });
  }

  setItem("votes", votes);
};

export const deleteComment = (commentId) => {
  // Delete all relpies comments recursively
  getRepliesFor(commentId).forEach(({ id }) => deleteComment(id));

  // Delete the comment
  storeComments(getComments().filter(({ id }) => id !== commentId));
};

const getItem = (name, defaultValue) =>
  JSON.parse(localStorage.getItem(name) || defaultValue);

const setItem = (name, value) =>
  localStorage.setItem(name, JSON.stringify(value));

const storeComments = (comments) =>
  localStorage.setItem("comments", JSON.stringify(comments));
