import React from 'react';


import axios from 'axios';
import { Button,FormControl,Form,Container,InputGroup,Jumbotron,Row,Col} from 'react-bootstrap';
import Modal from './components/model'

class Video extends React.Component {
  
  constructor(){

    super();
    
    this.state = { 
    
      // Initially, no file is selected 
      selectedFile: null,
      URL:"",
      showModal:false,
      resul:false,
      score:"",
      URL_PIC:[]
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
     
        //picpurify
  var URL2="https://cors-anywhere.herokuapp.com/"+"https://techclan-twitter.herokuapp.com/picpurify_video?URL="+this.state.URL;
   
   var gore=false
   var porn=false
   var drug=false

   await axios.get(URL2)
   .then(function (response) {
     console.log(response.data)

     for(var i=0;i<response.data.images_results.length;i++){
       console.log(response.data.images_results[i])
     }
  
   })



     await this.setState({resul:true});
   
     await this.setState({showModal:false});
      console.log(this.state.score)
      
  
  
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
      var ans=this.state.URL_PIC;
      ans.push(URL1);
  
      await this.setState({ URL_PIC: ans }); 
  
      // /////
      // var URL2="https://cors-anywhere.herokuapp.com/"+"https://techclan-twitter.herokuapp.com/picpurify_video?URL="+this.state.URL;
   
      // var gore=false
      // var porn=false
      // var drug=false
   
      // await axios.get(URL2)
      // .then(function (response) {
      //   console.log(response.data)
     
      // })
   
     await this.setState({resul:true});
  
     await this.setState({showModal:false});
  

  
    }; 
  
  
  
  


    render () {
      return (
        <div>
         <Jumbotron className="bg">
            <Container>
              <h2 className="txt">IMAGE METER</h2>
            </Container>
          </Jumbotron>
     
        <Container>
     
  Choose from files<div>After uploading click on check score</div>
  <hr></hr>
  
           <input type="file" onChange={this.onFileChange} /> 
                  <Button onClick={this.onFileUpload}> 
                    Upload! 
                  </Button> 

                  <input type="file" onChange={this.onFileChange} /> 
                  <Button onClick={this.onFileUpload}> 
                    Upload! 
                  </Button> 

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
                <Col xs={6}><h2>score</h2></Col>
  
  
                   
                {this.state.score}
  
                </Row>
  
  
  
  
              </div>:null}
  
                  <Modal showModal={this.state.showModal} />
        </div>
      );
    }
  }
 export default Video;