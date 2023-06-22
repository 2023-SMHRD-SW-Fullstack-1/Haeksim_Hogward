import React, { useEffect, useState } from 'react';
import { Feed, Icon, Button, Image, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const UserPost = ( ) => {
  const [allboard, setAllBoard] = useState([]);
  const [memPic, setMemPic] = useState ([]);
  const [open, setOpen] = useState(false); // 모달의 상태를 관리하는 state
  const [modalContent, setModalContent] = useState(null); // 모달에 표시될 내용을 관리하는 state

  

  // useEffect(() => {
  //   const url = "board.json";
  //   axios.get(url).then(res => {
  //     setAllBoard(res.data);
  //     console.log(res.data)

  //   });
  // }, []);

  // 다른사람 피드 최신순 데이터
  const [allfeed, setAllFeed] = useState(null);
  useEffect(() => {
    const url = "http://172.30.1.22:8087/hogward/usersfeed"
    // 다시 키기
    axios.get(url).then((res) => {
      console.log("allfeed",res.data)
      setAllFeed(res.data);
    })
  },[])

  // useEffect(() => {
  //   const url = "member.json";
  //   axios.get(url).then(res => {
  //     setMemPic(res.data);
  //     console.log(res.data)

  //   });
  // }, []);

  // 프로필 사진을 클릭했을 때 실행될 핸들러 함수
  const handleProfileClick = (item) => {
    setModalContent(
      <div>
        <Image src={item.usersFeed .b_file} size="small" />
        <p>{item.usersFeed .mem_email}</p>
      </div>
    );
    setOpen(true); // 모달 열기
  };

  // 게시물을 클릭했을 때 실행될 핸들러 함수
  const handlePostClick = (item) => {
    setModalContent(<div><p>{item.board.b_content}</p></div>);
    setOpen(true); // 모달 열기
  };

  return (
    <div>
      {/* feedData 배열을 순회하며 각 요소에 대한 JSX 구조를 동적으로 생성합니다. */}
      {allfeed?.map((item, index) => (
        <Feed.Event key={index}>
          {/* 프로필 사진을 클릭하면 모달을 연다 */}
          {console.log(item)}
          <Feed.Label style={{ cursor: 'pointer'}} onClick={() => handleProfileClick(item)} >
            <img src={item.usersFeed.b_file} alt="" style={{ width: '200px', height: '200px' }} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <a>{item.usersFeed.mem_nick}</a>
              {/* 각 타입에 따른 조건부 렌더링 */}
              {item.type === 'friend-addition' && ' 님이 친구로 추가했습니다'}
              {item.type === 'new-illustrations' && ' 님이 새로운 그림 2개를 추가했습니다'}
              {item.type === 'new-photos' && ' 님이 당신의 새로운 사진 2장을 추가했습니다'}
              {/* 게시물을 클릭하면 모달을 연다 */}
              {item.type === 'post' && <span style={{ cursor: 'pointer' }} onClick={() => handlePostClick(item.textContent)}> 님이 페이지에 게시글을 작성했습니다</span>}
              <Feed.Date>{item.usersFeed.b_datetime}</Feed.Date>
            </Feed.Summary>
            {item.usersFeed.b_content && <Feed.Extra text>{item.usersFeed.b_content}</Feed.Extra>}
            {item.contentImages  && (
              <Feed.Extra images>
                {item.contentImages.map((imgSrc, imgIndex) => (
                  <a key={imgIndex}>
                    <img src={imgSrc} />
                  </a>
                ))}
              </Feed.Extra>
            )}
            <Feed.Meta>
              <Feed.Like>
                {/* <Icon name='like' /> */}좋아요{" "}
                <FontAwesomeIcon icon={faThumbsUp} />{" "}
                {item.usersFeed.b_likes} 
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      ))}
      {/* 모달 컴포넌트 */}
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Content>
          {modalContent}
          {/* {ProfileModal} */}
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            닫기
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default UserPost;
