import { NavLink } from "@remix-run/react";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export const DemoNavbar = () => {
  return (
    <Navbar
      className="px-3 px-md-5"
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Wevr <span className="text-muted">Jobs</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link as={NavLink} to="/" className="nav-link">
              Positions
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/positions">
              Positions
            </Nav.Link> */}
            <Nav.Link as={NavLink} to="/offers">
              Offers
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
