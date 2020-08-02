import React, { Component } from 'react'
import { Container} from 'react-bootstrap';
import './cards.css';
import NotificationBadge from 'react-notification-badge';
import Notifications from '../Notifications';
class Card extends React.Component {
  render () {
    return (
   
        <Container>

       <div className="page-content">
      

  <div className="card">
  
    <div className="content">
      <h2 className="title">Image Checker</h2>
      <p className="copy">Check the images sources,and clarify about it origins and also the are morphed or not</p>
      <a  href="/image" className="btn">Upload Image</a>
    </div>

  </div>
 
  <div className="card">
    <div className="content">
      <h2 className="title">Video Checker</h2>
      <p className="copy">Check the images sources,and clarify about it origins and also the are morphed or not</p>
      <a  href="/video" className="btn">Upload Video</a>
    </div>
  </div>
   <div className="card">
    <div className="content">
      <h2 className="title">Offensive Meter</h2>
      <p className="copy">Check the offensive meter,and clarify about it origins and also the are morphed or not</p>
      <a  href="/offensive" className="btn">Upload text/URL</a>
    </div>
  </div>

  <div className="card">
  
    <div className="content">
      
      <h2 className="title">Social Meter</h2>
      <p className="copy">Check the offensive meter,and clarify about it origins and also the are morphed or not</p>
      <a  href="/social" className="btn">Upload text/URL</a>
    </div>

  </div>
            </div>

          </Container>
         
    )
  }
}
export default Card;