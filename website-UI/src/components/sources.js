import React from 'react';
import { Button,FormControl,Form,Container,InputGroup,ListGroup, Tooltip,Row,Col} from 'react-bootstrap';
import Tool from "./Tooltip/Tooltip";


class Source extends React.Component {

  render () {
    return (
      <div>
       
    <div>
      <Container>

      <ListGroup>
      

            <h3>OUR RESULTS ARE BASED ON FOLLOWING SOURCES..WE CANT BE 100% SURE BUT RESULTS ARE TOTALLY BASED ON FOLLOWING SOURCES</h3>
            <h3>TOP 10 SOURCES ARE SHOWN BELOW</h3>
              </ListGroup>
             
                {this.props.title.map(function(name, index){
                    return(
                      <div>

                      
                      {
                        name.score=="agree"? <Row className="agree">
                      
                      
                        <Col xs={9} key={ index }><h3>{name.title}</h3></Col >
                        <Col ><a href={name.link}><Button  variant="success" size="lg" block><i class="fas fa-link"></i>Sources</Button></a></Col >
                        <Col ><Tool summary= {name.summary} /></Col >
                        </Row>:null
                      }
                      {
                        name.score=="disagree"? <Row className="disagree">
                      
                      
                        <Col xs={9} key={ index }><h3>{name.title}</h3></Col >
                        <Col ><a href={name.link}><Button  variant="success" size="lg"><i class="fas fa-link"></i>Sources</Button></a></Col >
                        <Col ><Tool summary= {name.summary} /></Col >
                        </Row>:null
                      }
                      {
                        name.score=="discuss"? <Row className="discuss">
                      
                      
                        <Col xs={9} key={ index }><h3>{name.title}</h3></Col >
                        <Col ><a href={name.link}><Button  variant="success" size="lg"><i class="fas fa-link"></i>Sources</Button></a></Col >
                        <Col ><Tool summary= {name.summary} /></Col >
                        </Row>:null
                      }
                      </div>
                     )
                  })}
        
           

        
      </Container>
      </div>

      </div>
    );
  }
}
 export default Source;

