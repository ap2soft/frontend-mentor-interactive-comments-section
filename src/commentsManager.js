class commentsManager {
  /**
   * Get dummy comments from API
   * - randomize date and likes count
   * - set dummy user avatar
   * @param {int} count Count of comments to retrieve
   * @returns
   */
  seed(count = 10) {
    return fetch(`https://dummyjson.com/comments?limit=${count}`)
      .then((response) => response.json())
      .then((data) => {
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
          JSON.stringify(
            comments[Math.floor(Math.random() * comments.length)].author
          )
        );
      });
  }

  getAll() {
    return JSON.parse(localStorage.getItem("comments") || "[]");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser") || "{}");
  }

  send(comment) {
    localStorage.setItem(
      "comments",
      JSON.stringify([...this.getAll(), comment])
    );
  }

  deleteComment(commentId) {
    localStorage.setItem(
      "comments",
      JSON.stringify(this.getAll().filter(({ id }) => id !== commentId))
    );
  }
}

export default commentsManager;
