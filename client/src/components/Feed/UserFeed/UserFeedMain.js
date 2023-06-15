import React, { useState } from 'react';
import UserProfile from './UserProfile';
import USerFeed from './UserFeed';
import './UserFeedMain.css';

const UserFeedMain = () => {
  const [feedData, setFeedData] = useState([]);

  const handleLoadMore = () => {
    // 더 많은 게시글을 가져오는 로직을 구현하고 feedData를 업데이트합니다.
  };

  return (
    <div className="UserFeedMain">
      <div className="Userprofile">
        <UserProfile />
      </div>
      <div className="feed">
        <h1>HogWard Feed</h1>
        <UserFeed feedData={feedData} />
        <button className="load-more" onClick={handleLoadMore}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default UserFeedMain;
