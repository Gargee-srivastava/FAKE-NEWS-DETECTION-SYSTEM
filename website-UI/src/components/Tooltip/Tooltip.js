import React from "react";
import { Button,FormControl,Form,Container,InputGroup,Popover,OverlayTrigger} from 'react-bootstrap';

const Tool = (props) => {

    const popover = (
        <Popover id="popover-basic" >
          <Popover.Title as="h2"  className="pop"><strong>Summary</strong></Popover.Title>
          <Popover.Content>
            {props.summary}
          </Popover.Content>
        </Popover>
      );

  return (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
    <Button variant="info" size="lg" block><i class="fas fa-link"></i>Summary</Button>
  </OverlayTrigger>
  );
}

export default Tool;