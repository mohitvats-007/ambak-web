import React from "react";
import "./Checkoffer.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Checkoffer = () => {
  const [selOption, setSelOption] = useState("");
  const [currentSection, setCurrentSection] = useState(1);
  const [loanamount, setloanamount] = useState("");
  const [anualamount, setAnnualamount] = useState("");
  const [emiamount, setEmiamount] = useState("");
  const [emailid, setEmailid] = useState("");
  const [usrnam, setUsrnam] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    if (option === "anyEMIno") {
      // Assuming "No" corresponds to "Loan Against Property"
      setSelOption(option); 
      setCurrentSection(5); // Update current section to 5
    } else {
      setSelOption(option);
    }
  };

  const handleNextClick = () => {
    if (!selOption && currentSection==1) {
      setError("Please select either Home Loan or Loan Against Property.");
      return;
    }
    if (!selOption && currentSection==2) {
      setError("Please select either Salaried or Self-employed.");
      return;
    }
    if (!selOption && currentSection==3) {
      setError("Please select either yes or no.");
      return;
    }
    if (!selOption && currentSection==4) {
      setError("Please select either yes or no.");
      return;
    }
    if (!selOption && currentSection==5) {
      setError("Please select any one option.");
      return;
    }
    if (!selOption && currentSection==6) {
      setError("Please select any one option.");
      return;
    }
    // if (!selOption && currentSection==7) {
    //   setError("Please select any one option.");
    //   return;
    // }



    if (!loanamount && currentSection==1) {
      setError("Please enter the loan amount");
    } else if (parseInt(loanamount) < 50000) {
      setError("Loan amount must be at least 50000");
    }  
     else if (!anualamount && currentSection==2) {
      setError("Please enter the anual amount");
    } else if( (parseInt(anualamount )  < 1000) && currentSection==2){
      setError("Annual amount must be at least 1000");
    }else if (!emiamount && currentSection==4) {
      setError("Please enter the Emi amount");
    }else if (!usrnam && currentSection==7) {
      setError("Please enter the Name");
    }else if (!emailid && currentSection==7) {
      setError("Please enter the Email Id");
    }
     else {
      setError("");


      
      setSelOption(""); // Deselect the option
      // setloanamount("")
      setCurrentSection(currentSection + 1);
      console.log(currentSection)
      if (currentSection > 6) {
        navigate('/home'); // Navigate to another page when current section exceeds 7
        return;
      }
    }
  }
  // const validatedloanamount = (loanamount) => {
  //   const loanamountre = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  //   return loanamountre.test(loanamount);
  // };

  const handlearrowbuttonclick = () => {
    if(currentSection===1){
     navigate('../cpage')
    }
    setCurrentSection(currentSection - 1);
  };
  return (
    <>
      <div className="maincheckoffercontainer">
        <div className="checkoffercontainer">
          <div className="innercheckoffercontainer">
            <div className="leftcheckoffer">
              <img
                className="bigimage"
                src="../src/images/checkofferlady.svg"
                alt="a"
              />
              <img
                className="smallimage"
                src="../src/images/Group1.svg"
                alt=""
              />
            </div>
            <div className="mainrightcheckoffer">
              {currentSection === 1 && (
                <>
                  <div className="rightcheckoffer">
                    <div className="headincheckoffercontainer">
                      <div className="arrowbutton">
                        <button onClick={handlearrowbuttonclick}>
                          <img
                            className="bigimage"
                            src="../src/images/left.svg"
                            alt=""
                          />
                        </button>
                      </div>
                      <div className="headingckofr">
                        <h6>Loan details</h6>
                      </div>
                    </div>
                    <div className="selectoptioncontain">
                      <div className="leftselectbutton">
                        <button
                          className={
                            selOption === "Home Loan" ? "selected" : ""
                          }
                          onClick={() => handleOptionClick("Home Loan")}
                        >
                          Home Loan
                        </button>
                        <p className="annulincmm">Loan amount</p>
                      </div>
                      <div className="rightselectbutton">
                        <button
                          className={
                            selOption === "Loan Against Property"
                              ? "selected"
                              : ""
                          }
                          onClick={() =>
                            handleOptionClick("Loan Against Property")
                          }
                        >
                          Loan Aginst Property
                        </button>
                      </div>
                    </div>
                    <div className="inputcontainer">
                      <div className="inputdiv">
                        <input
                          type="number"
                          placeholder="Loan Amount"
                          value={loanamount}
                          onChange={(e) => setloanamount(e.target.value)}
                        />

                        {error && <p className="error-message">{error}</p>}
                      </div>
                   
                    </div>
                    <div className="nextbuttoncontain">
                      <button onClick={handleNextClick}>
                        Next <img src="../src/images/right.svg" alt="" />
                      </button>
                    </div>
                  </div>
                </>
              )}

             {currentSection === 2 && (
             <>
             <div className="rightcheckoffer">
               <div className="headincheckoffercontainer">
                 <div className="arrowbutton">
                   <button onClick={handlearrowbuttonclick}>
                     <img
                       className="bigimage"
                       src="../src/images/left.svg"
                       alt=""
                     />
                   </button>
                 </div>
                 <div className="headingckofr">
                   <h6>Employment details</h6>
                 </div>
               </div>
               <div className="selectoptioncontain">
                 <div className="leftselectbutton">
                   <button
                     className={
                       selOption === "Home Loan" ? "selected" : ""
                     }
                     onClick={() => handleOptionClick("Home Loan")}
                   >
                     Salaried
                   </button>
                   <p className="annulincmm">Annual amount</p>
                 </div>
                 <div className="rightselectbutton">
                   <button
                     className={
                       selOption === "Loan Against Property"
                         ? "selected"
                         : ""
                     }
                     onClick={() =>
                       handleOptionClick("Loan Against Property")
                     }
                   >
                    Self-Employed
                   </button>
                 </div>
               </div>
               <div className="inputcontainer">
                 <div>
                   <input
                     type="number"
                     placeholder="Annual Amount"
                     value={anualamount}
                     onChange={(e) => setAnnualamount(e.target.value)}
                   />

                   {error && <p className="error-message">{error}</p>}
                 </div>
               </div>
               <div className="nextbuttoncontain">
                 <button onClick={handleNextClick}>
                   Next <img src="../src/images/right.svg" alt="" />
                 </button>
               </div>
             </div>
           </>
          //  ------------------------------------------3rd------------------------------------------
       
             )}
             {currentSection === 3 && (
             <>
             <div className="rightcheckoffer">
               <div className="headincheckoffercontainer">
                 <div className="arrowbutton">
                   <button onClick={handlearrowbuttonclick}>
                     <img
                       className="bigimage"
                       src="../src/images/left.svg"
                       alt=""
                     />
                   </button>
                 </div>
                 <div className="headingckofr">
                   <h6>Any Current EMI's </h6>
                 </div>
               </div>
               <div className="selectoptioncontain">
                 <div className="leftselectbutton">
                   <button
                     className={
                       selOption === "anyEMIyes" ? "selected" : ""
                     }
                     onClick={() => handleOptionClick("anyEMIyes")}
                   >
                    Yes
                   </button>
                   {/* <p className="annulincmm">Annual amount</p> */}
                 </div>
                 <div className="rightselectbutton">
                   <button
                     className={
                       selOption === "anyEMIno"
                       ? "selected"
                       : ""
                      }
                      onClick={() =>
                        handleOptionClick("anyEMIno")
                      }
                      >
                  No
                   </button>
                 </div>
               </div>
               <div className="inputcontainer">
                     {error && <p className="error-message">{error}</p>}
                 <div>
                  
                 </div>
               </div>
               <div className="nextbuttoncontain">
                 <button onClick={handleNextClick}>
                   Next <img src="../src/images/right.svg" alt="" />
                 </button>
               </div>
             </div>
           </>
              //  ------------------------------------------4thrd------------------------------------------
             )}
             {currentSection === 4 && (
             <>
             <div className="rightcheckoffer">
               <div className="headincheckoffercontainer">
                 <div className="arrowbutton">
                   <button onClick={handlearrowbuttonclick}>
                     <img
                       className="bigimage"
                       src="../src/images/left.svg"
                       alt=""
                     />
                   </button>
                 </div>
                 <div className="headingckofr">
                   <h6>Any Current EMI's </h6>
                 </div>
               </div>
               <div className="selectoptioncontain">
                 <div className="leftselectbutton">
                   <button
                     className={
                       selOption === "Home Loan" ? "selected" : ""
                     }
                     onClick={() => handleOptionClick("Home Loan")}
                   >
                    Yes
                   </button>
                   {/* <p className="annulincmm">Annual amount</p> */}
                 </div>
                 <div className="rightselectbutton">
                   <button
                     className={
                       selOption === "Loan Against Property"
                         ? "selected"
                         : ""
                     }
                     onClick={() =>
                       handleOptionClick("Loan Against Property")
                     }
                   >
                  No
                   </button>
                 </div>
               </div>
               <div className="inputcontainer">
                 <div>
                  
                      <input type="number" placeholder="Enter a EMI "  value={emiamount}
                          onChange={(e) => setEmiamount(e.target.value)} />
                   {error && <p className="error-message">{error}</p>}
                 </div>
               </div>
               <div className="nextbuttoncontain">
                 <button onClick={handleNextClick}>
                   Next <img src="../src/images/right.svg" alt="" />
                 </button>
               </div>
             </div>
           </>
            //  ------------------------------------------5th------------------------------------------
             )}
             {currentSection === 5 && (
             <>
             <div className="rightcheckoffer">
               <div className="headincheckoffercontainer">
                 <div className="arrowbutton">
                   <button onClick={handlearrowbuttonclick}>
                     <img
                       className="bigimage"
                       src="../src/images/left.svg"
                       alt=""
                     />
                   </button>
                 </div>
                 <div className="headingckofr">
                   <h6>Property City </h6>
                 </div>
                   {error && <p className="error-message">{error}</p>}
               </div>
               <div className="selectoptioncontain">
                 <div className="leftselectbutton">
                   <button
                     className={
                       selOption === "Delhi NCR" ? "selected" : ""
                     }
                     onClick={() => handleOptionClick("Delhi NCR")}
                   >
                    Delhi NCR
                   </button>
                   {/* <p className="annulincmm">Annual amount</p> */}
                 </div>
                 <div className="rightselectbutton">
                   <button
                     className={
                       selOption === " Hyderabad"
                         ? "selected"
                         : ""
                     }
                     onClick={() =>
                       handleOptionClick(" Hyderabad")
                     }
                   >
                  Hyderabad
                   </button>
                 </div>
               </div>
               <div className="inputcontainer">
                 <div>
                 <button className={
                       selOption === "Mumbai"
                         ? "selected"
                         : ""
                     }
                     onClick={() =>
                       handleOptionClick("Mumbai")
                     } >Mumbai</button>
                 </div>
                 <div>
                 <button
                 className={
                  selOption === "Others"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  handleOptionClick("Others")
                }
                 >Others</button>
                 </div>
               </div>
               <div className="nextbuttoncontain">
                 <button onClick={handleNextClick}>
                   Next <img src="../src/images/right.svg" alt="" />
                 </button>
               </div>
             </div>
           </>
              //  ------------------------------------------6th------------------------------------------
             )}
             {currentSection === 6 && (
             <>
             <div className="rightcheckoffer">
               <div className="headincheckoffercontainer">
                 <div className="arrowbutton">
                   <button onClick={handlearrowbuttonclick}>
                     <img
                       className="bigimage"
                       src="../src/images/left.svg"
                       alt=""
                       />
                   </button>
                 </div>
                 <div className="headingckofr">
                   <h6>Property City </h6>
                 </div>
                       {error && <p className="error-message">{error}</p>}
               </div>
               <div className="selectoptioncontain">
                 <div className="leftselectbutton">
                   <button
                     className={
                       selOption === "Home Loan" ? "selected" : ""
                     }
                     onClick={() => handleOptionClick("Home Loan")}
                   >
                    Direct Allotment
                   </button>
                   {/* <p className="annulincmm">Annual amount</p> */}
                 </div>
                 <div className="rightselectbutton">
                   <button
                     className={
                       selOption === " Allotment Transfer"
                         ? "selected"
                         : ""
                     }
                     onClick={() =>
                       handleOptionClick(" Allotment Transfer")
                     }
                   >
                  Allotment Transfer
                   </button>
                 </div>
               </div>
               <div className="inputcontainer">
                 <div>
                 <button
                  className={
                    selOption === "Resale"
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    handleOptionClick("Resale")
                  }
                 >Resale</button>
                 </div>
                 <div>
                 <button
                  className={
                    selOption === "Otherss"
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    handleOptionClick("Otherss")
                  }
                 >Others</button>
                 </div>
               </div>
               <div className="nextbuttoncontain">
                 <button onClick={handleNextClick}>
                   Next <img src="../src/images/right.svg" alt="" />
                 </button>
               </div>
             </div>
           </>
             //  ------------------------------------------7th------------------------------------------
             )}
             
             {currentSection === 7 && (
             <>
              <div className="rightcheckoffer">
                    <div className="headincheckoffercontainer">
                      <div className="arrowbutton">
                        <button onClick={handlearrowbuttonclick}>
                          <img
                            className="bigimage"
                            src="../src/images/left.svg"
                            alt=""
                          />
                        </button>
                      </div>
                      <div className="headingckofr">
                        <h6>Last Few Details... </h6>
                      </div>
                    </div>
                    
                    <div className="inputcontainer">
                      <div className="inputdiv">
                        <input
                          type="text"
                          placeholder="Name"
                          
                         value={usrnam}
                         onChange={(e) => setUsrnam(e.target.value)}
                        />

                        {error && <p className="error-message">{error}</p>}
                      </div>
                      <div className="inputdiv">
                        <input
                          type="text"
                          placeholder="Email id"

                         value={emailid}
                          onChange={(e) => setEmailid(e.target.value)}
                         
                        />

                        {/* {error && <p className="error-message">{error}</p>} */}
                      </div>
                   
                    </div>
                    <div className="nextbuttoncontain">

                    {usrnam && emailid ? (
              <Link to="/cpage/getoffers/banemipage">
                <button onClick={handleNextClick}>
                  Next <img src="../src/images/right.svg" alt="" />
                </button>
              </Link>
            ) : (
              <button onClick={handleNextClick}>
                Next <img src="../src/images/right.svg" alt="" />
              </button>
            )}



                    </div>
                  </div>
           </>
             )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkoffer;
