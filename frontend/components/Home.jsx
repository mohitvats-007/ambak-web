import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='homecontainer'>
      <div className="leftcontainer">
        <p>#AapkiAamdaniAapkaHaq</p>
      <h1>Elevate Your<br/>Earnings,Empower<br/>Your Business</h1>
    <p1>Impress your customers with the best home loan <br/> offers, while we do the rest to help them own their<br/> dream home.</p1>
    <li><Link to="/contact"><button className='Partnerbutton'>Become a Partner</button></Link></li>
      </div>
      <div className="rightcontainer">
      <img width={'506px'}src="https://ambak.com/_next/image?url=%2Fimage%2Fhomepagemainimg.png&w=1080&q=75"alt=""/>
      </div>
    </div>
  )
} 

export default Home
