import React from 'react';
import { Button,FormControl,Form,Container,InputGroup} from 'react-bootstrap';
import ReactModal from 'react-modal';
import Loading from "./loading/loading"

class Modal extends React.Component {
  
  render () {
    return (
      <div>
      
        <ReactModal 
           isOpen={this.props.showModal}
           contentLabel="Minimal Modal Example"
        >
            <Loading />
             
        </ReactModal>
      </div>
    );
  }
}
 export default Modal;

