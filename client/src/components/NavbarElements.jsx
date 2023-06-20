import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavbarElements() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant='dark'>
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
            <Nav.Link href="/join">회원가입</Nav.Link>
            <Nav.Link eventKey={2} href="/login">
              로그인
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarElements;