import React, { useContext, useEffect, useRef, useState } from "react";
import { Feed, Button, Image, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faSmile,
} from "@fortawesome/free-regular-svg-icons";
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
import { SessionContext } from "../../contexts/SessionContext";
import Swal from "sweetalert2";

const UserPost = () => {
  // 세션 구현
  const { sessionUser } = useContext(SessionContext);

  const [open, setOpen] = useState(false); // 모달의 상태를 관리하는 state
  const [modalContent, setModalContent] = useState(null); // 모달에 표시될 내용을 관리하는 state

  // 다른사람 피드,댓글 최신순 데이터
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

  // 댓글 작성 함수
  const [reply, setReply] = useState("");
  const insertReply = (b_seq) => {
    if (reply !== "") {
      const url = "http://172.30.1.22:8087/hogward/writereply";
      axios({
        method: "post",
        url,
        data: {
          mem_email: sessionUser.email,
          b_seq,
          b_comment: reply,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "댓글을 작성하는데 로그인이 필요합니다",
        confirmButtonColor: "#e74c3c",
        confirmButtonText: "확인",
      });
    }
  };

  // 댓글 가져오는 함수
  const getUserFeed = async (b_seq) => {
    const url = `http://172.30.1.22:8087/hogward/replylist/${b_seq}`;
    const res = await axios.get(url);
    console.log("res", res.data);
    return res.data;
  };

  // inputRef
  const replyInputRef = useRef();

  return (
    <div className="userpost">
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
                // onClick={() => handleProfileClick(item)}
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
                  <div className="userpost_reply">
                    <div className="userpost_reply_replys">
                      {console.log(getUserFeed(item.usersFeed.b_seq))}
                      {/* 댓글, 사진 map돌리기 */}
                      <div className="userpost_reply_post">
                        <img
                          src={"data:image/;base64," + item.usersFeed.mem_photo}
                          alt="사진"
                          className="userpost_reply_mem_photo"
                        />
                        <span className="userpost_reply_mem_nick">다요미</span>
                        <span className="userpost_reply_mem_comment">
                          안녕하세요
                        </span>
                      </div>
                      {/* 구분 */}
                      <div className="userpost_reply_post">
                        <img
                          src={"data:image/;base64," + item.usersFeed.mem_photo}
                          alt="사진"
                          className="userpost_reply_mem_photo"
                        />
                        <span className="userpost_reply_mem_nick">다요미</span>
                        <span className="userpost_reply_mem_comment">
                          안녕하세요 반가워요
                        </span>
                      </div>
                    </div>
                    <div className="userpost_reply_write">
                      <span>
                        <FontAwesomeIcon icon={faSmile} />
                      </span>
                      {sessionUser.email === "" ? (
                        <input
                          type="text"
                          placeholder="로그인 해주세요"
                          onChange={(e) => setReply(e.target.value)}
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder="댓글을 남겨주세요"
                          refs={replyInputRef}
                          onChange={(e) => setReply(e.target.value)}
                        />
                      )}

                      <button
                        className="userpost_reply_submit"
                        onClick={(e) => {
                          insertReply(item.usersFeed.b_seq);
                          console.log(replyInputRef.current);
                        }}
                      >
                        작성
                      </button>
                    </div>
                  </div>
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
      {/* <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Content>
          {modalContent}
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            닫기
          </Button>
        </Modal.Actions>
      </Modal> */}
    </div>
  );
};

export default UserPost;
