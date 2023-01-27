import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logout success");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Van Nguyen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Manage Users
            </NavLink>
          </Nav>
          <Nav>
            {user && user.email && (
              <span className="nav-link">Welcome {user.email}</span>
            )}
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              {user && user.auth ? (
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="dropdown-item"
                >
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavLink to="/login" className="dropdown-item">
                  Login
                </NavLink>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
