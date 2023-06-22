import React, { useContext, useEffect, useRef, useState } from "react";
import {Grid,Image,Card,Button,Modal} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { SessionContext } from "../../contexts/SessionContext";


const MyFeed = () => {
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
    };
  };

  // 모달을 닫는 함수
  const handleCloseModal = () => {
    setOpen(false);
  };

  // 프로필 카드 클릭 이벤트 핸들러
  const handleCardClick = () => {
    setModalContent(
      <div>
        <form
          method="post"
          action="http://172.30.1.22:8087/hogward/profileupdate/mem_email 01"
          className="authform"
          encType="multipart/form-data"
        >
          {/* 선택된 프로필 이미지 미리보기 */}
          <img
            src={imgFile}
            alt="프로필 이미지"
            className="authform_preview"
          />
          {/* 프로필 이미지 레이블 및 입력 */}
          <label className="signup-profileImg-label" htmlFor="profileImg">
            프로필 사진 변경
          </label> <br></br>
          <input
            className="signup-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
            name="b_file"
          />
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
    axios.get(`http://172.30.1.22:8087/hogward/boardOne/${b_seq}`).then((res) => {
      const oneb = res.data.oneBoard
      console.log(oneb)

      setModalContent(<div>
          <h2>{oneb.b_title}</h2>
        <p>{oneb.b_file}</p>
        <p>{oneb.b_content}</p>
      </div>);
    })
    
    setOpen(true);
  };

  // 사용자 세션 컨텍스트
  const { sessionUser } = useContext(SessionContext);
  
  // 사용자 피드 데이터를 가져오는 상태와 함수
  const [myFeed, setMyFeed] = useState([]);
  const getMyFeed = () => {
    const url = `http://172.30.1.22:8087/hogward/myfeed/admin`;
    
    axios.get(url).then((res) => {
      setMyFeed(res.data);
    });
  };
  
  // 컴포넌트 마운트 시 사용자 피드 데이터 가져오기
  useEffect(() => {
    getMyFeed();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", padding: "100px" }}>
        <div style={{ flex: 1, padding: "10px" }}>
          {/* 프로필 카드 */}
          <Card onClick={handleCardClick}>
            {/* 프로필 이미지 */}
            {myFeed.length > 0 ? (
      <Image
        src={"data:image/;base64," + myFeed[0].myFeed.mem_photo}
       
        wrapped
        ui={false}
      />
    ) : (
      // 프로필 사진 없을 때 기본 프로필 사진
      <Image
        src=" "
        wrapped
        ui={false}
      />
    )}

            {/* 프로필 정보 (닉네임, 가입 날짜, 자기 소개) */}
            <Card.Content>
              <Card.Header>
                {myFeed.length > 0 ? myFeed[0].myFeed.mem_nick : "닉네임"}
              </Card.Header>
              <Card.Meta>
                <span className="date">
                  {myFeed.length > 0
                    ? myFeed[0].myFeed.mem_joindate
                    : "가입날짜"} 
                </span>
              </Card.Meta>
              <Card.Description>
                {myFeed.length > 0
                  ? myFeed[0].myFeed.mem_Introduce
                  : "자기소개"} 
              </Card.Description>
            </Card.Content>
          </Card>
        </div>

        {/* 내정보수정 버튼*/}
        <div style={{ flex: 1, padding: "50px" }}>
          <Button
              color="black"
              content="내 정보수정"
              icon="check circle"
              onClick={handleCardClick}
              style={{ fontSize: "14px" }}
           />  
        </div>
      </div>

      {/* 사용자 게시물 */}
      <div >
        <Grid style={{ display: "flex" }}>
          
          <Grid.Row>
            {myFeed.map((post, index) => (
              <Grid.Column
                key={index}
                onClick={() => handleGridItemClick(post.myFeed.b_seq)}
                style={{ width: "25%" }}
              >

                <Image src={"data:image/;base64," + post.myFeed.b_file} />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </div>

      {/* 모달 */}
      <Modal open={open} onClose={handleCloseModal} size="small">
        <Modal.Content>{modalContent}</Modal.Content>
      </Modal>
    </div>
  );
};

export default MyFeed;
