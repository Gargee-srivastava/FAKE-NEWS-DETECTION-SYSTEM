import React, { Component } from 'react'
import Typical from 'react-typical'
const steps = [
    'Hello 👋', 1000,
    'I am fact-checker', 1000,
    'I can check the texts', 1000,
    'I can check the images', 1000,
    'I can check the videos', 1000,
    'I can find the sources', 1000,
    'For suggestions', 1000,
    'For suggestions please contact us', 1000

    // 'I can loop', 1000,
    // 'I can wait', 3000,
    // 'I can vary typing speed', 2000,
    // 'Install me now', 1000,
    // 'npm install --save react-typical'
  ];
class DynamicType extends React.Component {
  render () {
    return (

       <div>
            <Typical wrapper="span" steps={steps} loop={Infinity}  />
       </div>
    )
  }
}
export default DynamicType;