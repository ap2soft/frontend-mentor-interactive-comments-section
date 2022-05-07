/**
 * Get comments from data.json
 */
export const reseedDatabase = async () => {
  const data = await (await fetch("./data.json")).json();

  setItem("comments", data.comments);

  setItem("currentUser", data.currentUser);

  setItem("votes", []);
};

export const getComments = () =>
  getItem("comments", "[]").sort((a, b) =>
    a.createdAt > b.createdAt ? 1 : -1
  );

export const getRepliesFor = (commentId) =>
  getComments()
    .filter(({ replyTo }) => replyTo === commentId)
    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

export const getCurrentUser = () => getItem("currentUser", "{}");

//#region Manage Comment
export const sendComment = (comment, parentCommentId) => {
  const comments = getComments();

  if (parentCommentId) {
    const parentComment = comments.find(({ id }) => id === parentCommentId);
    parentComment.replies.push(comment);

    storeComments([
      ...comments.filter(({ id }) => id !== parentComment.id),
      parentComment,
    ]);
  } else {
    storeComments([...comments, comment]);
  }
};

export const updateComment = (content, commentId, parentCommentId) => {
  const comments = getComments();
  if (parentCommentId) {
    // Update reply with ID of commentId of the parent comment with ID = replyingTo
    const parentComment = comments.find(({ id }) => id === parentCommentId);
    const reply = parentComment.replies.find(({ id }) => id === commentId);
    parentComment.replies = [
      ...parentComment.replies.filter(({ id }) => id !== reply.id),
      { ...reply, content },
    ];
    storeComments([
      ...comments.filter(({ id }) => id !== parentComment.id),
      parentComment,
    ]);
  } else {
    // Update comment with ID of commentId
    const comment = comments.find(({ id }) => id === commentId);
    storeComments([
      ...comments.filter(({ id }) => id !== commentId),
      { ...comment, content },
    ]);
  }
};

export const deleteComment = ({ commentId, parentCommentId }) => {
  const comments = getComments();

  if (parentCommentId) {
    const parentComment = comments.find(({ id }) => id === parentCommentId);

    return storeComments([
      // All comments except the parent comment
      ...comments.filter(({ id }) => id !== parentComment.id),
      // The parent comment, but without the reply
      {
        ...parentComment,
        replies: parentComment.replies.filter(({ id }) => id !== commentId),
      },
    ]);
  }

  // All comments except the comment
  storeComments(comments.filter(({ id }) => id !== commentId));
};
//#endregion

//#region Votes
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

const getVotesForComment = (commentId) =>
  getItem("votes", "[]").filter((vote) => vote.commentId === commentId);

export const getUpvotesCount = (commentId) =>
  getVotesForComment(commentId).filter(({ vote }) => vote === "up").length;

export const getDownvotesCount = (commentId) =>
  getVotesForComment(commentId).filter(({ vote }) => vote === "down").length;

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
//#endregion

//#region Local Storage
const getItem = (name, defaultValue) =>
  JSON.parse(localStorage.getItem(name) || defaultValue);

const setItem = (name, value) =>
  localStorage.setItem(name, JSON.stringify(value));

const storeComments = (comments) =>
  localStorage.setItem("comments", JSON.stringify(comments));
//#endregion
