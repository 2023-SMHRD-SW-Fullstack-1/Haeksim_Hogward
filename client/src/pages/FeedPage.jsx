import React, { useState } from 'react';
import MyFeed from '../components/Feed/MyFeed';
import Post from '../components/Feed/Post';
import Rank from '../components/Feed/Rank';
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';



const FeedPage = () => {

  const [selectFeed, setSelectFeed] = useState();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ margin: '10px' }}>
        <Button primary onClick={() => setSelectFeed('myFeed')}>내피드</Button>
        <Button secondary onClick={() => setSelectFeed('otherFeed')}>다른사람피드</Button>
      </div>

      <div style={{ display: 'flex', width: '100%' }}>
        {selectFeed === 'myFeed' ? (
          <div style={{ flex: 1, padding: '10px' }}>
            <MyFeed />
          </div>
        ) : selectFeed === 'otherFeed' ? (
          <>
            <div style={{ flex: 1, padding: '10px' }}>
              <Post />
            </div>
            <div style={{ flex: 1, padding: '10px' }}>
              <Rank />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default FeedPage;
