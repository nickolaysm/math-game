import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeaderNavigation = () => {
  return (
    <div>
      <Navbar>
        <Navbar.Brand>Игра "Спички"</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Главная
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            История
          </Nav.Link>
          <Nav.Link as={Link} to="/game">
            Игра
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default HeaderNavigation;
