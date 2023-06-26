import React, { useContext, useEffect, useRef, useState } from "react";
import {Card, Button, Modal } from "semantic-ui-react";
import axios from "axios";
import { SessionContext } from "../../contexts/SessionContext";
import "../../assets/css/feed/MyFeed.css"
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



const MyFeed = () => {

    // 사용자 세션 컨텍스트
    const { sessionUser } = useContext(SessionContext);
    console.log("abvc",sessionUser)
  // 모달의 표시 여부와 내용을 관리하는 상태
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // 이미지 파일을 관리하는 상태와 ref
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();


  // 선택된 이미지 파일을 저장하는 함수
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
      previewRef.current.src = reader.result;
    };
  };
  // 모달을 닫는 함수
  const handleCloseModal = () => {
    setOpen(false);
    previewRef.current.src = "/defaultphpto.jpg"
    setImgFile(`data:image/;base64,${myFeed[0]?.myFeed.mem_photo}`)
  
  };
  const [member, setMember] = useState(null);


  const [nick, setNick] = useState(""); // 닉네임
  const handleNickCheck = (e) => {
    setNick(e.target.value)
  }
  // //닉네임 중복확인
  const onCheckNick = (e) => {
    const formData = new FormData();
    console.log("nickck" ,nickRef.current.value )
    formData.append("mem_nick", nickRef.current.value);

    axios
      .post("http://172.30.1.22:8087/hogward/nickcheck", formData)
      .then((res) => {
        console.log(res)        
        if (res.data == 0) {
          alert("사용 가능한 닉네임 입니다.");
        } else {
          alert("중복된 닉네임 입니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ref
  const previewRef = useRef();
  const nickRef = useRef();
 
  // 프로필 카드 클릭 이벤트 핸들러
  const handleCardClick = () => {
    setModalContent(
      <div className="pfmodal">
        <form
          method="post"
          action={`http://172.30.1.22:8087/hogward/profileupdate/${sessionUser.email}`}
          className="authform"
          encType="multipart/form-data"
        >
          {/* 선택된 프로필 이미지 미리보기 */}
          
          <img
            src={imgFile ? imgFile :`data:image/;base64,${myFeed[0]?.myFeed.mem_photo}`}
            alt="프로필 이미지"
            className="authform_preview"
            ref={previewRef}
            //사진 꾸미기
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          {/* 프로필 이미지 레이블 및 입력 */}
          <label className="signup-profileImg-label" htmlFor="profileImg">
            프로필 사진 변경
          </label>{" "}
          <br/><br/><br/>
         
          <input
            className="signup-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
            name="b_file"
          />
            <div >
            <input
              name="mem_nick"
              type="text"
              className="profile-nick"
              placeholder={`${myFeed.length > 0
                ? myFeed[0].myFeed.mem_nick
                : "수정할 닉네임"}`}
              onChange={handleNickCheck}
              ref={nickRef}
            /> 
            <button type="button" class="btn btn-dark" onClick={onCheckNick}>
                중복확인
              </button>
            <br/>
            <input
              name="mem_introduce"
              type="text"
              className="profile-introduce"
              placeholder={`${myFeed.length > 0
                ? myFeed[0].myFeed.mem_Introduce
                : "수정할 자기소개"}`}
            /> <br/>
            {/* <input
              type="password"
              className="profile-introduce"
              placeholder="비밀번호를 입력해 주세요"
            /> <br/>
            <input
              name="mem_pw"
              type="password"
              className="profile-introduce"
              placeholder="비밀번호를 다시 입력해주세요"
            /> <br/> */}
            </div>

          <br></br>
          <br></br>
          <br></br>

          {/* 수정 버튼 */}
          <Button variant="outlined" color="error" type="submit">
            수정하기
          </Button>
        </form>
      </div>
    );
    setOpen(true);
  };

  // 게시물 버튼 클릭 이벤트 핸들러
  const handleGridItemClick = (b_seq) => {
    console.log(b_seq);
    axios
      .get(`http://172.30.1.22:8087/hogward/boardone/${b_seq}`)
      .then((res) => {
        const oneb = res.data.boardOne;
        console.log("2", res.data);
        setMember(res.data.boardOne);
        setModalContent(
          <div>
            <h2>{oneb.b_title}</h2>
            <p>
              <img src={`data:image/;base64,${oneb.b_file}`} />
            </p>
            <p>장소 : {oneb.b_loc}</p>
            <p>내용 : {oneb.b_content}</p>
            {/* <p>좋아요 : {oneb.b_likes}</p> */}
            <p>태그 : {oneb.b_tag}</p>
          </div>
        );
      });

    setOpen(true);
  };



  // 사용자 피드 데이터를 가져오는 상태와 함수
  const [myFeed, setMyFeed] = useState([]);
  const getMyFeed = () => {
    if(sessionUser.email !== ""){
      const url = `http://172.30.1.22:8087/hogward/myfeed/${sessionUser.email}`;
      // const url = `http://172.30.1.22:8087/hogward/myfeed/ekekek@naver.com`;
      axios.get(url).then((res) => {
        setMyFeed(res.data);
        console.log(res.data);
      });
    }
  };

  // 컴포넌트 마운트 시 사용자 피드 데이터 가져오기
  useEffect(() => {
    getMyFeed();
  }, [sessionUser]);

  useEffect(() => {}, []);

  return (
    <div className="myfeed">
      <div style={{ display: "flex", padding: "50px" }}>
        <div style={{ flex: 3, padding: "5px" }}>
            
            <div className="profile">

            <Card onClick={handleCardClick} className="profileline">
                    <div >
                            { myFeed.length > 0 ? (
                            <img className="profileImg"
                            src={"data:image/;base64," + myFeed[0].myFeed.mem_photo}

                            // wrapped
                            // ui={false}
                            />
                            ) : (
                            // 프로필 사진 없을 때 기본 프로필 사진
                            <img className="profileImg"
                            src="/defaultphoto.jpg"
                            // wrapped
                            // ui={false} 
                            />
                            )}
                    </div>
              
                </Card>
            </div>
            

              {/* 프로필 정보 (닉네임, 가입 날짜, 자기 소개) */}
              <div className="Information">
                    <p className="name">{myFeed.length > 0 ? myFeed[0].myFeed.mem_nick : "닉네임"}</p>
                    {/* <p className="date">
                    {myFeed.length > 0
                    ? myFeed[0].myFeed.mem_joindate
                    : "가입날짜"} 
                    </p> */}

                    <p className="introduce">
                        {myFeed.length > 0
                        ? myFeed[0].myFeed.mem_Introduce
                        : "자기소개"}
                    </p>
             </div>

       


        </div>
      </div>

      {/* 사용자 게시물 */}

      <div className="photolist">
      <Box sx={{ width: 1200, height: 800, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {myFeed.map((post, index) => (
          <ImageListItem key={index} onClick={() => handleGridItemClick(post.myFeed.b_seq)}>
            <img
              src={"data:image/;base64," + post.myFeed.b_file }
              
             
              loading="lazy"
            />
            
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
      </div>


      {/* 모달 */}

      <Modal
        open={open}
        onClose={handleCloseModal}
        size="small"
        className="MyFeedModal"
      >
        <Modal.Content>{modalContent}</Modal.Content>
      </Modal>



      {/* 억지렌더링 */}
      {console.log(imgFile)}
      {console.log(member)}
      {console.log(sessionUser)}
    </div>
  );
};


export default MyFeed;
