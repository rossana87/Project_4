/* eslint-disable semi */
/* eslint-disable quotes */
import { useEffect, useState } from "react";
// Import Link for use as nav links
import { Link, useLocation, useNavigate } from "react-router-dom";

// React Bootstrap Components
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import Logo from "../../images/logo.jpg";
import { isAuthenticated, removeToken } from "../../helpers/auth";

const PageNavbar = () => {
  // console.log('isAuthenticated ->', isAuthenticated())

  // ! Location variables
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('LOCATION ->', location)
  }, [location]);

  const handleLogOut = () => {
    // Remove token from local storage
    removeToken();
    navigate("/login");
  };

  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand to="/" as={Link} className="logo">
          <img src={Logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link
              to="/"
              as={Link}
              className={location.pathname === "/" ? "active" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              to="/classes"
              as={Link}
              className={location.pathname === "/classes" ? "active" : ""}
            >
              Classes
            </Nav.Link>
            {/* check if authenticated. if true, show logout and profile, otherwise show login and register links */}
            {isAuthenticated() ? (
              <>
                <Nav.Link
                  to="/booking"
                  as={Link}
                  className={location.pathname === "/booking" ? "active" : ""}
                >
                  Bookings
                </Nav.Link>
                <span className="nav-link" onClick={handleLogOut}>
                  Logout
                </span>
              </>
            ) : (
              <>
                <Nav.Link
                  to="/register"
                  as={Link}
                  className={location.pathname === "/register" ? "active" : ""}
                >
                  Register
                </Nav.Link>
                <Nav.Link
                  to="/login"
                  as={Link}
                  className={location.pathname === "/login" ? "active" : ""}
                >
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PageNavbar;
