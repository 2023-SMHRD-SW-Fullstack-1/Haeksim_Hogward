import React, { useState, useEffect } from 'react';
import './UserFeed.css';
import UserPost from './UserPost';
import UserProfile from './UserProfile';
import UserPostsData from './UserPostsData';

const UserFeed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 게시물 데이터를 가정한 예시 데이터
  const initialPosts = UserPostsData
    // 게시물 데이터...
  

  useEffect(() => {
    // 초기 게시물 데이터 설정
    setPosts(initialPosts);
  }, []);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // 스크롤이 마지막에 도달하면 새로운 게시물 로딩
      setIsLoading(true);
      // 실제로는 API 요청 등으로 새로운 데이터를 가져오게 될 것입니다.
      // 여기서는 단순히 기존 게시물을 복제하여 추가하는 예시를 보여드립니다.
      setTimeout(() => {
        setPosts((prevPosts) => [...prevPosts, ...initialPosts]);
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Userprofile = {
    username: 'Your Username',
    profileImage: 'profile-image.jpg',
  };

  return (
    <div className="feed">
      {/* <Profile username={profile.username} profileImage={profile.profileImage} /> */}
      {/* <h1 className="feed-title">Instagram Feed</h1> */}
      <div className="feed-grid">
        {posts.map((Userpost) => (
          <UserPost key={Userpost.id} post={Userpost} />
        ))}
      </div>
      {isLoading && <p>Loading more posts...</p>}
    </div>
  );
};

export default Feed;
