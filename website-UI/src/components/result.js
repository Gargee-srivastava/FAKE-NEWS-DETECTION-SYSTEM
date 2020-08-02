import React from 'react';
import { Button,FormControl,Form,Container,InputGroup} from 'react-bootstrap';


class Result extends React.Component {
  //status
  //per
 

   
 

 

  render () {
    return (
      <div>
      <Container>
        <div>
        {this.props.tr==0&&this.props.fl==0&&this.props.d==0?null:
      
          <div>
        {this.props.tr-(this.props.d)/3-2*(this.props.fl)>=0?
        
        
        this.props.tr-(this.props.d)/2-2*(this.props.fl)>=0?
        
         
          <div className="result">
          <img src={require('../status1.jpg')} className='status' />
          <img src={require('../true1.jpg')} className='truee' />
          </div>
          
          :
          <div className="result">
          <img src={require('../status1.jpg')} className='status' />
          <img src={require('../maybe1.jpg')} className='falsee' />
      
      
      
          </div>

:<div className="result">
    <img src={require('../status1.jpg')} className='status' />
    <img src={require('../false1.png')} className='falsee' />



    </div>}</div>}
          
        </div>
      </Container>
      </div>
    );
  }
}
 export default Result;

