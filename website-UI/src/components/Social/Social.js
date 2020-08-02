import React from 'react';
import axios from 'axios';
import { Button,FormControl,Form,Container,InputGroup,Jumbotron,Row,Col} from 'react-bootstrap';
import Twitter_sources from './Twitter_sources'
import { PieChart } from 'react-minimal-pie-chart';
class Social extends React.Component {

  constructor () {
    super();
    this.state = {
      showModal: false,
      data:[],
      texts:[],
      URL:'',
      resul:false,
      tags:[],
      hum:0,
      tro:0,
      off:0

    };


    this.updateURL = this.updateURL.bind(this);
    this.onsubmit =this.onsubmit.bind(this);

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
   
    var URL2="https://cors-anywhere.herokuapp.com/"+"https://techclan-twitter.herokuapp.com/twitter?text="+this.state.URL;
    var Ti=[]
    await axios.get(URL2)
    .then(function (response) {

      
      for(var i=0;i<response.data.length;i++){
        if(response.data[i]!="NOPE"&&response.data[i]!="nope"){ 
        Ti.push({title:response.data[i],
          humour:"not humour",
          troll:"not troll",
          offensive:"not offensive"
        })
      }
    }
      console.log(response.data)

    })


    await this.setState({texts:Ti});
    var tg=[];
    var hh=5
    var tt=5
    var oo =5
    for(var i=0;i<5;i++){

      var h="not humour"
       var t="not troll"
      var o="not offensive"

      if(this.state.texts[i]!="NOPE"&&this.state.texts[i]!="nope"){ 

      var URL3="https://cors-anywhere.herokuapp.com/"+"https://techclan-twitter.herokuapp.com/fakeapi?id="+this.state.texts[i];
      var g=this.state.texts[i].title
    await axios.get(URL3)
    .then(function (response) {

      if(response.data[0]!="Not humour"){
        h="Humour";
        hh--;
      }
      if(response.data[1]!="Not troll"){
        t="Troll";
        tt--;
      }
      if(response.data[2]!="Not offensive"){
        o="Offensive";
        oo--
      }
   
      tg.push({
        title:g,
        humour:h,
        troll:t,
        offensive:o
      })
     
     
    })
  }

    }
    console.log(tg)

   await this.setState({resul:true});
   await this.setState({tags:tg});
   await this.setState({hum:hh});
   await this.setState({tro:tt});
   await this.setState({off:oo});
  
   await this.setState({showModal:false});
    console.log(this.state.links)
    


  }






 async componentDidMount (){
    // var dt=[];
    // var URL2="https://cors-anywhere.herokuapp.com/"+"https://techclan-twitter.herokuapp.com/twitter";
    // await axios.get(URL2)
    // .then(function (response) {
      
    //   console.log(response.data)

    //   for(var i=0;i<response.data.length;i++)
    //   {
    //       dt.push(response.data[i])
    //   }

    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
    // .finally(function () {
    //   // always executed
   
    // });

    // await this.setState({ data:dt });
    // await this.setState({ showModal:true });



  }




  
  render () {
    const defaultLabelStyle = {
      fontSize: '5px',
      fontFamily: 'sans-serif',
      color:'#FFFFFF',
      padding: '5px'
    };
    return (
      <div>
      <Jumbotron className="bg">
          <Container>
            <h2 className="txt">Social CHECKER</h2>
          </Container>
        </Jumbotron>
       

         <Row >
          <h2>Hashtags that our database stored</h2>

        <Col xs={9} >
         {this.state.showModal==true?  <div
          style={{height:'100px',position:'relative'}}
         ><Twitter_sources title={this.state.data}  /></div>:null}


<InputGroup className="lg" size="lg">
      <FormControl
        placeholder="Image URL"
        aria-label="Fact checker"
        aria-describedby="basic-addon2"
        value={this.state.URL}
         
          onChange={this.updateURL}
      /> 
    <InputGroup.Append>
    <Button onClick={this.onsubmit} variant="success" size="lg"><i class="fas fa-search"></i>Hashtag</Button>
  
    </InputGroup.Append>

  </InputGroup>

  {this.state.resul==true?
               
               this.state.tags.map(function(name, index){
                     return(
                       <div>
                         <br></br>
                         <Col xs={9} key={ index }>{name.title}<Button>{name.humour}</Button><Button>{name.troll}</Button><Button>{name.offensive}</Button></Col >
                     
                         <br></br>
                        
                       </div>
                      )
                   })
                     :null}






  </Col>


        <Col>
       
<Row>
        <div style={{left:'15px'}}><b >Offensive PieChart</b></div>
        <div className="pie"><PieChart
  data={[
    { title: 'Fake'  ,value: 5, color: '#E38627' },
    { title: 'Real', value:5, color: '#C13C37' },
    { title: 'Maybe', value: 5, color: '#6A2135' },
  ]}
  animate={true}
  reveal={98}
  lineWidth={80}
  startAngle={60}
  labelStyle={defaultLabelStyle}
  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}

/>
</div>

</Row>
</Col>
</Row> 
 <Row>







</Row>




        </div>
      
    );
  }
}
 export default Social;