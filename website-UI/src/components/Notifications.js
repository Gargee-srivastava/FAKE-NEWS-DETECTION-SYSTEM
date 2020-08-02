import React from 'react';
import { Button,FormControl,Form,Container,InputGroup} from 'react-bootstrap';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

class Notifications extends React.Component {
 

  render () {


    let container = {
        height: '0px',
        width: '0px',
        display: 'inline-block',
        margin: '5px',
        backgroundColor: 'gray'
      }
    return (
      
        <div style={container}>
        <NotificationBadge count={this.props.count} effect={Effect.SCALE} frameLength={60.0}/>
      </div>
    );
  }
}
 export default Notifications;

