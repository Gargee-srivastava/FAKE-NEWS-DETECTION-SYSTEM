import axios from 'axios';
import React, { Component } from 'react';
import { Button,FormControl,Form,Container,InputGroup,Dropdown,Alert } from 'react-bootstrap';

import Result from "./result"
import Modal from "./model";
import Source from "./sources"
import Alr from './alert1';
import Cards from "./cards/cards";

class SearchBox extends Component {

  constructor () {
    super();
    // this.props = {
    //   showModal: false,
    //   URL:"",
    //   clicked:false,
    //   data:[{score:"",Title:""}],
    //   tr:0,
    //   fl:0,
    //   d:0,
    //   Title:[{}],
    //   Links:[]
    
    // };
  
    // this.updateURL = this.updateURL.bind(this);
    // this.onsubmit =this.onsubmit.bind(this);
   
   
  }

//https://cors-anywhere.herokuapp.com/http://3.6.143.166:5000/api/text?id=india+cases+1000'




 
     

  render() {
    return (
      
      
      <div className="centr">
        {this.props.clicked===true&&this.props.tr==0&&this.props.fl==0&&this.props.d==0?<Alr />:null
      }
     <InputGroup className="lg" size="lg">
    <FormControl
      placeholder="Fact checker"
      aria-label="Fact checker"
      aria-describedby="basic-addon2"
      value={this.props.URL}
       
		    onChange={this.props.updateURL}
    /> <InputGroup.Append>
    
  
  </InputGroup.Append>
  <InputGroup.Append>
  {this.props.showModal==false?<Button onClick={this.props.onsubmit} variant="success" size="lg"><i class="fas fa-search"></i>Search</Button>:null}
  {/* <Button onClick={this.onsubmit} variant="warning" size="lg"><i class="fas fa-search"></i>Search</Button> */}
  </InputGroup.Append>
  
 
 
</InputGroup>



<Modal   
  showModal={this.props.showModal}
/>

      </div>
    );
  }
}

export default SearchBox;