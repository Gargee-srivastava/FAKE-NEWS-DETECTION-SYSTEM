import React from 'react';
import { Button,FormControl,Form,Container,InputGroup,ListGroup, Tooltip,Row,Col} from 'react-bootstrap';




class Twitter_sources extends React.Component {

  constructor () {
    super();
    this.state = {
      showModal: false,
      dat:[]

    };
   
  }


  async componentDidMount (){
    var dt=[];
    

   this.props.title.forEach( async element => {
      if(element!=undefined){ 
     var st=element.match(/#[a-z]+/gi);
     if(st!=null){ 
     st.forEach( ele =>{
      dt.push(ele)
      console.log(ele)
     })
    }
  }
  // console.log(element.text)



   });
   let unique = [...new Set(dt)];

 
   await this.setState({ dat:unique });


  



  }


  render () {
    return (
      
       
    <div>
      <Container  >
     
      {this.state.dat.map(function(name){
        return (
          <Button size='bg' style={{margin:'4px'}}  variant="info"><div>{name}</div></Button>
        
        )
      })}
        
      </Container>
      </div>

   
     









    );
  }
}
 export default Twitter_sources;

