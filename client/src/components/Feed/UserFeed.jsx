import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Feed.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import axios from 'axios';

const UserFeed = () => {
  // 기본 이미지 데이터 배열
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
    },
    // 다른 이미지 데이터 항목들도 동일한 형식으로 추가
  ];

  // API에서 가져온 피드 데이터를 저장할 상태 변수
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    // API 요청을 보낼 URL
    const url = 'http://172.30.1.22:8087/hogward/allboard';

    // useEffect 내부에서 async/await 사용하여 데이터 가져오기
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        // 응답 데이터를 상태 변수에 저장
        setFeedData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // useNavigate 훅을 사용하여 네비게이션 기능 가져오기
  const navigate = useNavigate();

  // 게시물을 클릭했을 때 실행되는 함수
  const handleItemClick = (itemId) => {
    // 클릭한 게시물의 ID를 URL에 추가하여 상세 페이지로 이동
    navigate(`/detail/${itemId}`);
  };

  return (
    <div className="feed-container">
      {/* 이미지 목록을 표시할 ImageList 컴포넌트 */}
      <ImageList sx={{ width: 800, height: 450 }} gap={8} cols={3}>
        {/* 기본 이미지 데이터를 매핑하여 ImageListItem으로 렌더링 */}
        {itemData?.map((item) => (
          <ImageListItem
            key={item.img}
            onClick={() => handleItemClick(item.id)}
          >
            {/* 이미지 표시 */}
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
            {/* 이미지에 대한 제목과 작성자 정보를 표시하는 ImageListItemBar */}
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
            />
          </ImageListItem>
        ))}
        {/* API에서 가져온 피드 데이터를 매핑하여 ImageListItem으로 렌더링 */}
        {feedData?.map((item) => (
          <ImageListItem
            key={item.allboard.b_id}
            onClick={() => handleItemClick(item.allboard.b_id)}
          >
            {/* 이미지 표시 */}
            <img
              src={item.allboard.b_file}
              alt={item.allboard.b_content}
              loading="lazy"
            />
            {/* 이미지에 대한 내용과 작성자 정보를 표시하는 ImageListItemBar */}
            <ImageListItemBar
              title={item.allboard.b_content}
              subtitle={<span>by: {item.allboard.mem_nick}</span>}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default UserFeed;
