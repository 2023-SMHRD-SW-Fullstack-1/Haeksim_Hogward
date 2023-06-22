import React, { useState } from 'react';
// import MyFeed from '../components/Feed/MyFeed';
import UserPost from '../components/Feed/UserPost';
import UserRank from '../components/Feed/UserRank';
import { Button } from 'semantic-ui-react'
import "../assets/css/feed/UserPage.css"



const UserPage = () => {

 

  return (
  
      <div className='user-page'>
            {/* 유저 게시글 부분 */}
            <div className='user-post'>
              <UserPost />
            </div>
            
            {/* 랭킹 부분 */}
            <div className='user-rank'>
              <UserRank />
            </div>
        </div>
   
  );
};

export default UserPage;
