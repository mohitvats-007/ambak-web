import React, { useEffect, useState } from "react";
import Paginationfetchdata from "./paginationfetchdata";

function FetchData() {
  const [records, setRecords] = useState([]);
  //  state for current page
  const [currentpage, setCurrentpage] = useState(1);

  const postperpage = 50;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => setRecords(data))
      .catch((err) => console.log(err));
  }, []);

  // console.log(records);
  const lastpostindex = currentpage * postperpage;
  const firstpostindex = lastpostindex - postperpage;
  const currentpost = records.slice(firstpostindex, lastpostindex);
  return (
    <>
      <table className="table table-drak table-striped mt-10">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">id</th>
            <th scope="col">Id</th>
            <th scope="col">postId</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {currentpost.map((data, index) => {
            return (
              <tr key={index}>
                <th scope="row">{}</th>
                <td>{data.id}</td>
                <td>{data.postId}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* passing props to the pagination function  */}

      <Paginationfetchdata
        totalposts={records.length}
        postperpage={postperpage}
        setCurrentpage={setCurrentpage}
        currentpage={currentpage}
      />
    </>
  );
}

export default FetchData;

// import React, { useState, useEffect } from 'react';
// import '/fetchdata.css';

// const PartnerWithUs = () => {
//   const [formData, setFormData] = useState({
//     typeofpartner: '',
//     name: '',
//     email: '',
//     mobile: '',
//     state: '',
//     district: '',
//     message: '',
//   });

//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [formIsValid, setFormIsValid] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [locationData, setLocationData] = useState(null);

//   useEffect(() => {
//     const fetchLocationData = async () => {
//       try {
//         const response = await fetch('http://localhost:8081/api/locations');
//         const data = await response.json();
//         console.log('Fetched Data:', data);

//         // Map states and districts from the fetched data
//         const statesList = data.states.map(state => state.state);
//         setStates(statesList);

//         setLocationData(data);
//       } catch (error) {
//         console.error('Error fetching location data:', error);
//         // Optionally set an error state to inform the user
//       }
//     };

//     fetchLocationData();
//   }, []);

//   useEffect(() => {
//     const errors = {};

//     if (!formData.typeofpartner) {
//       errors.typeofpartner = 'Please select a partner type.';
//     }
//     if (!formData.name) {
//       errors.name = 'Please enter your full name.';
//     } else if (formData.name.length < 2 || formData.name.length > 50) {
//       errors.name = 'Name must be between 2 and 50 characters.';
//     }
//     if (!formData.email) {
//       errors.email = 'Please enter your email address.';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       errors.email = 'Invalid email format.';
//     }
//     if (!formData.mobile) {
//       errors.mobile = 'Please enter your mobile number.';
//     } else if (!/^[0-9]{10,12}$/.test(formData.mobile)) {
//       errors.mobile = 'Please enter a valid 10-digit mobile number.';
//     } else if (!/^\d+$/.test(formData.mobile)) {
//       errors.mobile = 'Mobile number must contain only digits.';
//     }
//     if (!formData.state) {
//       errors.state = 'Please select your state.';
//     }
//     if (!formData.district) {
//       errors.district = 'Please select your district.';
//     }
//     if (!formData.message) {
//       errors.message = 'Please enter your message.';
//     } else if (formData.message.length < 10 || formData.message.length > 200) {
//       errors.message = 'Message must be between 10 and 200 characters.';
//     }

//     setValidationErrors(errors);
//     setFormIsValid(Object.keys(errors).length === 0);
//   }, [formData]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleStateChange = (e) => {
//     const selectedState = e.target.value;
    
//     setFormData((prevData) => ({
//       ...prevData,
//       state: selectedState,
//       district: '', // Clear district when state changes
//     }));

//     // Find districts for the selected state
//     const selectedLocation = locationData.states.find(state => state.state === selectedState);
//     const filteredDistricts = selectedLocation ? selectedLocation.districts : [];
    
//     setDistricts([...new Set(filteredDistricts)]); // Set unique districts based on selected state
//   };

//   const handleDistrictChange = (e) => {
//     const selectedDistrict = e.target.value;
    
//     setFormData((prevData) => ({
//       ...prevData,
//       district: selectedDistrict,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formIsValid) {
//       alert('Please fill out all required fields correctly.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8081/submit-form', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert('Form submitted successfully!');
//         console.log(formData); 
//         setFormData({
//           typeofpartner: '',
//           name: '',
//           email: '',
//           mobile: '',
//           state: '',
//           district: '',
//           message: '',
//         });
//       } else {
//         alert('Failed to submit the form.');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('There was an error submitting the form.');
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Partner With Us</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Type of Partner:
//           <select
//             name="typeofpartner"
//             value={formData.typeofpartner}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>Select the type of Partner</option>
//             <option value="partner1">Partner 1</option>
//             <option value="partner2">Partner 2</option>
//             <option value="partner3">Partner 3</option>
//           </select>
//           {validationErrors.typeofpartner && <p className="error">{validationErrors.typeofpartner}</p>}
//         </label>
//         <label>
//           Full Name:
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter Your Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           {validationErrors.name && <p className="error">{validationErrors.name}</p>}
//         </label>
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Your Email Id"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           {validationErrors.email && <p className="error">{validationErrors.email}</p>}
//         </label>
//         <label>
//           Mobile:
//           <input
//             type="text"
//             name="mobile"
//             placeholder="Enter Your Mobile Number"
//             value={formData.mobile}
//             onChange={handleChange}
//             onInput={(e) => {
//               const filteredValue = e.target.value.replace(/[^\d]/g, '');
//               e.target.value = filteredValue.slice(0, 12);
//               handleChange(e);
//             }}
//             required
//             pattern="\d{10,12}"
//             title="Please enter a valid 10 to 12 digit mobile number"
//           />
//           {validationErrors.mobile && <p className="error">{validationErrors.mobile}</p>}
//         </label>
//         <label>
//           State:
//           <select
//             name="state"
//             value={formData.state}
//             onChange={handleStateChange}
//             required
//           >
//             <option value="" disabled>Select Your State</option>
//             {states.map((state, index) => (
//               <option key={index} value={state}>{state}</option>
//             ))}
//           </select>
//           {validationErrors.state && <p className="error">{validationErrors.state}</p>}
//         </label>
//         <label>
//           District:
//           <select
//             name="district"
//             value={formData.district}
//             onChange={handleDistrictChange}
//             required
//           >
//             <option value="" disabled>Select Your District</option>
//             {districts.map((district, index) => (
//               <option key={index} value={district}>{district}</option>
//             ))}
//           </select>
//           {validationErrors.district && <p className="error">{validationErrors.district}</p>}
//         </label>
//         <label>
//           Message:
//           <textarea
//             name="message"
//             placeholder="Message"
//             value={formData.message}
//             onChange={handleChange}
//             required
//           />
//           {validationErrors.message && <p className="error">{validationErrors.message}</p>}
//         </label>
//         <div style={{ textAlign: "center" }}>
//           <button type="submit" disabled={!formIsValid}>Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PartnerWithUs;
