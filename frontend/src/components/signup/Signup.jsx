import React, { useState } from 'react'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import validdation from './Signupvalidation';
const Signup = () => {
    const [errors,setErrors]=useState({})
    const [values,setValues]= useState({
      name:'',
      email:'',
      password:''
    });
  const handeinput=(e)=>{
   setValues(prev=>({...prev,[e.target.name]:[e.target.value]}))
  }
  const handlesubmit=(e)=>{
    e.preventDefault();
    setErrors(validdation(values));
    if(errors.name==="" && errors.email==="" && errors.password===""){
        axios.post(`http://localhost:8081/signup`,values)
        .then(res=>{
          if(res.data.Status==="Success"){
        // location.reload(true)
            navigate('/')
          }
          else{
            alert("Error")
          }
        })
        .catch(err=>console.log("Error is ",err))
    }
  }
    const navigate = useNavigate();
    const handleLoginClick = () => {
      navigate('/');
    };
  return (
    <>
    <div className='loginmaincontainer'>
    <div className='logincontainer'>
      <form action="" onSubmit={handlesubmit}>
        <h1>Sign-up</h1>
        <div className='loginemail'>
            <label htmlFor="name">Name</label>
            <input type="name" name="name" id="name" onChange={handeinput}/>
            <span>{errors.name && <span>{errors.name}</span> }</span>
        </div>
        <div className='loginemail'>
            <label htmlFor="Email">Email</label>
            <input type="email" name="email" id="Email" onChange={handeinput}/>
            <span>{errors.email && <span>{errors.email}</span> }</span>
        </div>
        <div className='loginemail'>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={handeinput}/>
            <span>{errors.password && <span>{errors.password}</span> }</span>
        </div>
        <p>You are agree to your conditions</p>
        <button className='signupbutton' type='submit'>Sign up</button>
         <button className='loginbutton' onClick={handleLoginClick}>Login</button>
      </form>
    </div>
    </div>
    </>
  )
}

export default Signup
