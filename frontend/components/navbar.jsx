import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import axios from 'axios'
const Navbar = () => {
  const [auth,setAuth]=useState(false)
  const [message,setMessage]=useState('')
  const [name,setName]=useState('')
  // const navigate = useNavigate();
axios.defaults.withCredentials=true


useEffect(()=>{
  axios.get(`http://localhost:8081`)
  .then(res=>{
    if(res.data.Status==="Success"){
      //  console.log("Entry point")
      //  console.log(auth)
       setAuth(true);
       setName(res.data.name)
    }
    else{
      setAuth(false)
      setMessage(res.data.Error)
    }
  })

}, [])

const handledelete =()=>{
  axios.get(`http://localhost:8081/logout`)
  .then(res=>{
    location.reload(true)
    console.log(res)
  }).catch(err=>(console.log(err)))
}
  return (    

<header className="header">
   {
      auth ?
     <nav> 
       <div className="right">
        <ul>
       <li><Link to={"home"}><img width={'140px'} src="https://storage.googleapis.com/ambak/logo/ambak_logo.svg"  alt="" /></Link></li>
          <li><Link className='active'  to="home">Home</Link></li>
          <li><Link className='active'  to="cpage">Campain page</Link></li>
          <li><Link className='active'  to="Calculators">Partners</Link></li>
          <li><Link className='active'  to="fetchdata">API Data</Link></li> 
          <li><Link className='active'  to="blog">Blog</Link></li>
          <li><Link className='active'  id='becomppartner' to="becomepartner">Become a Partner</Link></li>
          <li>
            <Link to="/"><button  onClick={handledelete} className='logout'>Log out </button></Link> 
            {name}
          </li>
        </ul>

        <input type="checkbox" id="menu-toggle"/>
  <label htmlFor="menu-toggle" className="menu-btn">
    <span></span>
    <span></span>
    <span></span>
  </label>
      </div>
    </nav>
    :
    ""
    
      }
  </header>
  )
}
export default Navbar
