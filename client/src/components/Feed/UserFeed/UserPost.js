import React, { useState } from 'react';
import './UserPost.css';

const Post = ({ post }) => {
  const { thumbnail, title, content, likes, comments } = post;
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="post" onClick={toggleDetails}>
      <img src={thumbnail} alt="Post Thumbnail" className="post-thumbnail" />
      <h3 className="post-title">{title}</h3>
      {showDetails && (
        <div className="post-details">
          <p>{content}</p>
          <div className="post-stats">
            <span className="post-likes">{likes} likes</span>
            <span className="post-comments">{comments} comments</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
