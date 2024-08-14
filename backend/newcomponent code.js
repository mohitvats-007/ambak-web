
// // "use client";
// // import React, { useState } from 'react'
// // const Newcomponent = () => {
// //     const [selected, setSelected] = useState('Upload Docs');
// //     const handleClick = (buttonName) => {
// //         setSelected(buttonName);
// //     }
// //     const handleContentClick = (event) => {
// //         event.currentTarget.classList.toggle('activeacc');
// //     };
// //     return (
// //         <div className='container newcomp'>
// //             <div className="topcontainer">
// //                 <div className={`uploaddocs commnbtn ${selected === 'Upload Docs' ? 'selectedbtn' : ''}`} onClick={() => handleClick('Upload Docs')}>
// //                     <button >Upload Docs</button>
// //                 </div>
// //                 <div className={`loandetails commnbtn ${selected === 'Loan Details' ? 'selectedbtn' : ''}`} onClick={() => handleClick('Loan Details')}>
// //                     <button>Loan Details</button>
// //                 </div>
// //                 <div className={`loanstatus commnbtn ${selected === 'Loan Status' ? 'selectedbtn' : ''}`} onClick={() => handleClick('Loan Status')}>
// //                     <button>Loan Status</button>
// //                 </div>

// //             </div>

// //             {selected === 'Upload Docs' ? (
// //                 <div className="bottomcontaienr">
// //                     <div className='innerbottomcontainer'>
// //                         <div className='namediv'>Hi Shivam, </div>
// //                         <div className='firstheading webview'>Your Loan Advisor Sumit Sharma has requested for these documents.</div>
// //                         <div className='secondheading webview '>These are required for processing your Home loan</div>
// //                         <div className=' firstheading mobilviewhead'>Your Loan Advisor Sumit Sharma has requested for these documents to process the request for your home loan.</div>
// //                         <h3 className='mobilviewhead'>Pending Docs</h3>
// //                         <div className='selects'>

// //                             <div className="contentBX" onClick={handleContentClick} >
// //                                 <div className="lable">Pan Card</div>
// //                                 <div className="content">
// //                                     <label htmlFor="pancard">Pan Card</label>
// //                                     <label htmlFor="pancard" className='uploadimg'><img src="/image/uploadsvg.svg" alt="a" /> </label>
// //                                     <input type="file" name="" id="pancard"/>
// //                                 </div>
// //                             </div>
// //                             <div className="contentBX" onClick={handleContentClick}>
// //                                 <div className="lable">Identity Proof</div>
// //                                 <div className="content">
// //                                     <input type="file" name="" id="" />
// //                                 </div>
// //                             </div>
// //                             <div className="contentBX" onClick={handleContentClick}>
// //                                 <div className="lable">Residence Proof</div>
// //                                 <div className="content">
// //                                     <input type="file" name="" id="" />
// //                                 </div>
// //                             </div>
// //                             <div className="contentBX" onClick={handleContentClick}>
// //                                 <div className="lable">Income Proof</div>
// //                                 <div className="content">
// //                                     <input type="file" name="" id="" />
// //                                 </div>
// //                             </div>
// //                         </div>
// //                         <div className='subbitbuttoncontainer'>

