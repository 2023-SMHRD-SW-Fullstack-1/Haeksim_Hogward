import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/NavbarElements.css";
import axios from "axios";
import KakaoChatButton from "./Feed/KakaoChatButton";

function NavbarElements() {
  // 세션
  const { sessionUser, setSessionUser } = useContext(SessionContext);

  // 유저 레벨 가져오기 함수 (지역당 레벨1)
  const [userlevel, setUserLevel] = useState(0);
  useEffect(() => {
    if (sessionUser.email !== "") {
      const url = `http://172.30.1.22:8087/hogward/certifiedlandmarks/${sessionUser.email}`;
      axios.get(url).then((res) => {
        setUserLevel(res.data.length);
        setSessionUser({ ...sessionUser, level: res.data.length });
      });
    }
  }, [sessionUser.email]);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="transparent"
      variant="dark"
      className="navbar_header"
    >
      <Container>
        <Navbar.Brand href="/">호그와드</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/magicmap">마법지도</Nav.Link>
            {/* <Nav.Link href="/foottracer"></Nav.Link> */}
            <Nav.Link href="/userpage">피드</Nav.Link>

            <Nav.Link href="/mypage">마이페이지</Nav.Link>
          </Nav>
          <Nav>
            {sessionUser.email !== "" ? (
              <>
                <Nav.Link style={{ color: "skyblue" }}>
                  {sessionUser.nick}
                  <span style={{ color: "red" }}> Lv.{userlevel}</span>
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    sessionStorage.clear();
                    setSessionUser({ email: "", nick: "" });
                    window.location.reload();
                  }}
                >
                  로그아웃
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/join">회원가입</Nav.Link>
                <Nav.Link eventKey={2} href="/login">
                  로그인
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <KakaoChatButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarElements;
