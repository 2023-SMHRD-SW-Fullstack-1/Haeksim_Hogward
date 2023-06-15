import React from 'react';
import '../../assets/css/Feed.css';

const UserFeed = () => {
  return (
    <div className="container">
      <h1>인스타그램 유저 피드</h1>
      <div className="user-feed">
        <div className="post">
          <img src="..." alt="게시물 이미지" />
        </div>
        <div className="post">
          <img src="..." alt="게시물 이미지" />
        </div>
        <div className="post">
          <img src="..." alt="게시물 이미지" />
        </div>
      </div>
    </div>
  );
};

export default UserFeed;
