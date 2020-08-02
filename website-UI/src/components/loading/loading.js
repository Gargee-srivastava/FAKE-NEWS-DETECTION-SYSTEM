import React from 'react';
import ReactLoading from 'react-loading';
import { Section ,list} from "./generic";

const Loading = () => (
  <div>
    <Section className="modal">
      {list.map(l => (
       
          <ReactLoading type={l.prop} color="#000000" />
         
     
      ))}
      
     <span><b>Please Wait!</b></span>
    </Section>
    
    </div>
  );
  
export default Loading;