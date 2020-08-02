import React from 'react';
import axios from 'axios';
import { Button,FormControl,Form,Container,InputGroup,Card,Jumbotron} from 'react-bootstrap';
import './App.css';
import SearchBox from "./components/search_box";
import Navbar from "./components/Navbar";
import Loading from "./components/loading/loading"
import DynamicType from "./components/DynamicType";
import Cards from "./components/cards/cards";
import Result from "./components/result"
import Modal from "./components/model";
import Source from "./components/sources"
import BackgroundSlideshow from 'react-background-slideshow'
import Ftr from "./components/footer/Footer"
import image1 from './false.jpg'
import image2 from './bg.jpg'



class App extends React.Component {
  
  constructor () {
    super();
    this.state = {
      showModal: false,
      URL:"",
      clicked:false,
      data:[{score:"",Title:""}],
      tr:0,
      fl:0,
      d:0,
      Title:[{}],
      Links:[]
    
    };
  
    this.updateURL = this.updateURL.bind(this);
    this.onsubmit =this.onsubmit.bind(this);
   
   
  }


  async onsubmit (){ 
//"https://app-test1232.herokuapp.com/"
    this.setState({ clicked: false});
      var trr=0,flr=0,dr=0;
      var Ti=[];
      var Li=[];
     

      var URL1=this.state.URL.replace(/\s/g, '+')
      var URL2="https://cors-anywhere.herokuapp.com/"+"https://techclans-api.herokuapp.com/api/text?id="+URL1;
      console.log(URL1)
      this.setState({ showModal: true });
     await axios.get(URL2)
    .then(function (response) {
      // handle success
     
      for(var i=0;i<response.data.length;i++)
      {
  
        if(response.data[i].Score==='agree')
        trr++;
        else if(response.data[i].Score==='discuss')
          dr++;
          else if(response.data[i].Score==='disagree')
          flr++;
          else
          { console.log(response.data[i].Score);
  
          }     
         // Ti.push(response.data[i].Title)
          //Li.push(response.data.url)
          if(i<10){ 
          Ti.push({
             title:response.data[i].title,
             link:response.data[i].link,
             summary:response.data[i].summary,
             score:response.data[i].Score
          })
        }
      }
  
  
      
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
   
    });
    console.log(trr);
      console.log(flr);
      console.log(dr);
    await this.setState({ tr: trr });
    await this.setState({ fl: flr });
    await this.setState({ d: dr });
    await this.setState({ URL:"" });
    await this.setState({ Title:Ti });
    //await this.setState({ Links:Li });
   
   
    await this.setState({ showModal: false });
    await this.setState({ clicked: true });
    };
  
     updateURL=(newValue)=>{
  
          const URL=this.state.URL;
          this.setState({
              
            URL:newValue.target.value
          })
          console.log(URL);
          
        };
        
  
  
  render () {
  return (
    <div >
          
   
    <Jumbotron  className="bg" >
    <Container>
    
    
{/* <img src={require('./LOG.png')} className='pic' />  */}
     
    <SearchBox 
     
     showModal ={this.state.showModal}
     URL={this.state.URL}
     clicked={this.state.clicked}
     data={this.state.data}
     tr={this.state.tr}
     fl={this.state.fl}
     d={this.state.d}
     Title={this.state.Title}
     Links={this.state.Links}
     updateURL={this.updateURL}
     onsubmit={this.onsubmit}
    
   
    />
     <h2 className="txt"> <DynamicType /> </h2>

     </Container>
    </Jumbotron>
    
    
    <div>{this.state.clicked?null:<Cards />}
    </div>
 

     {this.state.clicked?<Result 
    tr={this.state.tr}
    fl={this.state.fl}
    d={this.state.d}
    
    />:null} 
   

    {this.state.clicked?
 
    <Source 
    
    title={this.state.Title}
    
    
    />
 
  :null} 





















  
    
    {/* <div className="footer">
      This website is made by Team Techclans of IIITG ,for contacting us or any suggestions  please email us at gargeesih@gmail.com.
      <div>All the details are provided in the sources,please check</div>
    </div> */}
   
    </div>


  );
}
}
export default App;
