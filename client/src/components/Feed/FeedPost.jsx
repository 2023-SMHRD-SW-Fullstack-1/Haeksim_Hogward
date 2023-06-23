import React from "react";

const FeedPost = ({ post }) => {
  console.log(post);
  return <div>{post.usersFeed.mem_nick}</div>;
};

export default FeedPost;
