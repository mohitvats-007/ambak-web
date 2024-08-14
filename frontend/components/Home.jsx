import React from 'react'
import './home.css'
// import Popup from '../src/components/popup/Popup.jsx';
// import { Link } from 'react-router-dom'
// import HomeSvg from './homesvg.js'; // Adjust the path as needed
import HomeSvg from './homesvg.jsx';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <>
    <div className='homecontainer'>
      <div className='navigationbars menu'>        
        <ul>
      <li>

      <input type="checkbox" id="menu-toggle" />
  <label  htmlFor="menu-toggle"  className="menu-btn"/>
         
      </li>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
        
        </ul>
      </div>

      <div className="leftcontainer">
        <p>#AapkiAamdaniAapkaHaq</p>
      <h1>Elevate Your Earnings,<br/>Empower Your Business</h1>
    <p1>Impress your customers with the best home loan <br/> offers, while we do the rest to help them own their<br/> dream home.</p1>
    <li> <Link to="/becomepartner">  <button className='Partnerbutton'>Become a partner</button></Link></li>
      </div>
      <div className="rightcontainer">
      <img width={'506px'}src="https://ambak.com/_next/image?url=%2Fimage%2Fhomepagemainimg.png&w=1080&q=75"alt=""/>
      </div>
    </div>
 <div>

 </div>
      <div className='sliderheading'>Our Partner Banks and NBFCs</div>
      <div className='warpper'>
        <ul className='carousel'>
          <li className='cardd'>
          
            <div className='imgs'><HomeSvg/>ICICI Bank</div>
          </li>
          <li className='cardd'>
            <div className='imgs'><HomeSvg/> Bajaj Housing</div>
          </li>
          <li className='cardd'>
            <div className='imgs'><HomeSvg/> PNB Housing</div>
          </li>
          <li className='cardd'>
            <div className='imgs'><HomeSvg/> Tata capital</div>
          </li>
          <li className='cardd'>
            <div className='imgs'> <HomeSvg/>Tata capital</div>
          </li>
        </ul>
      </div>
    </>
    
  )
} 

export default Home
