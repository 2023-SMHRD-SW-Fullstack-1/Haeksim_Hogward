import React, { useState } from "react";
// import MyFeed from '../components/Feed/MyFeed';
import UserPost from "../components/Feed/UserPost";
import UserRank from "../components/Feed/UserRank";
import { Button } from "semantic-ui-react";
import "../assets/css/feed/UserPage.css";
import { animateScroll as scroll } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";

const UserPage = () => {
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 300,
      delay: 0,
      smooth: true,
    }); // 페이지 상단으로 스크롤
  };

  return (
    <div className="userpage">
      {/* 유저 게시글 부분 */}
      <UserPost />

      {/* 랭킹 부분 */}
      <UserRank />
      <div className="userpage_totop" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faArrowUpLong} />
      </div>
    </div>
  );
};

export default UserPage;
