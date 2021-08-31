
import React from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap'
import  './MainNavigation.css'



function MainNavigation() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
        <Container className="navbar-container">
          <Navbar.Brand  href="/">Library</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="navbar-tabs">
            <Nav className="me-auto navbar-nav-custom">
              <Nav.Link href="/Publishers">Publishers</Nav.Link>
              <Nav.Link href="/Books">Books</Nav.Link>
              <Nav.Link href="/Authors">Authors</Nav.Link>

            </Nav>
         
          </Navbar.Collapse>
          <Nav>
              <Navbar.Text>
                <Nav.Link href="/Logout">Logout</Nav.Link>
              </Navbar.Text>
            </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default MainNavigation
