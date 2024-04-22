import React, { useState,useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import "./contact.css";
import Paginationcontactform from "./paginationcontactform";

//set the initial value in the form 
const Contact = () => {
  const [values,setValues]=useState({
    id:"",
    name:'',
    email:'',
    phonenumber:'',
    address:'',
    status:""
  })


  // pagination states define

  const [currentpage,setCurrentpage]= useState(1);
  const [postperpage,setpostperpage]= useState(5);



  const [userData, setUserData] = useState(() => {
    const storedata = localStorage.getItem("userData");
    try {
        return storedata ? JSON.parse(storedata) : [];
    } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
        return [];
    }
});

const [editIndex, setEditIndex] = useState(null); 
    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData]);


  const handlechange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const validatename = (name) => {
    const re =  /^[A-Za-z\s'-]+$/;
    return re.test(String(name).toLowerCase());
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const validateaddress = (address) => {
    const re = /^[A-Za-z0-9\s,'-]+$/;
    return re.test(String(address).toLowerCase());
  };
  const validatephonenumber = (phonenumber) => {
    const re = /^[0-9]{10}$/;
    return re.test(String(phonenumber).toLowerCase());
  };

    const submitHandler= (event)=>{
      
  // Generate ID only when adding a new entry
  const id = editIndex !== null ? values.id : uuidv4(); 
  
  setValues({ ...values, id: id });
        const name = values.name;
        const phonenumber = values.phonenumber;
        const email = values.email;
        const address = values.address;
        
        // console.log(event);
        if (!name ||!address || !email|| !phonenumber) 
          if (!validatename(name)) {
            alert("Please enter a valid name");
            return;
          }
          if (!validatephonenumber(phonenumber)) {
            alert('Please enter a valid mobile number.');
            return;
          }
          if (!validateEmail(email)) { 
          alert("Please enter a valid email address.");
          return;
        }
        if (!validateaddress(address)) {
          alert("Please enter a valid  address.");
          return;
        }
        if (editIndex !== null) {
          // Check for duplicate phone number only if editing
        } else {
         
          if (userData.some(user => user.phonenumber === phonenumber)) {
            alert("Phone number already registered");
            return;
          }
          if (userData.some(user => user.email === email)) {
            alert("email already register");
            return;
          }
        }
        const updatedUserData = [...userData];
        if (editIndex !== null) {
            updatedUserData[editIndex] = values;
        } else {
            updatedUserData.push(values);
        }
        setUserData(updatedUserData);
        setValues({
            id,
            name: "",
            email: "",
            phonenumber: "",
            address: "",
            status:""
          });
        setEditIndex(null); 
          console.log("id outside "+ id);
        const requestUrl = editIndex !== null
        ? `http://localhost:8081/sys/${values.id}`  // Use PUT for updating existing data
        : 'http://localhost:8081/sys'; 
console.log(id)
        axios({
          method: editIndex !== null ? 'put' : 'post',
          url: requestUrl,
          data: {
            status:'1',
            id: id, 
            name: values.name,
            email: values.email,
            phonenumber: values.phonenumber,
            address: values.address
          }})
          .then(res => {
        console.log("Data saved successfully");
        console.log("id inside"+ id),
        console.log(res);
        event.target.reset(); 
    })
    .catch(err=> {
        console.log(err);
        console.log("Error saving data");
    })
}


useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/getAllData`); 
      
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }};
const updateUser = (index) => {
  // e.preventDefault();  
  
  const { id,name, email, phonenumber, address } = userData[index];
  console.log(index);
  console.log(id,"id");
  console.log(name,"name");
  console.log(address,"address");

  setValues({
       id:id,
      name: name,
      email: email,
      phonenumber: phonenumber,
      address: address,
      
  });
  setEditIndex(index);
};

const removeRow = (id, index) => {
  const confirmed = window.confirm("Are you sure you want to remove this row?");
  
  if (!confirmed) {
      console.log("cancel")
  }
else{
  console.log("Removing row with ID:", id);
  console.log("Row index:", index);

  axios.post(`http://localhost:8081/setstatus/${id}`)
      .then(res => {
          console.log("Status update successful");
          console.log(res);
          const updatedUserData = [...userData];
          updatedUserData.splice(index, 1);
          setUserData(updatedUserData);
          // alert("Status updated");
      })
      .catch(err => {
          console.error("Error updating status:", err);
      });
}}



const lastpostindex= ((currentpage*postperpage));
const firstpostindex= ((lastpostindex-postperpage));
let currentpost= (userData.slice(firstpostindex,lastpostindex));
// console.log(currentpost)



const filteredData = userData.filter(userData => userData.Status == "1");

// Count the number of items in the filtered data
const countStatus1 = filteredData.length;

console.log(userData.length);
console.log(countStatus1)









  return (
    <>
    <form className="container" onSubmit={submitHandler}>    
      <div className="container1">
      </div>
      <div className="container2">
        <div className="input1">
        <label className="nametext" htmlFor="name">Name</label>
          <input type="text" value={values.name} placeholder="Your Name*" className="name"  name="name" id="name"  onChange={handlechange} />
        <label className="phonenumber" htmlFor="name">Ph.no</label>
          <input type="number" value={values.phonenumber} placeholder="+91 Mobile Number*" className="name"  name="phonenumber" id="phonenumber" maxLength="10" onChange={handlechange}  />
        </div>
        <hr/>
        <div className="input2">
          <label htmlFor="mail" className="email">Email ID :</label>
          <input type="text" value={values.email} placeholder="Email id*" id="mail" className="name" name="email"  onChange={handlechange} />
          <label className="address" htmlFor="Pincode">Address</label>
          <input type="text" value={values.address} placeholder="Address" className="name" name="address" onChange={handlechange} />
        </div>
      
        <div className="input4">
          <button className="name" type="submit" id="button">Save</button>
        </div>
      </div>
      </form>
<table className="table table-bordered text-wrap">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Ph.no</th>
      <th scope="col">Email</th>
      <th scope="col">Address</th>
      {/* <th scope="col">Status</th> */}
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {currentpost && currentpost.length > 0 ? (
  currentpost.map((user, index) => (
    user.Status == '0' ? null : (
      <tr key={index}>
        <th scope="row"> {index + 1}</th>
        <td>{user?.name || ""}</td>
        <td>{user?.phonenumber || ""}</td>
        <td>{user?.email || ""}</td>
        <td>{user?.address || ""}</td>
        {/* <td>{user?.Status || "0"}</td> */}
        <td>
          <button onClick={() => updateUser(index)} type="button" className="btn btn-info">
            <img src="https://cdn.hugeicons.com/icons/pencil-edit-01-stroke-rounded.svg" alt="pencil-edit-01" width="24" height="24" />
            Edit
          </button>
        </td>
        <td>
          <button onClick={() => removeRow(user.id, index)} type="button" className="remove-button btn btn-danger">
            Remove
          </button>
        </td>
      </tr>
    )
  ))
) : (
  <tr>
    <td colSpan="6">No data available</td>
  </tr>
)}
  </tbody>
</table>
{/* <button>Previous</button>
<button>Previous</button>
<button>Previous</button> */}

<Paginationcontactform totalposts= {countStatus1} postperpage={postperpage} setCurrentpage={setCurrentpage}/>
    </>
  );
};

export default Contact;