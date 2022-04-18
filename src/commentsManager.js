/**
 * Get dummy comments from API
 * - randomize date and likes count
 * - set dummy user avatar
 * @param {int} count Count of comments to retrieve
 * @returns
 */
export const reseedComments = async (count = 10) => {
  const response = await fetch(`https://dummyjson.com/comments?limit=${count}`);
  const data = response.json();

  if (!data.comments) return;

  const comments = data.comments.map((comment) => {
    const date = new Date();
    date.setHours(date.getHours() - Math.round(Math.random() * 24 * 3));

    return {
      id: comment.id,
      replyTo: null,
      author: {
        name: comment.user.username,
        avatar: `https://i.pravatar.cc/150?u=${comment.user.username}`,
      },
      body: comment.body,
      createdAt: date.toJSON(),
      likesCount: Math.round(Math.random() * 25),
    };
  });

  localStorage.setItem("comments", JSON.stringify(comments));
  localStorage.setItem(
    "currentUser",
    JSON.stringify(comments[Math.floor(Math.random() * comments.length)].author)
  );
};

export const getAllComments = () => getItem("comments", "[]");

export const getCurrentUser = () => getItem("currentUser", "{}");

export const sendComment = (comment) =>
  storeComments([...getAllComments(), comment]);

export const deleteComment = (commentId) =>
  storeComments(getAllComments().filter(({ id }) => id !== commentId));

const getItem = (name, defaultValue) =>
  JSON.parse(localStorage.getItem(name) || defaultValue);

const storeComments = (comments) =>
  localStorage.setItem("comments", JSON.stringify(comments));
