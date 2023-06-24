import React, { useEffect, useState } from "react";
import { Feed, Button, Image, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../assets/css/feed/UserPost.css";

// 로딩 버튼
import {
  BallTriangle,
  Circles,
  ColorRing,
  Dna,
  Hearts,
  Puff,
  Oval,
} from "react-loader-spinner";
import UserRank from "./UserRank";

const UserPost = () => {
  const [open, setOpen] = useState(false); // 모달의 상태를 관리하는 state
  const [modalContent, setModalContent] = useState(null); // 모달에 표시될 내용을 관리하는 state

  // 다른사람 피드 최신순 데이터
  const [allfeed, setAllFeed] = useState([]);
  useEffect(() => {
    const url = "http://172.30.1.22:8087/hogward/usersfeed/1";
    // 다시 키기
    axios.get(url).then((res) => {
      setAllFeed(res.data);
    });
  }, []);

  // 페이징기법 적용 데이터 가져오기
  const [pageCnt, setPageCnt] = useState(2);
  const fetchMoreData = () => {
    const url = `http://172.30.1.22:8087/hogward/usersfeed/${pageCnt}`;
    setTimeout(() => {
      axios.get(url).then((res) => {
        setAllFeed([...allfeed, ...res.data]);
      });
    }, 1500);
    setPageCnt(pageCnt + 1);
  };

  // 프로필 사진을 클릭했을 때 실행될 핸들러 함수
  const handleProfileClick = (item) => {
    setModalContent(
      <div>
        <Image src={item.usersFeed.b_file} size="small" />
        <p>{item.usersFeed.mem_nick}</p>
      </div>
    );
    setOpen(true); // 모달 열기
  };

  // 게시물을 클릭했을 때 실행될 핸들러 함수
  const handlePostClick = (item) => {
    setModalContent(
      <div>
        <p>{item.usersFeed.b_content}</p>
        <Image src={"data:image/;base64," + item.usersFeed.b_file} size="" />
      </div>
    );
    console.log("게시물 클릭 : ", handlePostClick);
    setOpen(true); // 모달 열기
  };

  return (
    <div className="userpost">
      {/* feedData 배열을 순회하며 각 요소에 대한 JSX 구조를 동적으로 생성합니다. */}
      <InfiniteScroll
        dataLength={allfeed.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <div className="userpost_loader-container">
            <Oval color="white" width={50} secondaryColor="black" />
          </div>
        }
      >
        {allfeed?.map((item, index) => (
          <div className="individualPost" key={index}>
            <div className="userpost_header">
              <img
                src={"data:image/;base64," + item.usersFeed.mem_photo}
                alt="사진"
                className="userpost_header_mem_photo"
              />
              <span className="userpost_header_mem_nick">
                {item.usersFeed.mem_nick}
              </span>
            </div>
            <Feed.Event>
        
              {/* 게시물 클릭시 상세보기 창 */}
              <Feed.Label
                style={{ cursor: "pointer" }}
                onClick={() => handlePostClick(item)}
              >
                <img
                  src={"data:image/;base64," + item.usersFeed.b_file}
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
              </Feed.Label>
              <div className="userpost_feedContent">
                <div className="userpost_feedContent_icons">
                  <FontAwesomeIcon icon={faHeart} />
                  <FontAwesomeIcon icon={faComment} className="icons_comment" />
                </div>
                <div className="userpost_userslikes">
                  {item.usersFeed.b_likes} likes
                </div>
                <div className="userpost_usercontent">
                  {/* <span>{item.usersFeed.mem_nick}</span> */}
                  <p
                    style={{
                      color: "black",
                      fontSize: "14px",
                      marginBottom: 0,
                      marginTop: "7px",
                    }}
                  >
                    {item.usersFeed.b_content}
                  </p>
                  <p style={{ fontSize: "10px", marginTop: "10px" }}>
                    {item.usersFeed.b_datetime}
                  </p>
                  {/* 댓글 하면 */}
                  {/* <div>
                  댓글?<button className="">Post</button>
                </div> */}
                </div>
                {/* <Feed.Content>
                <Feed.Summary>
                  {item.type === "friend-addition" &&
                    " 님이 친구로 추가했습니다"}
                  {item.type === "new-illustrations" &&
                    " 님이 새로운 그림 2개를 추가했습니다"}
                  {item.type === "new-photos" &&
                    " 님이 당신의 새로운 사진 2장을 추가했습니다"}
                  {item.type === "post" && (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePostClick(item.textContent)}
                    >
                      {" "}
                      님이 페이지에 게시글을 작성했습니다
                    </span>
                  )}
                  <Feed.Date></Feed.Date>
                </Feed.Summary>
              </Feed.Content> */}
              </div>
            </Feed.Event>
          </div>
        ))}
      </InfiniteScroll>
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
          <Button color="black" onClick={() => setOpen(false)}>
            닫기
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default UserPost;
