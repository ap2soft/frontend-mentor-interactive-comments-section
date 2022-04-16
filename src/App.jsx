import React from "react";
import Comment from "./Comment";

class App extends React.Component {
  constructor() {
    super();
    this.comments = [
      {
        id: 1,
        author: { name: "amyrobson", avatarUrl: "/images/avatars/image-amyrobson.png" },
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dignissimos rerum error ea itaque! Magnam nesciunt optio mollitia minima similique recusandae exercitationem.",
        created_at: "2022-04-16 20:15:33",
        likesCount: 12,
      },
      {
        id: 2,
        author: { name: "maxblagun", avatarUrl: "/images/avatars/image-maxblagun.png" },
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dignissimos rerum error ea itaque! Magnam nesciunt optio mollitia minima similique recusandae exercitationem.",
        created_at: "2022-04-16 20:22:12",
        likesCount: 7,
      },
    ];
  }
  render() {
    return (
      <div className="flex flex-col gap-4">
        {this.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

export default App;