// //                             <button className='subbuton'>Submit</button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             ) : ("")}
// //             {selected === 'Loan Details' ? (
// //                 <>
// //                     <div className='innerbottomcontainer1'>
// //                         <img src="/image/menicon.svg" alt="" />
// //                         <div>Shivam Dubey</div>
// //                         <hr />
// //                         <div className='loandetailsflex'>
// //                             <div>Loan Amount</div>
// //                             <div>₹30,00,000</div>
// //                         </div>
// //                         <hr />
// //                         <div className='loandetailsflex'>
// //                             <div>Loan Type</div>
// //                             <div>Home Loan</div>
// //                         </div>
// //                         <hr />
// //                         <div className='loandetailsflex'>
// //                             <div>Property Type</div>
// //                             <div>Builder Allotment</div>
// //                         </div>
// //                         <hr />
// //                         <div className='loandetailsflex'>
// //                             <div>Property Identified</div>
// //                             <div>Yes</div>
// //                         </div>
// //                         <hr />
// //                         <div className='loandetailsflex'>
// //                             <div>Property Value</div>
// //                             <div>₹50,00,000</div>
// //                         </div>
// //                         <hr />
// //                         <div className='loandetailsflex'>
// //                             <div>Usage Type</div>
// //                             <div>Residential</div>
// //                         </div>
// //                     </div>
// //                     <div className='loandetailsbottomconatiner'>
// //                         <div>Your Ambak Loan Advisor</div>
// //                         <div>
// //                             <img className='mensmallicon' src="/image/menicon.svg" alt="" />
// //                         </div>
// //                         <div className='mobilimg' >
// //                             Ravi Singh &nbsp;
// //                             <img src="/image/mobileimg.svg" alt="" /></div>
// //                     </div>
// //                 </>
// //             ) : ("")}
// //             {selected === 'Loan Status' ? (
// //                 <><div className='innerbottomcontainer2'>
// //                         <div className='leftinnerbottomcontainer2'>
// //                             <div>
// //                             <img src="/image/trackingstatus.svg" alt="" />
// //                             </div>
// //                         </div>
// //                         <div className='rightinnerbottomcontainer2'>
// //                             <div className='loandetailsflex2'>
// //                                 <div>Disbursed</div>
// //                                 <div>02 May, 2:30 PM</div>
// //                             </div>
// //                             <hr />
// //                             <div className='loandetailsflex2'>
// //                                 <div>Sanctioned</div>
// //                                 <div>02 May, 2:40 PM</div>
// //                             </div>
// //                             <hr />
// //                             <div className='loandetailsflex2'>
// //                                 <div>Legal Done</div>
// //                                 <div>02 May, 5:20 PM</div>
// //                             </div>
// //                             <hr />
// //                             <div className='loandetailsflex2'>
// //                                 <div>Logged In</div>
// //                                 <div>03 May, 10:10 PM</div>
// //                             </div>
// //                             <hr />
// //                             <div className='loandetailsflex2'>
// //                                 <div>Loan Request Created</div>
// //                                 <div>03 May, 11:30 PM</div>
// //                             </div>
// //                         </div>
// //                     </div></>
// //             ) : ("")
// //             }
// //         </div >
// //     )}
// // export default Newcomponent









// // ------------------------------------------------------------------------------------
// 'use client';
// import React, { useState } from 'react';
// const NewComponent = () => {
//     const [selected, setSelected] = useState('Mailform');
//     const handleClick = (buttonName) => {
//         setSelected(buttonName);
//     };
//     const [threads, setThreads] = useState([{
//         id: 1,
//         title: 'Thread 1',
//         subtitle: 'Login || confirmation',
//         lastMessage: 'Last message on-14 May'
//     }]);
//     const [inputs, setInputs] = useState(['']);


//     const addInput = () => {
//         if (inputs.length <= 5) {
//             setInputs([...inputs, '']);
//         } else {
//             alert("You can Send a maximum of 6 mail.");
//         }
//     };

//     const [tags, setTags] = useState([]);

//     const [inputValue, setInputValue] = useState('');

//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };

//     const handleKeyUp = (e) => {
//         if (e.key === 'Enter') {
//             if (validateEmail(inputValue)) {
//                 setTags([...tags, inputValue]);
//                 setInputValue('');
//             } else {
//                 // alert('Invalid email address');
//             }
//         }
//     };

//     const validateEmail = (email) => {
//         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return re.test(email);
//     };
//     const removeTag = (indexToRemove) => {
//         setTags(tags.filter((_, index) => index !== indexToRemove));
//     };


