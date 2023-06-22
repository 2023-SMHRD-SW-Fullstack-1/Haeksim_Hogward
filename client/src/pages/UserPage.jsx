import React, { useState } from 'react';
// import MyFeed from '../components/Feed/MyFeed';
import UserPost from '../components/Feed/UserPost';
import UserRank from '../components/Feed/UserRank';
import { Button } from 'semantic-ui-react'
import "../assets/css/feed/FeedPage.css"



const UserPage = () => {

 

  return (
  
      <div>
            {/* 유저 게시글 부분 */}
            <div>
              <UserPost />
            </div>
            
            {/* 랭킹 부분 */}
            <div>
              <UserRank />
            </div>
        </div>
   
  );
};

export default UserPage;
