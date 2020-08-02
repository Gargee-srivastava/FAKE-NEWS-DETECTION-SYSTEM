import React from 'react';
import request from 'request'
import axios from 'axios';
import { Button,FormControl,Form,Container,InputGroup,Jumbotron,Row,Col} from 'react-bootstrap';
import Modal from './components/model'
import ReactSpeedometer from "react-d3-speedometer"

class Offensive extends React.Component {
  constructor(){

  super();
  
  this.state = { 
  
    // Initially, no file is selected 
    selectedFile: null,
    URL:"",
    showModal:false,
    resul:false,
    score:0,
    gore_moderation:false,
    porn_moderation:false,
    drug_moderation:false
  }; 

  this.updateURL = this.updateURL.bind(this);

  this.onsubmit =this.onsubmit.bind(this);
  this.onFileUpload =this.onFileUpload.bind(this);

}
   
  updateURL=(newValue)=>{
  
    const URL=this.state.URL;
    this.setState({
        
      URL:newValue.target.value
    })
    console.log(URL);
    
  };





  async onsubmit(){

    this.setState({showModal:true});

    var URL2="https://cors-anywhere.herokuapp.com/"+"https://techclans-nsfw.herokuapp.com/?url="+this.state.URL;
    var sc=0;
    await axios.get(URL2)
    .then(function (response) {
      sc=response.data.score;
    })

    //picpurify
   URL2="https://cors-anywhere.herokuapp.com/"+"https://techclan-twitter.herokuapp.com/picpurify_image?URL="+this.state.URL;
   
    var gore=false
    var porn=false
    var drug=false

    await axios.get(URL2)
    .then(function (response) {
      console.log(response.data)
      gore=response.data.gore_moderation.gore_content
      porn=response.data.porn_moderation.porn_content
      drug=response.data.drug_moderation.drug_content
    })

 
    await this.setState({gore_moderation:gore});
    await this.setState({porn_moderation:porn});
    await this.setState({drug_moderation:drug});

 
    await this.setState({score:sc});
 

   await this.setState({showModal:false});
   await this.setState({resul:true});
  
    


  }



  // On file select (from the pop up) 
  onFileChange = event => { 
   
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] }); 
  //  console.log(event.target.files[0]);
   
  };
  async onFileUpload(){ 
     
    // Create an object of formData 
    const formData = new FormData(); 
    this.setState({ showModal: true }); 
    // Update the formData object 
    formData.append( 
      "image", 
      this.state.selectedFile
    ); 
   
    var URL1;
  await axios.post('https://api.imgbb.com/1/upload?expiration=100&key=8c6ebe2fb4ab548225defbffc9cdf738',formData)
    .then(function (response) {


      URL1=response.data.data.display_url;


  
    })

    await this.setState({ URL: URL1 }); 

    /////
    var URL2="https://cors-anywhere.herokuapp.com/"+"https://techclans-nsfw.herokuapp.com/?url="+this.state.URL;
    var sc=0;
    await axios.get(URL2)
    .then(function (response) {

     

      sc=response.data.score;


  
    })


     //picpurify
   URL2="https://cors-anywhere.herokuapp.com/"+"https://techclan-twitter.herokuapp.com/picpurify_image?URL="+this.state.URL;
   
   var gore=false
   var porn=false
   var drug=false

   await axios.get(URL2)
   .then(function (response) {
     console.log(response.data)
     gore=response.data.gore_moderation.gore_content
     porn=response.data.porn_moderation.porn_content
     drug=response.data.drug_moderation.drug_content
   })


   await this.setState({gore_moderation:gore});
   await this.setState({porn_moderation:porn});
   await this.setState({drug_moderation:drug});




   await this.setState({resul:true});
    await this.setState({score:sc});
   await this.setState({showModal:false});




  

  }; 




  render () {
    return (
      <div>
       <Jumbotron className="bg">
          <Container>
            <h2 className="txt">OFFENSIVE METER</h2>
          </Container>
        </Jumbotron>
   
      <Container>
      <InputGroup className="lg" size="lg">
    <FormControl
      placeholder="Image URL"
      aria-label="Fact checker"
      aria-describedby="basic-addon2"
      value={this.state.URL}
       
		    onChange={this.updateURL}
    /> 
  <InputGroup.Append>
  <Button onClick={this.onsubmit} variant="success" size="lg"><i class="fas fa-search"></i>Check Score</Button>

  </InputGroup.Append>
  
 
 
</InputGroup>
OR Choose from files<div>After uploading click on check score</div>
<hr></hr>

         <input type="file" onChange={this.onFileChange} /> 
                <Button onClick={this.onFileUpload}> 
                  Upload! 
                </Button> 
                </Container>



                
            {this.state.resul==true?<div>

              <Row>
              <Col>
              <img src={this.state.URL} width='80%' />
              </Col>
              <Col xs={6}>


                <Row><h2>Analysis</h2></Row>

                <Row>Porn content
                            <ReactSpeedometer
                maxValue={100}
                value={this.state.score*100}
                needleColor="blue"
                startColor="green"
                segments={10}
                endColor="red"
              />
              </Row>

            

            <Row>{this.state.gore_moderation==true?<div><Button size='bg' variant="danger"><h2>Fleshy/Bloody</h2></Button></div>:<div><Button variant="success"> <h2>Not Fleshy/Bloody</h2></Button></div>}</Row>
            <Row>{this.state.drug_moderation==true?<div><Button size='bg'variant="danger"><h2>Drug Substances</h2></Button></div>:<div><Button variant="success"> <h2>No any Drug</h2></Button></div>}</Row>
            <Row>{this.state.porn_moderation==true?<div><Button size='bg' variant="danger"><h2>vulgarity</h2></Button></div>:<div><Button variant="success"> <h2>Not  any vulgarity</h2></Button></div>}</Row>
            <Row></Row>


              </Col>
              </Row>




            </div>:null}
            {this.state.gore_content==true?<div>
                gore modetation  </div>:null}

                <Modal showModal={this.state.showModal} />
      </div>
    );
  }
}
 export default Offensive;