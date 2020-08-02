
import React, { Component } from 'react';
import { Button,FormControl,Form,Nav,Navbar,NavDropdown} from 'react-bootstrap';
import Notifications from './Notifications'
class NavBar extends Component {
  render() {
    return (
        <Navbar bg="dark" variant="dark" sticky="top" size="lg">
        <Navbar.Brand href="/">F&C</Navbar.Brand>
        <Nav className="mr-auto">
        <NavDropdown title="AboutUS" >
        <NavDropdown.Item href="/contributors">Contributors</NavDropdown.Item>
        <NavDropdown.Item href="http://iiitg.ac.in/">Our college</NavDropdown.Item>
        
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Our Sources<i class="fas fa-link"></i></NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/image"> <i class="fas fa-camera-retro">Check</i></Nav.Link>
      <Nav.Link href="/video"><i class="fas fa-video">check </i></Nav.Link>
      <Nav.Link href="/offensive"><i class="fas fa-bullhorn">Check offensive meter</i></Nav.Link>
      <Nav.Link href="/social"><i class="fab fa-twitter">Check social meter <Notifications count = {this.props.count} /></i></Nav.Link>
      
        </Nav>
        {/* <Form inline>
          <Button variant="outline-info">Our Sources<i class="fas fa-link"></i></Button>
        </Form> */}
      </Navbar>
    );
  }
}

export default NavBar;