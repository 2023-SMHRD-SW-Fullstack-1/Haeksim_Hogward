import React, { useEffect } from "react";
import FeedPost from "./FeedPost";
import axios from "axios";
import { useState } from "react";

const FeedTest = () => {
  const [allfeed, setAllFeed] = useState(null);

  useEffect(() => {
    const url = "http://172.30.1.22:8087/hogward/usersfeed";
    // 다시 키기
    axios.get(url).then((res) => {
      console.log("allfeed", res.data);
      setAllFeed(res.data);
    });
  }, []);
  return (
    <div style={{ backgroundColor: "black" }}>
      {allfeed?.map((item) => (
        <FeedPost post={item} />
      ))}
    </div>
  );
};

export default FeedTest;
