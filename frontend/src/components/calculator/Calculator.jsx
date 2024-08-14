import React, { useEffect, useState } from "react";
import "./calculators.css";
import axios from "axios";
const Calculators = () => {
  const [openPartnerDetailIndex, setOpenPartnerDetailIndex] = useState(null);
  const [openSubpartnerIndex, setOpenSubpartnerIndex] = useState(null);
  const [openCHILRowIndex, setOpenCHILRowIndex] = useState(null);
  const [Partnerdta, setPartnerdta] = useState([]);
  const [Partnerdetails, setPartnerdetails] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [EditformPopup, setEditformPopup] = useState(false);
  const [selectedSubpartner, setSelectedSubpartner] = useState(null);
  const [selectedNewPartnerId, setSelectedNewPartnerId] = useState("1");
  const [selectedFile, setSelectedFile] = useState({
    aadhar: null,
    pan: null,
    gst: null,
    cancelCheck: null,
  });
  const [uploadMessage, setUploadMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [PartnerdetailsID, setPartnerDeatilID] = useState("");
  const [imageType, setimageType] = useState("");
  const [fileErrorMessage, setFileErrorMessage] = useState("");

  const togglePartnerDetails = (index, partid) => {
    setPartnerDeatilID(partid);
    console.log(PartnerdetailsID);
    setOpenPartnerDetailIndex(openPartnerDetailIndex === index ? null : index);
    setOpenSubpartnerIndex(null);
  };
  const toggleSubPartnerTable = (index) => {
    setOpenSubpartnerIndex(openSubpartnerIndex === index ? null : index);
    setOpenPartnerDetailIndex(null);
  };

  const togglePopup = (subpartner) => {
    setSelectedSubpartner(subpartner.id);
    setShowPopup(!showPopup);
  };
  const toggleImgPopup = (imageType,imageUrl = null) => {
    setimageType(imageType);
    console.log(imageType)
    console.log(imageUrl)
    setShowImagePopup(!showImagePopup);

    if (typeof imageUrl === "string" && imageUrl.trim() !== "") {
      const imageName = imageUrl.split("\\").pop();
      setSelectedImage(`http://localhost:8081/upload/${imageName}`);
    } else {
      setSelectedImage(null);
    }
  };
  const toggleEditform=()=>{
    setEditformPopup(!EditformPopup)
  }

  const toggleinactive = async (partnerId) => {
    const userreply = confirm("Are you sure to Inactive this partner ?");
    if (userreply) {
      try {
        await axios.put("http://localhost:8081/updatepartner", {
          partner_id: partnerId,
          status: 0,
        });
        const updatedPartners = Partnerdta.map((partner) =>
          partner.id === partnerId ? { ...partner, status: 0 } : partner
        );
        setPartnerdta(updatedPartners);

        await axios.put("http://localhost:8081/runAll");

        const response = await axios.get("http://localhost:8081/getpartnerdta");
        setPartnerdta(response.data);
        console.log("partner data update after runall query-------------",response.data);
      } catch (error) {
        console.error("Error inactivating partner:", error);
      }
    }
  };

  const handleChangePartner = async () => {
    try {
      await axios.put("http://localhost:8081/updateSubpartner", {
        id: selectedSubpartner,
        partner_id: selectedNewPartnerId,
      });
      const response = await axios.get("http://localhost:8081/getpartnerdta");
      setPartnerdta(response.data);
    } catch (error) {
      console.error("Error updating subpartner:", error);
    }
    console.log(selectedNewPartnerId);
    setShowPopup(false);
  };

  const getToggleButton = (index) => {
    if (openSubpartnerIndex === index) {
      return "-";
    } else {
      return "+";
    }
  };
  const togglesubpartner = (index) => {
    setOpenCHILRowIndex(openCHILRowIndex === index ? null : index);
  };

  const getToggleButton1 = (index) => {
    if (openCHILRowIndex === index) {
      return "-";
    } else {
      return "+";
    }
  };

  // -----------------File upload-------------------
  // const handleFileChange = (imageType,e,fileType) => {
  //   console.log(imageType)
  //   const file = e.target.files[0];
  //   console.log(file)
  //   const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    
  //   if (file && validImageTypes.includes(file.type)) {
  //     setSelectedFile((prevFiles) => ({ ...prevFiles, [fileType]: file }));
  //     console.log(selectedFile)
  //     setFileErrorMessage("Fileeeeeeeeeeeeeeeeeeeeeeee");
  //   } else {
  //     setFileErrorMessage("Please select a valid image file (JPEG, PNG, GIF).");
  //     setSelectedFile((prevFiles) => ({ ...prevFiles, [fileType]: null }));
  //   }
  // };
  const handleFileChange = (imageType, e, fileType) => {
    console.log(imageType);
    const file = e.target.files[0];
    console.log(file);
  
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    
    if (file && validImageTypes.includes(file.type)) {
      setSelectedFile((prevFiles) => {
        // Log the previous state for debugging
        console.log('Previous Files:', prevFiles);
  
        // Update the state with the new file
        const updatedFiles = { ...prevFiles, [fileType]: file };
  
        // Log the updated state for debugging
        console.log('Updated Files:', updatedFiles);
  
        return updatedFiles;
      });
  
      // Set the error message for valid files (optional)
      setFileErrorMessage("");
    } else {
      // Set the error message for invalid files
      setFileErrorMessage("Please select a valid image file (JPEG, PNG, GIF).");
  
      // Clear the file from the state
      setSelectedFile((prevFiles) => ({ ...prevFiles, [fileType]: null }));
    }
  };
  
  // You can use a useEffect to debug state changes
  useEffect(() => {
    console.log('Selected File Updated:', selectedFile);
  }, [selectedFile]);
  const HandleSubmit = async () => {
    const formData = new FormData();
    let isFileSelected = false;

    for (const [key, value] of Object.entries(selectedFile)) {
      if (value) {
        formData.append(key, value);
        isFileSelected = true;
      }
    }
    if (!isFileSelected) {
      // Handle the case when no file is selected
      console.log("No file selected");
      setUploadMessage("Please select a file to upload.");
      return;
    }
    formData.append("partner_id", PartnerdetailsID);
    console.log(formData)

    try {
      const res = await axios.post("http://localhost:8081/uploadimg", formData);
      console.log(res);
      setUploadMessage("File uploaded successfully.");
      // Refresh partner details after successful upload
      const response2 = await axios.get("http://localhost:8081/getpartneralldeatils");
      setPartnerdetails(response2.data)
      console.log(response2.data);
  
      // Toggle image popup with updated image
      const imageName = res.data.fileName; // assuming the response contains the filename
      toggleImgPopup(imageType, `http://localhost:8081/upload/${imageName}`);
      
      setShowImagePopup(showImagePopup);
      console.log(imageName)
      // Update the image URL and toggle popup
      setSelectedImage(`http://localhost:8081/upload/${imageName}`);

    } catch (err) {
      console.log(err);
      setUploadMessage("Error uploading file.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/getpartnerdta`);
        setPartnerdta(response.data);
        console.log(response.data);
        const response1 = await axios.get(
          `http://localhost:8081/getpartneralldeatils`
        );
        setPartnerdetails(response1.data);
        console.log(response1.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } 
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="table-container">
        <table className="loan-table">
          <thead>
            <tr>
              <th>Partners</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Partner Details</th>
              <th>Active/Inactive</th>
              <th>OPEN</th>
            </tr>
          </thead>
          <tbody>
            {Partnerdta.map((data, index) => (
              <React.Fragment key={index}>
                <tr className="partnerrow">
                  <td>{data.name}</td>
                  <td>{data.phone}</td>
                  <td>{data.email}</td>
                  <td>
                    <button
                      onClick={() => togglePartnerDetails(index, data.id)}
                    >
                      Partner Details
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleinactive(data.id)}
                      disabled={data.status === 0}
                    >
                      {data.status === 0 ? "InActive" : "Active"}
                      {/* {console.log(data)} */}
                    </button>
                  </td>
                  <td className="laascontain">
                    <button
                      className="buttonplusminus"
                      onClick={() => toggleSubPartnerTable(index)}
                    >
                      {getToggleButton(index)}
                    </button>
                  </td>
                </tr>

                {openPartnerDetailIndex === index && (
                  <tr>
                    <td colSpan="6">
                          {Partnerdetails.filter(
                            (data) => data.id === index + 1
                          ).map((dataa, index) => (
                            <React.Fragment key={index}>
                      <table className="partner-details-table">
                        <thead>
                          <tr>
                            <th>Business Detail</th>
                            <th>KYC Details</th>
                            <th>Bank Info</th>
                            <button onClick={toggleEditform}>Edit Info</button>
                          </tr>
                        </thead>
                        <tbody>
                              <tr>
                                <td>Aadhar no: {dataa.aadhar_no}</td>
                                <button
                                    onClick={() =>
                                      toggleImgPopup('Aadhar_img',dataa.Aadhar_img)
                                    }
                                  >
                                    View
                                  </button>
                                <td>Account No: {dataa.Account_no}</td>
                              </tr>
                              <tr>
                                <td>Pan no: {dataa.Pan_no}</td>
                                <button
                                    onClick={() =>
                                      toggleImgPopup('Pan_img',dataa.Pan_img)
                                    }
                                  >
                                    View
                                  </button>
                                <td>Account Type: {dataa.Account_type}</td>
                              </tr>
                              <tr>
                                <td>Gst no: {dataa.GST_no}</td>
                                <button
                                    onClick={() =>
                                      toggleImgPopup('GST_img',dataa.GST_img)
                                    }
                                  >
                                    View
                                  </button>
                                <td>IFSC Code: {dataa.IFSC_code}</td>
                              </tr>
                              <tr>
                                <td>MSME no: {dataa.msme_no}</td>
                                
                                    View
                                <td>
                                  Cancel Check : 
                                  <button
                                    onClick={() =>
                                      toggleImgPopup('Cancel_check',dataa.Cancel_check)
                                    }
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                        </tbody>
                      </table>
                            </React.Fragment>
                          ))}
                    </td>
                  </tr>
                )}
                {openSubpartnerIndex === index && (
                  <tr>
                    <td colSpan="4">
                      <table>
                        <thead>
                          <tr>
                            <th>Sub Partners</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>OPEN</th>
                          </tr>
                        </thead>
                        <tbody cellSpacing={0} cellPadding={0}>
                          {data.subpartners.map((subpartData, partIndex) => (
                            <React.Fragment key={partIndex}>
                              <tr className="subpartnerrow">
                                <td>{subpartData.name}</td>
                                <td>{subpartData.mobile}</td>
                                <td>{subpartData.email}</td>
                                <td>
                                  <button
                                    onClick={() => togglePopup(subpartData)}
                                  >
                                    Change partner
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="buttonplusminus"
                                    onClick={() => togglesubpartner(partIndex)}
                                  >
                                    {getToggleButton1(partIndex)}
                                  </button>
                                </td>
                              </tr>
                              {openCHILRowIndex === partIndex && (
                                <tr>
                                  <td colSpan="4">
                                    <table>
                                      <tbody>
                                        {subpartData.childpartners.map(
                                          (childData, childIndex) => (
                                            <tr
                                              key={childIndex}
                                              className="childpartrow"
                                            >
                                              <td>{childData.name}</td>
                                              <td>{childData.mobile}</td>
                                              <td>{childData.email}</td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <div>
          <div className="popup-form">
            <div className="popup-inner">
              <div className="radio_cross_cont">
                <label htmlFor="partners">Choose a Partner : </label>
                <select
                  name="partner"
                  id="partners"
                  value={selectedNewPartnerId}
                  onChange={(e) => setSelectedNewPartnerId(e.target.value)}
                >
                  {Partnerdta.map((partner) => (
                    <option key={partner.id} value={partner.id}>
                      {partner.name}
                    </option>
                  ))}
                </select>
                <button onClick={handleChangePartner}>Apply</button>
                <button className="close-btn" onClick={togglePopup}>
                  x
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showImagePopup && (
        <div>
          <div className="popup-form">
            <div className="popup-inner">
              <div className="radio_cross_cont">
                {selectedImage && (
                  <div>
                    <img
                      src={selectedImage}
                      alt="Cancel Check"
                      style={{ width: "200px" }}
                      />
                    {console.log(selectedImage)}
                  </div>
                )}
                <div>
              <button className="close-btn" onClick={toggleImgPopup}>
                x
              </button>
                </div>
              </div>
              {uploadMessage && <p>{uploadMessage}</p>}
                {fileErrorMessage && <p className="error-message">{fileErrorMessage}</p>}
            </div>
          </div>
        </div>
      )}
      {EditformPopup && (
        <div>
          <div className="popup-form">
            <div className="popup-inner">
              <button className="close-btn" onClick={toggleEditform}>
                x
              </button>
              <div className="radio_cross_cont">
               
                <div>
                  <label htmlFor="">Aadhar image :</label>
                  <input type="file"   onChange={(e) => handleFileChange(imageType, e, "aadhar")}/>
                  <label htmlFor="">Pan image :</label>
                  <input type="file" onChange={(e) => handleFileChange(imageType, e, "pan")} /><hr />
                  <label htmlFor="">GST image :</label>
                  <input type="file"   onChange={(e) => handleFileChange(imageType, e, "gst")} /><hr />
                  <label htmlFor="">Cancel Check  :</label>
                  <input type="file"  onChange={(e) => handleFileChange(imageType, e, "cancelCheck")} /><hr />
                  <button onClick={HandleSubmit}>Submit</button>
                </div>
              </div>
              {uploadMessage && <p>{uploadMessage}</p>}
                {fileErrorMessage && <p className="error-message">{fileErrorMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Calculators;
