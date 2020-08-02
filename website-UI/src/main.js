import React from 'react';
import App from './App'
import Image from './image'
import Video from "./video"
import Offensive from './offensive'
import Navbar from './components/Navbar'
import Abut from "./components/AboutUS/About"
import Social from "./components/Social/Social"
import axios from 'axios'

import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';


class Main extends React.Component {

  constructor () {
    super();
    this.state = {
     count:0
    
    };

  }


 async componentDidMount (){
  var c1=0,c2=0;
  // var URL2="https://cors-anywhere.herokuapp.com/"+"https://techclan-twitter.herokuapp.com/beforeupdate";
  // await axios.get(URL2)
  // .then(function (response) {
    
  
  //   c1=response.data.before_row
  //   c2=response.data.current_row

  //   console.log(c1)

   


  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .finally(function () {
  //   // always executed
 
  // });

  await this.setState({ count:c2-c1});




}




render(){ 

    return (

        <Router>
          <div>
            
            <Navbar count = {this.state.count} />
                    <Switch>
                    <Route exact path= {'/'} component={App} />
                    <Route exact path= '/image' component ={Image} />
                    <Route exact path= '/contributors' component ={Abut} />
                    <Route exact path='/video' component ={Video} />
                    <Route exact path='/offensive' component ={Offensive} />
                    <Route exact path='/social' component ={Social} />
                
                     </Switch>
                     </div>
                    
                     </Router>
    );
}
  };



export default Main;