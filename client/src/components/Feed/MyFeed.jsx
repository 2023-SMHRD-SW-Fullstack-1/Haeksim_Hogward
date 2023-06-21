import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Grid,
  Image,
  Card,
  Button,
  Modal,
  Container,
  Label,
  Icon
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import ProfileModal from "./ProfileModal";
import "../../assets/css/feed/FeedButton.css";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from "sweetalert2";


//아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import SessionContext from "../../contexts/SessionContext";

const MyFeed = () => {
  const [allboard, setAllBoard] = useState([]);
  const [mem, setMem] = useState([]);
  const [open, setOpen] = useState(false); // 모달의 상태를 관리하는 state
  const [modalContent, setModalContent] = useState(null); // 모달에 표시될 내용을 관리하는 state
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  const [isLocOk, setIslocOk] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (event, value) => {
    if (value && value.length <= 3) {
      setSelectedTags(value);
    }
  };

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  // const [email, setEmail] = useState(""); // 아이디 입력 상태

  // //로그인 버튼 클릭
  // const handlePicChange = () => {
  //   const formData = new FormData();
  //   formData.append("mem_email", email);
  //   // formData.append('mem_pw', password);

  //   axios
  //     .post("http://172.30.1.22:8087/hogward/myfeed/{mem_email}", formData)
  //     .then((res) => {
  //       console.log(res.data);
  //       // 1이면 로그인 성공

  //       if (res.data == 1) {
  //         // 1이면 로그인 성공
  //         alert("환영합니다!");
  //         window.location.href = "/";
  //       } else {
  //         // 0이면 회원가입 실패
  //         alert("로그인에 실패했습니다. 다시 시도해 주세요.");
  //         window.location.href = "/login";
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // alert('Error!');
  //       console.log(error.res);
  //       console.log(formData);
  //     });
  // };

  // Grid에 표시될 게시물을 저장할 state를 추가합니다.
  const [posts, setPosts] = useState([]);

  // 데이터베이스에서 게시물 데이터를 가져옵니다.
  useEffect(() => {
    // 여기에 게시물 데이터를 가져오는 API 엔드포인트의 URL을 입력하세요.
    // mem_email 01
    const sessionEmail = "mem_email 01";
    const url = `172.30.1.22:8087/hogward/profileupdate/${sessionEmail}`;
    axios
      .get(url)
      .then((res) => {
        // 가져온 데이터를 posts state에 저장합니다.
        setPosts(res.data);
      })
      .catch((err) => {
        // 에러가 발생한 경우 콘솔에 에러를 출력합니다.
        console.error("데이터를 가져오는데 실패했습니다! ", err);
      });
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트가 마운트 될 때 한 번만 실행됩니다.

  // const rows = [
  //   {
  //     columns: 4,
  //     imageUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Ts_tAWo1l-pgKkO4xCGSm0rt1XechFSTkA&usqp=CAU",
  //   },
  //   {
  //     columns: 4,
  //     imageUrl: "https://react.semantic-ui.com/images/wireframe/image.png",
  //   },
  //   {
  //     columns: 4,
  //     imageUrl: "https://react.semantic-ui.com/images/wireframe/image.png",
  //   },
  // ];

  // useEffect(() => {
  //   const url = "board.json";
  //   axios.get(url).then((res) => {
  //     setAllBoard(res.data);
  //     console.log(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   const url = "member.json";
  //   axios.get(url).then((res) => {
  //     setMem(res.data);
  //     console.log(res.data);
  //   });
  // }, []);

  // 사용자 데이터 가져오기
  // useEffect(() => {
  //   const url = "";
  // });

  const handleCloseModal = () => {
    setOpen(false);
  };

  //프로필 사진 클릭시 실행
  const handleCardClick = () => {
    setModalContent(
      <div>
        <form
          method="post"
          action="http://172.30.1.22:8087/hogward/profileupdate/mem_email 01"
          className="authform"
          encType="multipart/form-data"
        >
          {/* 폼에서 보내야 할것 */}
          {/* 글 사진 */}
          <img
            src={
              imgFile
                ? imgFile
                : `????????`
            }
            alt="프로필 이미지"
            className="authform_preview"
          />
          <label className="signup-profileImg-label" htmlFor="profileImg">
            프로필 사진 변경
          </label>
          <input
            className="signup-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
            name="b_file"
          />

          <input type="hidden" name="b_tag" value={handleTagChange} />

          <input type="hidden" readOnly />
          {isLocOk ? (
            <Button variant="outlined" color="error" type="submit">
              수정하기
            </Button>
          ) : (
            // 테스트용
            <Button
              variant="outlined"
              color="error"
              type="submit"
              onChange="handlePicChange"
            >
              수정하기
            </Button>
            // 찐
            // <Button variant="outlined" color="error" onClick={handleIsOk}>
            //   인증 위치 확인
            // </Button>
          )}
        </form>
      </div>
    );
    setOpen(true);
  };

  const handleButtonClick = () => {
    setModalContent(<div>버튼을 클릭했습니다.</div>);
    setOpen(true);
  };

  const handleGridItemClick = () => {
    setModalContent(<div>그리드 아이템을 클릭했습니다.</div>);
    setOpen(true);
  };

  const sessionValue = useContext(SessionContext);
  console.log(sessionValue?.email);
  const [myFeed, setMyFeed] = useState([]);
  const getMyFeed = () => {
    const url = `http://172.30.1.22:8087/hogward/myfeed/mem_email%2001`
    axios.get(url).then( res => {
      console.log("myfeed : ",res.data)
      setMyFeed(res.data);
    })
  }
  useEffect(() => {
    getMyFeed()
  },[])
  return (  
    //프로필 
    <div>
      <div style={{ display: "flex", padding: "100px" }}>
        <div style={{ flex: 1, padding: "10px" }}>
          <Card  onClick={handleCardClick}>
            {myFeed.length > 0 && 
             <Image
           
             src={"data:image/;base64," + myFeed[0].myFeed.mem_photo}
             wrapped
             ui={false}
           />
            }
           
           <Card.Content>
    <Card.Header>{myFeed.length > 0 ? myFeed[0].myFeed.mem_nick : '닉네임'}</Card.Header> {/* 닉네임 */}
    <Card.Meta>
      <span className="date">
        {myFeed.length > 0 ? myFeed[0].myFeed.mem_joindate : '가입날짜'} {/* 가입 날짜 */}
      </span>
    </Card.Meta>
    <Card.Description>
      {myFeed.length > 0 ? myFeed[0].myFeed.mem_Introduce : '자기소개'} {/* 자기소개 */}
    </Card.Description>
  </Card.Content>
  <Card.Content extra></Card.Content>
</Card>
        </div>

        <div classname="feedbutton" style={{ flex: 1, padding: "50px" }}>
          {/* <Button.Group vertical style={{ margin: "10px" }}> */}
            {/* <Button
              color="red"
              content="팔로우"
              // icon="user plus"

              onClick={handleButtonClick}
              style={{ marginBottom: "10px", fontSize: "14px" }}
              // label={{
              //     as: 'a',
              //     basic: true,
              //     color: 'red',
              //     pointing: 'left',
              //     content: '0'
              // }}
            />
            <Button
              color="blue"
              content="팔로워"
              icon="thumbs up outline"
              onClick={handleButtonClick}
              style={{ marginBottom: "10px", fontSize: "14px" }}
              // label={{
              //     as: 'a',
              //     basic: true,
              //     color: 'blue',
              //     pointing: 'left',
              //     content: '0'
              // }}
            /> */}
            <Button
              color="black"
              content="게시글"
              icon="edit outline"
              onClick={handleButtonClick}
              style={{ fontSize: "14px" }}
              // label={{
              //     as: 'a',
              //     basic: true,
              //     color: 'black',
              //     pointing: 'left',
              //     content: '1'
              // }}
            />
          {/* </Button.Group> */}
        </div>
      </div>

      {/* 사용자 게시물 */}
      <div>
        <Grid style={{ display: "flex" }}>
          {/* 단일 Grid.Row 내부에 여러 Grid.Column을 배치하여 가로로 정렬 */}
          <Grid.Row>
            {myFeed.map((post, index) => (
              <Grid.Column
                key={index}
                onClick={handleGridItemClick}
                style={{ width: "25%" }}
              >
                <Image src={"data:image/;base64," + post.myFeed.b_file} />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </div>

      {/* 모달 부분 */}
      <Modal open={open} onClose={handleCloseModal} size="small">
        <Modal.Content>{modalContent}</Modal.Content>
      </Modal>
    </div>
  );
};

export default MyFeed;
