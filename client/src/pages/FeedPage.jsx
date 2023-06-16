import React, { useState } from 'react'
import Post from '../components/Feed/Post'
import Rank from '../components/Feed/Rank'

const FeedPage = () => {

  const [selectFeed, setSelectFeed] = useState();

  return (
    <div>
      <div>
      <button onClick={() => setSelectFeed()}>내피드</button>
      <button onClick={() => setSelectFeed()}>다른사람피드</button>
      </div>
      <Post 
       selectFeed={selectFeed}
      />

    </div>
  )
}

export default FeedPage