import React, { useEffect, useState } from "react";
import {
  Card,
  Feed,
  Button,
  Header,
  Image,
  Modal,
  ModalContent,
} from "semantic-ui-react";
import "../../assets/css/feed/UserRank.css";
import axios from "axios";

const UserRank = () => {
  const [open, setOpen] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  // 랭킹 데이터 가져오기
  const [userRankData, setUserRankData] = useState(null);
  useEffect(() => {
    const url = `http://172.30.1.22:8087/hogward/ranking`;
    axios.get(url).then((res) => {
      setUserRankData(res.data);
      console.log("랭킹데이터가져오기 :", res.data);
    });
  }, []);

  //랭킹 사진 클릭 했을 떼 ->
  const handleSummaryClick = (item) => {
    setSelectedSummary(
      <div>
        <p>{item.rankingTen.mem_nick}</p>
        <Image
          src={"data:image/;base64," + item.rankingTen.mem_photo}
          size=""
        />
      </div>
    );
    console.log("랭킹클릭 : ", handleSummaryClick);
    console.log("셀렉서머리클릭 :", selectedSummary);

    //랭킹 클릭시 데이터 가져오는 axios
    axios.get(`http://172.30.1.22:8087/hogward/ranking`).then((res) => {
      setUserPosts(res.data);
    });
    console.log("유저포스트: ", userPosts);
    setOpen(true);
  };

  return (
    <div className="userrank" style={{ position: "fixed" }}>
      <Card>
        <Card.Content>
          <Card.Header>랭킹</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            {userRankData?.map((item, index) => (
              <Feed.Event key={index} onClick={() => handleSummaryClick(item)}>
                <Feed.Label
                  image={`data:image/;base64,${item.rankingTen.mem_photo}`}
                  // onClick={() => handleSummaryClick(event.summary)}
                  style={{ cursor: "pointer" }}
                />

                <Feed.Content>
                  <Feed.Date
                    content={`${item.rankingTen.mem_nick}`}
                    style={{ color: "black" }}
                  />
                  <Feed.Summary
                  // onClick={() => handleSummaryClick(event.summary)}
                  // style={{ cursor: "pointer" }}
                  >
                    {item.rankingTen.authcount}회
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            ))}
          </Feed>

          <Modal onClose={() => setOpen(false)} open={open}>
            <Modal.Header>랭킹</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>{selectedSummary}</Header>
                <div>
                  {userPosts.map((post, index) => (
                    <div key={index}>
                      {/* <h3>{post.rankingTen.mem_nick}</h3> */}
                      <p>{post.content}</p>
                    </div>
                  ))}
                </div>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={() => setOpen(false)}>
                닫기
              </Button>
            </Modal.Actions>
          </Modal>
        </Card.Content>
      </Card>
    </div>
  );
};

export default UserRank;
