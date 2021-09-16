
import React from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap'
import  './MainNavigation.css'
import logo6 from  "../../images/logo6.png";


function MainNavigation() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" variant="light" className="bg-blue">
        <Container className="navbar-container">
          <Navbar.Brand  href="/"><img className="logo-img" src={logo6}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="navbar-tabs">
            <Nav className="me-auto navbar-nav-custom">
              <Nav.Link href="/Publishers" className="nav-title">Publishers</Nav.Link>
              <Nav.Link href="/Books" className="nav-title">Books</Nav.Link>
              <Nav.Link href="/Authors" className="nav-title">Authors</Nav.Link>

            </Nav>
         
          </Navbar.Collapse>
          <Nav>
              <Navbar.Text>
                <Nav.Link href="/">Logout</Nav.Link>
              </Navbar.Text>
            </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default MainNavigation
