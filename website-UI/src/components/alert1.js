import axios from 'axios';
import React, { Component ,useState} from 'react';
import { Button,FormControl,Form,Container,InputGroup,Dropdown ,Alert} from 'react-bootstrap';

import Redirect from 'react'
function AlertDismissibleExample() {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() =>  <Redirect to="/" />} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            This is because our API is not working right now,Please contact the team member OR refresh the page
          </p>
        </Alert>
      );
    }
   
  }
export default AlertDismissibleExample;