import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import validdation from './Loginvalidation' 
import axios from 'axios'
import './login.css';

const Login = () => {
  const [errors,setErrors]=useState({})
  const [values,setValues]= useState({
    email:'',
    password:'' 
  });
const navigate = useNavigate();
axios.defaults.withCredentials=true

const handeinput=(e)=>{
 setValues(prev=>({...prev,[e.target.name]:[e.target.value]}))
}
const handlesubmit=(e)=>{
  e.preventDefault();
  
  setErrors(validdation(values));
    axios.post(`http://localhost:8081/login`,values)
    .then(res=>{
      if(res.data.Status==="Success"){
        // location.reload(true)
        navigate("/Home")
      }
      else{
        alert(res.data.Error);
      }
    })
}
  return (
    <>
    <div className='loginmaincontainer'>
    <div className='logincontainer'>
      <form action="" onSubmit={handlesubmit}>
        <h1>Sign-in</h1>
        <div className='loginemail'>
            <label htmlFor="Email">Email</label>
            <input type="email" name="email" id="Email"  onChange={handeinput} />
            <span>{errors.email && <span>{errors.email}</span> }</span>
        </div>
        <div className='loginemail'>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"  onChange={handeinput} />
            <span>{errors.password && <span>{errors.password}</span> }</span>
        </div>
        <button className='loginbutton' type='submit'>Log in</button>
       <Link to="signup"><button className='signupbutton'>Create Account</button></Link> 
      </form>
    </div>
    </div>
    </>
  )
}
export default Login
