import React, { useState } from 'react';
import './creditreport.css';

import { useNavigate } from 'react-router-dom'; 

const CreditReport = () => {
  // const [showUpdatedHeader, setShowUpdatedHeader] = useState(false);
  
  const [currentSection, setCurrentSection] = useState(1);
  const [panNumber, setPanNumber] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    if ( !validatePanCard(panNumber) && currentSection==1) {
      // setCurrentSection(currentSection + 1);
      setError("Invalid PAN Card number");
      // setError("");
      
      
    }    
    
      // else if(currentSection == 3)
      // navigate('/cpage') //Navigate back to the home page
      // setCurrentSection(currentSection - 1)
    
    
    else{
        setPanNumber("")
       setCurrentSection(currentSection + 1);}
  }

  const validatePanCard = (panNumber) => {
    const panregulexp = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    return panregulexp.test(panNumber);
  };
  const handlePanInputChange = (event) => {
    setPanNumber(event.target.value);
  };
  const handleCrossButtonClick = () => {
    // setShowUpdatedHeader(false);
    if(currentSection == 1)
    navigate('/cpage') //Navigate back to the home page
    setCurrentSection(currentSection - 1);
  };

  return (
    <>
          {currentSection === 1 && (
      <div className="maincreditreportcontainer">
          <div className='creditreportcontainer'>
          <div className='crossbutton'>
            <button onClick={handleCrossButtonClick}>X</button>
          </div>
          
        <div className="innercreditreportcontainer">
          <div className="leftcreditreport">
            <img src="/src/images/circle.svg" alt="a" />
          </div>


          <div className="rightcreditreport">
            <div>
                <h2>Check your Credit report <span>for free</span></h2>
            
            </div>
            <div>
                <p>Secure your home loan</p>
            </div>
            <div>
              <input type="text" placeholder='Enter PAN Number' value={panNumber} onChange={handlePanInputChange}/></div>
            <div><button onClick={handleNextButtonClick}>Next-</button></div>
              {error && <p className="error-message">{error}</p>}
          </div>
          </div>
        </div>
      </div>
 )}


{currentSection === 2 && (
  <div className="maincreditreportcontainer">
  <div className='creditreportcontainer'>
  <div className='crossbutton'>
    <button onClick={handleCrossButtonClick}>X</button>
  </div>
  
<div className="innercreditreportcontainer">
  <div className="leftcreditreport">
    <img src="/src/images/circle.svg" alt="a" />
  </div>
          <div className="rightcreditreport">
            <div>
             
                <h2>Verification</h2>
            </div>
            <div>
                <p>The Customer will recieve a Verification code on their PAN-linked mobile number</p>
             
            </div>
            <div>
              <input type="text" placeholder='Enter mobile Number' /></div>
            <div><button onClick={handleNextButtonClick}>Next-</button></div>
              {/* {error && <p className="error-message">{error}</p>} */}
          </div>
          </div>
        </div>
      </div>
      )}
{currentSection === 3 && (
  <div className="maincreditreportcontainer">
  <div className='creditreportcontainer'>
  <div className='crossbutton'>
    <button onClick={handleCrossButtonClick}>X</button>
  </div>
  
<div className="innercreditreportcontainer">
  <div className="leftcreditreport">
    <img className='mobileimg' src="/src/images/Group.svg" alt="a" />
  </div>
          <div className="rightcreditreport">
            <div>
             
                <h2>Verification</h2>
            </div>
            <div>
                <p>otp has been sent to your mobile</p>
             
            </div>
            <div>
              <input type="text" placeholder='Enter OTP' /></div>
            <div><button onClick={handleNextButtonClick}>Next-</button></div>
              {/* {error && <p className="error-message">{error}</p>} */}
          </div>
          </div>
        </div>
      </div>
      )}
       
    </>
  );
};

export default CreditReport;


















// import React, { useState } from 'react';
// import './creditreport.css';

// const CreditReport = () => {
//   const [step, setStep] = useState(0); // Initial step

//   const steps = [
//     {
//       header: 'Check your credit report <span>for free</span>',
//       paragraph: 'Secure your home loan',
//     },
//     {
//       header: 'Verification',
//       paragraph: 'The Customer will receive a Verification code on their PAN-linked mobile number',
//     },
//     {
//       header: '',
//       paragraph: 'OTP has been sent to your  mobile number',
//     },
//     // Add more steps as needed
//   ];

//   const handleNextButtonClick = () => {
//     setStep(step + 1); // Move to the next step
//   };

//   const handleCrossButtonClick = () => {
//     setStep(step-1); // Reset to the initial step
//   };

//   return (
//     <>
//       <div className="maincreditreportcontainer">
//         <div className='creditreportcontainer'>
//           <div className='crossbutton'>
//             <button onClick={handleCrossButtonClick}>X</button>
//           </div>
          
//           <div className="innercreditreportcontainer">
//             <div className="leftcreditreport">
//               <img src="/src/images/circle.svg" alt="a" />
//             </div>
//             <div className="rightcreditreport">
//               <div>
//                 <h2 dangerouslySetInnerHTML={{ __html: steps[step].header }}></h2>
//               </div>
//               <div>
//                 <p>{steps[step].paragraph}</p>
//               </div>
//               <div><input type="text" placeholder='Enter PAN Number'/></div>
//               <div><button onClick={handleNextButtonClick}>Next-</button></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreditReport;
