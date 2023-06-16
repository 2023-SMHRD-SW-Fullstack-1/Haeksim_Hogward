import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import '../../assets/css/Feed.css';

const MyFeed = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrheH9XCUreb5_zUFhGk3OdmxWCF6o5O0olkc7jPOqeMQ-G85g5nbKWD6FopgvhyFnxaQ&usqp=CAU',
    'https://img.insight.co.kr/static/2017/03/01/700/8710JRR301036S434H25.jpg',
    'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201611/15/htm_2016111510552285703.jpg',
    'https://pbs.twimg.com/media/Db_DLpjVwAEPZti.jpg',
  ];

  const profileImage = 'https://i.pinimg.com/236x/46/1d/f7/461df750a734b8c580246e6618c6919a.jpg';
  const followers = 1000;
  const following = 500;
  const postCount = images.length;

  return (
    <div className="container">
      <div className="header">
        <div className="profile">
          <img src={profileImage} alt="프로필 사진" />
          <div className="profile-info">
            <h2>나의 프로필</h2>
            <div className="profile-stats">
              <div className="profile-stats-item">
                <span>{postCount}</span>
                <span>게시물</span>
              </div>
              <div className="profile-stats-item">
                <span>{followers}</span>
                <span>팔로워</span>
              </div>
              <div className="profile-stats-item">
                <span>{following}</span>
                <span>팔로잉</span>
              </div>
            </div>
          </div>
        </div>
        {/* <h1>인스타그램 나의 피드</h1> */}
      </div>
      <div className="my-feed">
        {images.map((image, index) => (
          <div className="post" key={index} onClick={() => handlePostClick(image)}>
            <img src={image} alt="게시물 이미지" />
          </div>
        ))}
      </div>
      {selectedPost && (
        <div className="post-details-overlay">
          <div className="post-details">
            <img src={selectedPost} alt="게시물 이미지" />
            <div className="post-details-info">
              <div className="profile-stats">
                <div className="profile-stats-item">
                  <span>{postCount}</span>
                  <span>게시물</span>
                </div>
                <div className="profile-stats-item">
                  <span>{followers}</span>
                  <span>팔로워</span>
                </div>
                <div className="profile-stats-item">
                  <span>{following}</span>
                  <span>팔로잉</span>
                </div>
              </div>
              <div className="post-details-caption">
                <p>게시물 설명</p>
              </div>
              <div className="post-details-comments">
                <div className="comment">
                  <span>유저1:</span>
                  <span>댓글 1</span>
                </div>
                <div className="comment">
                  <span>유저2:</span>
                  <span>댓글 2</span>
                </div>
              </div>
            </div>
            <button className="close-button" onClick={() => setSelectedPost(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="currentColor"
                  d="M7.561 7.561a.5.5 0 0 1 .708 0L12 11.293l3.732-3.732a.5.5 0 1 1 .708.708L12.707 12l3.732 3.732a.5.5 0 1 1-.708.708L12 12.707l-3.732 3.732a.5.5 0 0 1-.708-.708L11.293 12 7.561 8.268a.5.5 0 0 1 0-.707z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFeed;
