import React from 'react';
import { Button,FormControl,Form,Container,InputGroup,Row,Col,Jumbotron} from 'react-bootstrap';
import './About.css'

class About extends React.Component {
  
  render () {
    return (
      <div>
        <Jumbotron className="bg">
          <Container>
            <h2 className="txt">OUR CONTRIBUTORS</h2>
          </Container>
        </Jumbotron>



      <Container>
       
      <h2>Mentors</h2>
      <hr></hr>
      
  <div className="card1" >
  <img src={require('../../ferdose.jpeg')} alt="John" style={{width:'60%'}} />
  <h1>Ferdous Ahmed Barbhuiya</h1>
  <p className="title1">Professor</p>
  <p>IIIT GUWAHATI</p>
  <div  style={{margin: '24px 0'}} >
    <a href="#"><i className="fa fa-dribbble social"></i></a> 
    <a href="#"><i className="fa fa-twitter social"></i></a>  
    <a href="#"><i className="fa fa-linkedin social"></i></a>  
    <a href="#"><i className="fa fa-facebook social"></i></a> 
  </div>
  <p><Button className="button1">Contact</Button ></p>
</div>




        <h2>Students</h2>
      <hr></hr>
  <Row className="row">
      <Col>
  <div className="card1">
  <img src={require('../../saurav.jpeg')} alt="John" style={{width:'70%'}} />
  <h1>Saurabh</h1>
  <p className="title1">Student</p>
  <p>IIIT GUWAHATI</p>
  <div  style={{margin: '24px 0'}} >
    <a href="#"><i className="fa fa-dribbble social"></i></a> 
    <a href="#"><i className="fa fa-twitter social"></i></a>  
    <a href="#"><i className="fa fa-linkedin social"></i></a>  
    <a href="#"><i className="fa fa-facebook social"></i></a> 
  </div>
  <p><Button className="button1">Contact</Button ></p>
</div>
</Col>
<Col>
  <div className="card1">
  <img src={require('../../gargee.jpg')} alt="John" style={{width:'70%'}} />
  <h1>Gargee</h1>
  <p className="title1">Student</p>
  <p>IIIT GUWAHATI</p>
  <div  style={{margin: '24px 0'}} className="social">
  <a href="#"><i className="fa fa-dribbble social"></i></a> 
    <a href="#"><i className="fa fa-twitter social"></i></a>  
    <a href="#"><i className="fa fa-linkedin social"></i></a>  
    <a href="#"><i className="fa fa-facebook social"></i></a> 
  </div>
  <p><Button className="button1">Contact</Button ></p>
</div>
</Col>
<Col>
  <div className="card1">
  <img src={require('../../sahil.jpg')} alt="John" style={{width:'98%'}} />
  <h1>Sahil</h1>
  <p className="title1">Student</p>
  <p>IIIT GUWAHATI</p>
  <div  style={{margin: '24px 0'}} className="social">
  <a href="#"><i className="fa fa-dribbble social"></i></a> 
    <a href="#"><i className="fa fa-twitter social"></i></a>  
    <a href="#"><i className="fa fa-linkedin social"></i></a>  
    <a href="#"><i className="fa fa-facebook social"></i></a> 
  </div>
  <p><Button className="button1">Contact</Button ></p>
</div>
</Col>
<Col>
  <div className="card1">
  <img src={require('../../parth.JPG')} alt="John" style={{width:'80%'}} />
  <h1>Parth</h1>
  <p className="title1">Student</p>
  <p>IIIT GUWAHTI</p>
  <div  style={{margin: '24px 0'}} className="social">
  <a href="#"><i className="fa fa-dribbble social"></i></a> 
    <a href="#"><i className="fa fa-twitter social"></i></a>  
    <a href="#"><i className="fa fa-linkedin social"></i></a>  
    <a href="#"><i className="fa fa-facebook social"></i></a> 
  </div>
  <p><Button className="button1">Contact</Button ></p>
</div>
</Col>
  
  </Row>
  <Row className="row">
      <Col>
  <div className="card1">
  <img src={require('../../ankit.jpg')} alt="John" style={{width:'60%'}} />
  <h1>Ankit</h1>
  <p className="title1">Student</p>
  <p>IIIT GUWAHATI</p>
  <div  style={{margin: '24px 0'}} className="social">
  <a href="#"><i className="fa fa-dribbble social"></i></a> 
    <a href="#"><i className="fa fa-twitter social"></i></a>  
    <a href="#"><i className="fa fa-linkedin social"></i></a>  
    <a href="#"><i className="fa fa-facebook social"></i></a> 
  </div>
  <p><Button className="button1">Contact</Button ></p>
</div>
</Col>
<Col>
  <div className="card1">
  <img src={require('../../ashu.jpg')} alt="John" style={{width:'70%'}} />
  <h1>Ashutosh</h1>
  <p className="title1">Student</p>
  <p>IIIT GUWAHATI</p>
  <div  style={{margin: '24px 0'}} className="social">
  <a href="#"><i className="fa fa-dribbble social"></i></a> 
    <a href="#"><i className="fa fa-twitter social"></i></a>  
    <a href="#"><i className="fa fa-linkedin social"></i></a>  
    <a href="#"><i className="fa fa-facebook social"></i></a> 
  </div>
  <p><Button className="button1">Contact</Button ></p>
</div>
</Col>
<Col xs={5}></Col>

  
  </Row>
</Container>
      </div>
    );
  }
}
 export default About;