//     return (
//         <>
//             {selected === 'Mailform' ? (
//                 <>
//                     <div className='mainsangamcontainer'>
//                         <div className="leftsngmcontainer">
//                             <h4>Threads</h4>
//                             {threads.map((thread, index) => (
//                                 <div key={index} className='threadcontainer'>
//                                     <h5>{thread.title}</h5>
//                                     <h6>{thread.subtitle}</h6>
//                                     <h6>{thread.lastMessage}</h6>
//                                 </div>
//                             ))}
//                             {/* <button onClick={() => handleClick('composemail')}>+</button> */}
//                             <button onClick={() => addThread()}>+</button>
//                         </div>
//                         <div className="rightsngmcontainer">
//                             <div className="toprightsngmcontainer">
//                                 <h3><b>Sub:Disbursement Confirmation ll ...</b></h3>
//                                 <button>Template</button>
//                             </div>
//                             <hr />
//                             <div className='toprightsngmcontainer1'>
//                                 <div className="contentcontain1">
//                                     <div className='firstletter'>
//                                         <span>D</span>
//                                     </div>
//                                     <div className='contentcontainer'>
//                                         <h3>Deepak Thakur&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14:03</h3>
//                                         <h5>to Narender, communications, Naveen, Puneet, amit.baliyan</h5>
//                                         <h3>Dear Narender,</h3>
//                                         <h3>Please Share The Transaction confirmation of Lalit Kumar.</h3>
//                                         <h3>Regards,</h3>
//                                         <hr />
//                                     </div>
//                                 </div>
//                                 <div className="contentcontain1">
//                                     <div className='firstletter'>
//                                         <span>M</span>
//                                     </div>
//                                     <div className='contentcontainer'>
//                                         <h3>Deepak Thakur &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 14:03</h3>
//                                         <h5>to Narender, communications, Naveen, Puneet, amit.baliyan</h5>
//                                         <h3>Dear Team,</h3>
//                                         <h3>PFB revert</h3>
//                                     </div>
//                                 </div>
//                                 <div className='downllaoddata'>
//                                     <div><img src="/image/downloadblackicon.svg" alt="replyicon" /></div>
//                                     <div><img src="/image/downloadblackicon.svg" alt="replyicon" /></div>
//                                     <div><img src="/image/downloadblackicon.svg" alt="replyicon" /></div>
//                                 </div>
//                                 <div className="contentcontain3">
//                                     <button onClick={() => handleClick('composemail')}> <img src="/image/replyicon.svg" alt="replyicon" /> Reply</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             ) : null}
//             {selected === 'composemail' ? (
//                 <><div className='mainsangamcontainer2'>

//                     <div className='compsoheading' >
//                         <h2>Compose an email</h2>
//                     </div>
//                     <div className='allupperinputs'>
//                         <div>Thread :</div>
//                         <select name="" id="">
//                             <option value="">Thread 1</option>
//                             <option value="">Thread 2</option>
//                             <option value="">Thread 3</option>
//                         </select>
//                     </div>
//                     <div className='allupperinputs'>
//                         <div>From :</div>
//                         <input type="text" />
//                     </div>

//                     <div className='emailtextarea'>
//                         <div className='Tofield'>
//                             To :
//                         </div>
//                         <div className='allupperinputs3'>
//                             <div className='addmailinputs'>
//                                 <ul>
//                                 {tags.map((tag, index) => (
//                                     <li key={index}>{tag} <i onClick={() => removeTag(index)}>X</i></li>
//                                 ))}
//                                 <input
//                                     type="text"
//                                     value={inputValue}
//                                     onChange={handleInputChange}
//                                     onKeyUp={handleKeyUp}
//                                 />
//                                 </ul>
//                             </div>
//                             {/* <button className='AddMinputs' onClick={addInput}>+</button> */}
//                         </div>
//                     </div>
//                     <hr />
//                     <div>
//                         Subject: Login Confirmation || Dinesh Raghav Verma || Ambak Mumbai
//                         <hr />
//                     </div>
//                     <div className='largtextinconfmail'>
//                         <textarea name="" id="" placeholder='Type Something to enter you E-Mail Body...'></textarea>
//                     </div>

//                     <div className='attachfileinmail'>
//                         <label htmlFor="Uloadfil"> <img src="/image/fileattachsvg.svg" alt="" /> Attach file</label>
//                         <input type="file" id='Uloadfil' />
//                     </div>
//                     <div className='sendemailbtn'>
//                         <button onClick={() => handleClick('confirmmail')}>Send E-Mail</button>
//                     </div>
//                 </div></>
//             ) : null}
//             {selected === 'confirmmail' ? (
//                 <> <div className='mainsangamcontainer3'>
//                     <h2>Are you sure you want to send this </h2>
//                     <h2>E-Mail from the official Ambak ID?</h2>
//                     <div>
//                         <button onClick={() => handleClick('composemail')}>Cancel</button>
//                         <button>Confirm</button>
//                     </div>
//                 </div>  </>
//             ) : null}
//         </>
//     );
// };

// export default NewComponent;

// // ------------------------------------------------------------------------------------




// // import React from 'react'

// // const Newcomponent = () => {
// //   return (
// //     <div>
// //         <div className="tag-box">
// //             <ul>
// //                 <li>Html<i>X</i></li>
// //                 <li>Html<i>X</i></li>
// //                 <input type="text" />
// //             </ul>
// //         </div>
// //     </div>
// //   )
// // }

// // export default Newcomponent
