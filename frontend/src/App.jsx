import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import {  Routes, Route} from 'react-router-dom';
import Navbar from            '../components/navbar'
import Home from              '../components/Home';
import FetchData from         '../fetchdata';
import Contact from           '../components/contact';
import Blog from              '../components/blog';
import Footer from            '../components/footer';
import CreditReport from      './components/creditreport/creditreport';
import Checkoffer from        './components/check offer/Checkoffer';
import Bankemipage from       './components/Bankemipage/Bankemipage';
import Newhomepage from       './components/campainingpage/Newhomepage';
import Thankyou from          './components/thankyoupage/Thankyou';
import Calculators from       './components/calculator/Calculators';
import Signup from            './components/signup/Signup';
import Login from             './components/Login/Login';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { AuthProvider,useAuth } from './conext/Authcontext';

function App() {
  // const { isAuthenticated } = useAuth();
  // if (isAuthenticated === null) {
  //   return <div>Loading...</div>;
  // }


//   const [auth,setAuth]=useState(false)
//   const [message,setMessage]=useState('')
//   const [name,setName]=useState('')
//   // const navigate = useNavigate();
// axios.defaults.withCredentials=true
// useEffect(()=>{
//   axios.get(`http://localhost:8081`)
//   .then(res=>{
//     if(res.data.Status==="Success"){
//        console.log("Entry point")
//        console.log(auth)
//       setAuth(true);
//        setName(res.data.name)
//     }
//     else{
//       setAuth(false)
//       setMessage(res.data.Error)
//     }
//   })

// },[auth])

// const handledelete =()=>{
//   axios.get(`http://localhost:8081/logout`)
//   .then(res=>{
//     location.reload(true)
//     console.log(res)
//   }).catch(err=>(console.log(err)))
// }
  return (
    <>
    <BrowserRouter>    
     <Navbar />
    <Routes>
    <Route path="/signup"                                element={<Signup/>}/>
    <Route path="/login"                                 element={ <Login/>}/>
    <Route path="home"                                   element={<Home/>}/>
    <Route path="/"                                      element={<Login/>}/>
    <Route path="blog"                                   element={<Blog/>}/>
    <Route path="FetchData"                              element={<FetchData/>}/>
    <Route path="becomepartner"                          element={<Contact/>} />
    <Route path="/cpage/popup"                           element={<CreditReport/>}/>  
    <Route path="/cpage"                                 element={<Newhomepage/>}/>
    <Route path="/cpage/getoffers"                       element={<Checkoffer/>}/>
    <Route path="/cpage/getoffers/banemipage"            element={ <Bankemipage/>}/>
    <Route path="/cpage/getoffers/banemipage/thankyou"   element={<Thankyou/>} />
    <Route path="/Calculators"                           element={ <Calculators/>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}
// const AppWrapper = () => (
//   <AuthProvider>
//     <App />
//   </AuthProvider>
// );

export default App






// <div className="table-container">
// <table className="loan-table">
//   <thead>
//     <tr>
//       <th>Partners</th>
//       <th>Mobile</th>
//       <th>Email</th>
//       {/* <th>OPEN</th> */}
//     </tr>
//   </thead>
//   <tbody>
//     {Partnerdta.map((data, index) => (
//       <React.Fragment key={index}>
//         <tr>
//           <td>{data.name}</td>
//           <td>{data.phone}</td>
//           <td>{data.email}</td>
//           <td className="laascontain">
//             <button
//               className="buttonplusminus"
//               onClick={() => toggleMonthlyTable(index)}
//             >
//               {getToggleButton(index)}
//             </button>
//           </td>
//         </tr>
//         {openRowIndex === index && (
//           <tr>
//             <td colSpan="4">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Sub Partners</th>
//                     <th>mobile</th>
//                     <th>Email</th>
//                     {/* <th>OPEN</th> */}
//                   </tr>
//                 </thead>
//                 <tbody cellSpacing={0} cellPadding={0}>
//                   {data.subpartners.map((subpartData, partIndex) => (
//                      <React.Fragment key={partIndex}>
//                       <tr>
//                       <td>{subpartData.name}</td>
//                       <td>{subpartData.mobile}</td>
//                       <td>{subpartData.email}</td>
//                       <td>
//                         <button>Edit</button>
//                       </td>
//                     </tr>
//                     {subpartData.childpartners.length > 0 && (
//                       <tr>
//                         <td colSpan="4">
//                           <table>
//                             <thead>
//                               <tr>
//                                 <th>Child Partners</th>
//                                 <th>Mobile</th>
//                                 <th>Email</th>
//                                 <th></th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {subpartData.childpartners.map((childData, childIndex) => (
//                                 <tr key={childIndex}>
//                                   <td>a</td>
//                                   <td>c</td>
//                                   <td>c</td>
//                                   <td>
//                                     <button>Edit</button>
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </td>
//                       </tr>
//                     )}
//                   </React.Fragment>
                    
//                   ))}
//                 </tbody>
//               </table>
//             </td>
//           </tr>
//         )}
//       </React.Fragment>
//     ))}
//   </tbody>
// </table>
// </div>






// app.get('/runAll', async (req, res) => {
//   try {
//       const activePartnerId = await getActivePartner();
//       if (!activePartnerId) return res.status(404).json({ message: 'No active partner found' });

//       const inactivePartnerData = await getInactivePartner();
//       if (!inactivePartnerData) return res.status(404).json({ message: 'No inactive partner found' });

//       const { inactivePartnerId, Looptimes } = inactivePartnerData;

//       for (let i = 0; i < Looptimes; i++) {
//           try {
//               const partnerIdToUpdate = await getPartnerToUpdate(inactivePartnerId);
//               console.log("sakdjnsajdasjdjasdjasjdjas",!partnerIdToUpdate);
//               if (!partnerIdToUpdate) {
//                   console.log(`No partner ID to update found on iteration ${i + 1}`);
//                   continue;
//               }
//               const updateResult = await updatePartnerId(activePartnerId, partnerIdToUpdate);
//               console.log(`Update successful on iteration ${i + 1}`, updateResult);
//           } catch (err) {
//               console.error(`Error on iteration ${i + 1}:`, err);
//           }
//       }
//       return res.status(200).json({ message: `Update attempted ${Looptimes} times` });

//   } catch (err) {
//       console.error('Error:', err);
//       return res.status(500).json({ error: 'Internal server error' });
//   }
// });