import React, { useState } from "react";
// import MyFeed from '../components/Feed/MyFeed';
import UserPost from "../components/Feed/UserPost";
import UserRank from "../components/Feed/UserRank";
import { Button, Grid } from "semantic-ui-react";
import "../assets/css/feed/UserPage.css";
import { animateScroll as scroll } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";

import KakaoChatButton from "../components/Feed/KakaoChatButton";

// sticky
import { StickyContainer, Sticky } from "react-sticky";

const UserPage = () => {
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 300,
      delay: 0,
      smooth: true,
    }); // 페이지 상단으로 스크롤
  };

  //반응형  Semantic UI의 그리드 
  <Grid>
  <Grid.Row>
    <Grid.Column mobile={16} tablet={8} computer={4}>
      <UserRank />
    </Grid.Column>
    <Grid.Column mobile={16} tablet={8} computer={12}>
      <UserPost />
    </Grid.Column>
  </Grid.Row>
</Grid>

  return (
    
    <div className="userpage">
      {/* 유저 게시글 부분 */}
      <UserPost />
    
      <StickyContainer>
        <Sticky>
          {({
            style,

            // the following are also available but unused in this example
            isSticky,
            wasSticky,
            distanceFromTop,
            distanceFromBottom,
            calculatedHeight,
          }) => (
            <div style={style}>
              <UserRank />
              
            </div>
            
          )}
         
        </Sticky>

      

        {/* 랭킹 부분 */}
      </StickyContainer>

      <div className="userpage_totop" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faArrowUpLong} />
     
      </div>
     
    </div>
  );
};

export default UserPage;
