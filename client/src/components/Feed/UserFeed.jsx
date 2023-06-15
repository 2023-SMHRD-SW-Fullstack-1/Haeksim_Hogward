import React, { useState } from 'react';
import '../../assets/css/Feed.css';

const UserFeed = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPostContent, setNewPostContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([
    { id: 1, username: '뚱이', profileImage: 'https://i.pinimg.com/236x/46/1d/f7/461df750a734b8c580246e6618c6919a.jpg' },
    { id: 2, username: '뚱&폰지', profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrheH9XCUreb5_zUFhGk3OdmxWCF6o5O0olkc7jPOqeMQ-G85g5nbKWD6FopgvhyFnxaQ&usqp=CAU' },
    { id: 3, username: 'user3', profileImage: 'https://img.insight.co.kr/static/2017/03/01/700/8710JRR301036S434H25.jpg' },
    { id: 4, username: 'user4', profileImage: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201611/15/htm_2016111510552285703.jpg' },
    { id: 5, username: 'user5', profileImage: 'https://pbs.twimg.com/media/Db_DLpjVwAEPZti.jpg' },
  ]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      image: 'https://img.insight.co.kr/static/2017/03/01/700/8710JRR301036S434H25.jpg',
      content: '첫 번째 게시물입니다.',
      likes: 10,
      comments: [
        { id: 1, user: 'user1', text: '댓글 1' },
        { id: 2, user: 'user2', text: '댓글 2' },
      ],
    },
    {
      id: 2,
      image: 'https://pbs.twimg.com/media/Db_DLpjVwAEPZti.jpg',
      content: '두 번째 게시물입니다.',
      likes: 5,
      comments: [
        { id: 1, user: 'user1', text: '댓글 1' },
        { id: 2, user: 'user2', text: '댓글 2' },
        { id: 3, user: 'user3', text: '댓글 3' },
      ],
    },
    {
      id: 3,
      image: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201611/15/htm_2016111510552285703.jpg',
      content: '세 번째 게시물입니다.',
      likes: 8,
      comments: [
        { id: 1, user: 'user1', text: '댓글 1' },
        { id: 2, user: 'user2', text: '댓글 2' },
        { id: 3, user: 'user3', text: '댓글 3' },
        { id: 4, user: 'user4', text: '댓글 4' },
      ],
    },
  ]);

  const handlePostClick = (post) => {
    setSelectedPost((prevSelectedPost) => {
      if (prevSelectedPost && prevSelectedPost.id === post.id) {
        return null;
      }
      return post;
    });
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      image: 'https://example.com/new-post.jpg',
      content: newPostContent,
      likes: 0,
      comments: [],
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setNewPostContent('');
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    return post.content.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container">
      <div className="user-feed">
      <input
              type="text"
              placeholder="게시물 검색"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
      <div className="search-bar">
        <div className="feed-content">
          {filteredPosts.map((post) => (
            <div
              className={`post ${selectedPost && selectedPost.id === post.id ? 'selected' : ''}`}
              key={post.id}
              onClick={() => handlePostClick(post)}
            >
              <img src={post.image} alt="게시물 이미지" />
            </div>
          ))}
          <div className="user-list">
          <h2>유저 목록</h2>
          <ul>
            {userList.map((user) => (
              <li key={user.id} onClick={() => handleUserClick(user)}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
        </div>

      </div>
      {selectedPost && (
        <div className="post-details-overlay" onClick={handleClosePost}>
          <div className="post-details" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPost.image} alt="게시물 이미지" />
            <p>{selectedPost.content}</p>
            <div className="post-info">
              <span>좋아요: {selectedPost.likes}</span>
              <ul>
                {selectedPost.comments.map((comment) => (
                  <li key={comment.id}>{comment.user}: {comment.text}</li>
                ))}
              </ul>
            </div>
            <button onClick={handleClosePost}>닫기</button>
          </div>
        </div>
      )}
      {selectedUser && (
        <div className="user-profile-overlay" onClick={() => setSelectedUser(null)}>
          <div className="user-profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="user-profile">
              <img src={selectedUser.profileImage} alt="프로필 사진" />
              <h3>{selectedUser.username}의 프로필</h3>
              <p>팔로워: 100</p>
              <p>팔로잉: 200</p>
            </div>
          </div>
        </div>
      )}
      {/* <div className="new-post">
        <h2>새 게시물 작성</h2>
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="게시물 내용을 입력하세요."
          />
          <button type="submit">게시</button>
        </form>
      </div> */}
    </div>
  );
};

export default UserFeed;
