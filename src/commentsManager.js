/**
 * Get dummy comments from API
 * - randomize date and votes
 * @param {int} count Count of comments to retrieve
 * @returns
 */
export const reseedComments = async (count = 10) => {
  const users = await seedUsers();

  const comments = await seedComments(users, count);

  seedVotes(comments, users);
};

const seedUsers = async () => {
  const usersData = await getDummyData("users", {
    limit: 30,
    select: "id,username,image",
  });
  if (!usersData.users) return;
  const users = usersData.users;
  setItem("users", users);

  return users;
};

const seedComments = async (users, count) => {
  const commentsData = await getDummyData("comments", {
    limit: count,
    skip: Math.floor(Math.random() * 300),
  });
  if (!commentsData.comments) return;

  const comments = commentsData.comments.map((comment) => {
    const date = new Date();
    date.setHours(date.getHours() - Math.round(Math.random() * 24 * 3));

    return {
      id: comment.id,
      replyTo: null,
      authorId: getRandomElement(users).id,
      body: comment.body,
      createdAt: date.toJSON(),
    };
  });

  setItem("comments", comments);

  const randomComment = getRandomElement(comments);
  setItem(
    "currentUser",
    users.find(({ id }) => id === randomComment.authorId)
  );

  return comments;
};

const seedVotes = (comments, users) => {
  const votes = [];
  comments.forEach((comment) => {
    [...Array(Math.floor(Math.random() * 4)).keys()].forEach(() =>
      votes.push({
        commentId: comment.id,
        authorId: getRandomElement(users).id,
        vote: Math.random() > 0.5 ? "up" : "down",
      })
    );
  });
  setItem("votes", votes);

  return votes;
};

const getDummyData = async (url, params) => {
  const apiUrl = new URL(url, "https://dummyjson.com");
  Object.keys(params).forEach((param) =>
    apiUrl.searchParams.set(param, params[param])
  );

  const response = await fetch(apiUrl);
  return await response.json();
};

const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const getAllComments = () =>
  getItem("comments", "[]").sort((a, b) =>
    a.createdAt > b.createdAt ? 1 : -1
  );

export const getUsers = () => getItem("users", "[]");

export const getCurrentUser = () => getItem("currentUser", "{}");

export const getVotesForComment = (commentId) =>
  getItem("votes", "[]").filter((vote) => vote.commentId === commentId);

export const sendComment = (comment) =>
  storeComments([...getAllComments(), comment]);

export const upvoteComment = (commentId, userId) => {
  storeVoteForComment(commentId, userId, "up");
};

export const downvoteComment = (commentId, userId) => {
  storeVoteForComment(commentId, userId, "down");
};

const storeVoteForComment = (commentId, userId, vote) => {
  let votes = getItem("votes", "[]");
  votes = [
    ...votes.filter(({ authorId }) => authorId !== userId),
    { commentId, authorId: userId, vote },
  ];
  setItem("votes", votes);
};

export const deleteComment = (commentId) =>
  storeComments(getAllComments().filter(({ id }) => id !== commentId));

const getItem = (name, defaultValue) =>
  JSON.parse(localStorage.getItem(name) || defaultValue);

const setItem = (name, value) =>
  localStorage.setItem(name, JSON.stringify(value));

const storeComments = (comments) =>
  localStorage.setItem("comments", JSON.stringify(comments));
