import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SessionContext from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

function NavbarElements() {
  const sessionValue = useContext(SessionContext);
  const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">HOGWARD</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/magicmap">MAGIC MAP</Nav.Link>
            <Nav.Link href="/foottracer">FOOTER TRACER</Nav.Link>
            <Nav.Link href="/feed">FEED</Nav.Link>
          </Nav>
          <Nav>
            {sessionValue ? (
              <>
                <Nav.Link style={{ color: "skyblue" }}>
                  {sessionValue.nick}
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    sessionStorage.clear();
                    navigate(0);
                  }}
                >
                  LOGOUT
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarElements;
