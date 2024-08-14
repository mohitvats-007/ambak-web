import React from 'react'

import { Link } from 'react-router-dom'
import "./newhomepage.css";
import { useState } from 'react';

const Newhomepage = () => {
    const [mobilenumber,setmobilenumber]= useState('');
    const [error, setError] = useState("");

    const  handleofferButtonClick = async (event) => {
        if (validatemobilenumber(mobilenumber)) {
            try {
                const response = await fetch('http://localhost:8081/org', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json' 
                    },
                    body: JSON.stringify({mobilenumber})
                });
                
                if (response.ok) {
                    alert('Registration successful!');
                } else {
                    throw new Error('Failed to register.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }

        } else {
          event.preventDefault();
          setError("Please enter valid mobile number.");
        }
      };
      const handlemobilInputChange = (event) => {
        setmobilenumber(event.target.value);
      };
      const validatemobilenumber = (mobilenumber) => {
        const mobilregulexp = /^(?!.*(.)\1{9})\d{10}$/
        return mobilregulexp.test(mobilenumber);
      };
  return (
    <div>  
    <div className='bannercontainer'>
        <div className="leftbannercontainer">
            <div className='bannerheading'>
                <h1>Home Loan Offers Starting @8.4% p.a</h1>
                </div>
            <div className='bannerpara'>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel tenetur voluptate,niti unde non. Rerum, inventore ex. Facere!
                </p>
                </div>
            <div className='mobilebuttoncontainer'>
                <div className='bannermobileinput'>
                    <input type="number" placeholder='Enter Mobile Number' value={mobilenumber} onChange={handlemobilInputChange} />
                   {error && <p className="error-message">{error}</p>}
                </div>
                <div className='bannergetofferbutton'>
                   <Link className='active'  to="getoffers"> <button onClick={handleofferButtonClick} >Get Offers <img src="/src/images/right.svg" alt="" /></button></Link>
                </div>
            </div>
        </div>
        <div className="rightbannercontainer">
            <div className='bannerimage'>
                <img src="/src/images/mainbanner.svg" alt="banner image" />
            </div>
        </div>
    </div>


    <div className='sectionreport'>
        <div className='container'>
            <div className='creditreport'>
                <div className='freereport'>
                    <h1>Get Your Free Credit Report</h1>
                    <p>
                    Check your score and get your full credit report in seconds. 100% secure!
                    </p>
                    <div className='star'>
                        <div className='inline'>
                            <img src='/src/images/Vector (1).svg' alt='star'></img>
                            <p>Get detailed insights</p>
                            <img src='/src/images/Vector (1).svg' alt='star'></img>
                            <p>Check overdues</p>
                        </div>
                        <div className='inline'> <img src='/src/images/Vector (1).svg' alt='star'></img>
                            <p>View active loans</p>
                            <img src='/src/images/Vector (1).svg' alt='star'></img>
                            <p>Access Better Deals</p>
                        </div>
                        <div className='creditscore'>
                        <Link  to="popup"><button className='creditscorebtn' style={{marginLeft:'0px'}}> <a href='#'>Check Credit Score</a></button></Link>
                        </div>
                    </div>  
                </div>
                <div className='scoreimg'>
                    <img src="/src/images/circle.svg"></img>
                </div>
            </div>
        </div>
    </div>


    <div className="containerx">
        <div className="advantage">
                <div className="advantageheading">
                    <h1>Advantage of Ambak</h1>
                </div>
                <div className="advantagepara">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
        </div>
        <div className="innercontainer">
            <div className="b1" style={{backgroundColor: "rgba(232, 238, 237, 1)"}}>
                <div className="b1data"> 
                        <div className="svglogo">

                            <img src="/src/images/Group 1321318490.svg" alt=""/>
                        </div>
                        <div className="headingindiv">

                            <h2>Dedicated Relationship Manager</h2>
                        </div>
                        <div className="paraindiv">
                            <p>Ypur Dedicated relationship manager Avilable 24/7 for you </p>
                        </div>
                </div>
            </div>
            <div className="b1" style={{backgroundColor: "rgba(232, 255, 244, 1)"}}>
                <div className="b1data" >
                        <div className="svglogo">

                            <img src="/src/images/Group 1321318490 (3).svg" alt=""/>
                        </div>
                        <div className="headingindiv">

                            <h2>Dedicated Relationship Manager</h2>
                        </div>
                        <div className="paraindiv">

                            <p>Ypur Dedicated relationship manager Avilable 24/7 for you </p>
                        </div>
                </div>
            </div>
            
            
            <div className="b1" style={{backgroundColor: "rgba(232, 248, 231, 1)"}}>
                <div className="b1data">
                        <div className="svglogo">

                            <img src="/src/images/Group 1321318490 (2).svg" alt=""/>
                        </div>
                        <div className="headingindiv">

                            <h2>Low interest Rate Guarantee</h2>
                        </div>
                        <div className="paraindiv">

                            <p>Your Dedicated relationship manager Avilable 24/7 for you </p>
                        </div>
                </div>
            </div>
            
            
            <div className="b1" style={{backgroundColor: "rgba(233, 242, 255, 1)"}}>
                <div className="b1data">
                        <div className="svglogo">
                            <img src="/src/images/Group 1321318490 (1).svg" alt=""/>
                        </div>
                        <div className="headingindiv">
                            <h2>Loan Disbursal within 20 Days</h2>
                        </div>
                        <div className="paraindiv">
                            <p>Ypur Dedicated relationship manager Avilable 24/7 for you </p>
                        </div>
                </div>
            </div>
            
            
            
        </div>
    </div>
  

    </div>
  )
}

export default Newhomepage
