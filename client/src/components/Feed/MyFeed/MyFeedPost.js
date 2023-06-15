import React, { useState } from 'react';
import './MyFeedPost.css';

const MyFeedPostd = () => {
  const [posts, setPosts] = useState([
    { id: 1, username: 'User1', content: 'Hello, world!' },
    { id: 2, username: 'User2', content: 'This is a sample post.' },
    { id: 3, username: 'User3', content: 'Welcome to the social feed!' },
  ]);

  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  const [users] = useState(['User1', 'User2', 'User3']);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: posts.length + 1,
      username: username,
      content: content,
    };

    setPosts([...posts, newPost]);

    setUsername('');
    setContent('');
  };

  const handleUserClick = (user) => {
    console.log('Clicked user:', user);
  };

  return (
    <div className="user-feed-container">
      <div className="user-feed-form">
        <h2>Create a new post</h2>
        <form onSubmit={handlePostSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <br />
          <label>
            Content:
            <textarea value={content} onChange={handleContentChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="user-feed-posts">
        <h1>User Feed</h1>
        {posts.map((post) => (
          <div className="user-post" key={post.id}>
            <h3>{post.username}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <div className="user-feed-users">
        <h1>User List</h1>
        <ul>
          {users.map((user, index) => (
            <li key={index} onClick={() => handleUserClick(user)}>
              {user}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyFeedPostd;
