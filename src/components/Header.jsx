import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import CartButton from "./CartButton";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const { user, logout } = useContext(UserContext);

  return (
    <>
      <Navbar bg="light" expand="md" className="mb-3 border-bottom">
        <Container>
          <Navbar.Brand as={Link} to="/">
            MRN XPress
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            {/* left side links */}
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/restaurants">
                Restaurants
              </Nav.Link>
            </Nav>

            {/* right side: cart + auth links */}
            <Nav>
              {/* 👇 Cart button goes BEFORE auth links */}
              <CartButton />
              <div className="ms-2" />

              {user ? (
                <>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 👇 Drawer sits outside the Navbar so it can overlay the page */}
      <CartDrawer />
    </>
  );
}
