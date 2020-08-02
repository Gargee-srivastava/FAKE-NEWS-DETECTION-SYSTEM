import React from 'react';


import axios from 'axios';
import { Button,FormControl,Form,Container,InputGroup,Jumbotron,Row,Col} from 'react-bootstrap';
import Modal from './components/model'



class Image extends React.Component {

  constructor(){

    super();
    
    this.state = { 
    
      // Initially, no file is selected 
      selectedFile: null,
      URL:"",
      showModal:false,
      resul:false,
      score:"",
      links:[{}]
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
     
      var URL2="https://cors-anywhere.herokuapp.com/"+"http://18.205.87.224/api/text?id="+this.state.URL;
      var sc="";
      await axios.get(URL2)
      .then(function (response) {

        sc=response.data;

      })



      URL2="https://cors-anywhere.herokuapp.com/"+"https://techclan-twitter.herokuapp.com/reverse_image?URL="+this.state.URL;
      var lnk=[]
      await axios.get(URL2)
      .then(function (response) {

       

        for(var i=0;i<response.data.length;i++){
      
          lnk.push({title:response.data[i]})
        }

      })

      await this.setState({links:lnk});

     await this.setState({resul:true});
      await this.setState({score:sc});
     await this.setState({showModal:false});
      console.log(this.state.links)
      
  
  
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
      var URL2="https://cors-anywhere.herokuapp.com/"+"http://18.205.87.224/api/text?id="+this.state.URL;
      var sc="";
      await axios.get(URL2)
      .then(function (response) {
  
       
  
        sc=response.data;
  
        console.log(response.data)
    
      })

      URL2="https://cors-anywhere.herokuapp.com/"+"https://techclan-twitter.herokuapp.com/reverse_image?URL="+this.state.URL;
      var lnk=[]
      await axios.get(URL2)
      .then(function (response) {

      

        for(var i=0;i<response.data.length;i++){
     
          lnk.push({title:response.data[i]})
        }

      })

      await this.setState({links:lnk});



     await this.setState({resul:true});
      await this.setState({score:sc});
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

                  <Container>
              {this.state.resul==true?<div>
  
                <Row>
                <Col xs={8}>
                <img src={this.state.URL} width='80%' />
                </Col>
                <Col>
                
                <h2>score</h2>
                   
                {this.state.score}

                </Col>
                </Row>

              </div>:null}
              <br></br>
             
              
              {this.state.resul==true?<h3>HERE ARE THE LINKS WHICH ARE REALATED TO IMAGES</h3>:null}

              {this.state.resul==true?
               
              this.state.links.map(function(name, index){
                    return(  
                      <div>
   
                        <Button size = 'bg' variant="info" ><h3>{name.title}</h3></Button>
                    
                        <br></br>
                      </div>
   
                     )
                  })
                    :null}
                    </Container>
  
                  <Modal showModal={this.state.showModal} />
        </div>
      );
    }
  }
 export default Image;