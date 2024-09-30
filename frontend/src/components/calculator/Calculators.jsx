import React, { useEffect, useState } from "react";
import "./calculators.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
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
  const [selectedFile, setSelectedFile] = useState();
  const [uploadMessage, setUploadMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [PartnerdetailsID, setPartnerDeatilID] = useState("");
  const [imageType, setimageType] = useState("");
  const [fileErrorMessage, setFileErrorMessage] = useState("");
  const [selectedSection, setSelectedSection] = useState("business");
  const [Progreessbar, setProgreessbar] = useState({ started: false, pc: 0 });

  const [values, setValues] = useState({
    aadharno: "",
    panno: "",
    gstno: "",
    Accno: "",
    Acctype: "Saving Account",
    IFSCcode: "",
  });

  const togglePartnerDetails = (index, partid) => {
    setPartnerDeatilID(partid);
    // console.log(PartnerdetailsID);
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

  const toggleEditform = () => {
    // console.log(Partnerdetails[PartnerdetailsID]);

    const { aadhar_no, Pan_no, GST_no, Account_no, Account_type, IFSC_code } =
      Partnerdetails[PartnerdetailsID - 1];
    // console.log(PartnerdetailsID);
    // console.log(aadhar_no);

    setValues({
      aadharno: aadhar_no,
      panno: Pan_no,
      gstno: GST_no,
      Accno: Account_no,
      Acctype: Account_type,
      IFSCcode: IFSC_code,
    });
    setEditformPopup(!EditformPopup);
    setFileErrorMessage("");
    setUploadMessage("");
  };
  const toggleinactive = async (partnerId) => {
    const userreply = confirm("Are you sure to Inactive this partner ?");
    if (userreply){
      try {
        await axios.put("http://localhost:8081/updatepartner",{
          partner_id: partnerId,
          status: 0,
        });
        const updatedPartners = Partnerdta.map((partner) =>
          partner.id === partnerId ? {...partner, status: 0 } : partner
        );
        setPartnerdta(updatedPartners);
        await axios.put("http://localhost:8081/runAll");
        const response = await axios.get("http://localhost:8081/getpartnerdta");
        setPartnerdta(response.data);
        console.log(
          "partner data update after runall query>----------",
          response.data
        );
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

  const submitbusinessdeatil = async () => {
    const newaadhar = values.aadharno;
    const newpanno = values.panno;
    const newgstno = values.gstno;
    const newpartnerid = PartnerdetailsID;
    console.log(newpartnerid);
    const data = {
      aadharno: newaadhar,
      panno: newpanno,
      gstno: newgstno,
      partner_id: newpartnerid,
    };
    try {
      const response = await axios.put(
        "http://localhost:8081/update/business/details",
        data
      );
      console.log("Data sent successfully:", response.data);
      setUploadMessage(" UPDATE successfully.");
      // Refetch the partner details
      const response2 = await axios.get(
        "http://localhost:8081/getpartneralldeatils"
      );
      setPartnerdetails(response2.data);
    } catch (error) {
      console.error("Error sending data or fetching details:", error);
    }
  };
  const submitBankInof = async () => {
    const newAccountNo = values.Accno;
    const newAccounttype = values.Acctype;
    const newIFSCcode = values.IFSCcode;
    const newpartnerid = PartnerdetailsID;

    const data = {
      accno: newAccountNo,
      acctype: newAccounttype,
      ifsccode: newIFSCcode,
      partner_id: newpartnerid,
    };
    console.log(data);

    try {
      const response = await axios.put(
        "http://localhost:8081/update/Bank/Info",
        data
      );
      console.log("Data sent successfully:", response.data);
      setUploadMessage(" UPDATE successfully.");

      // Refetch the partner details
      const response2 = await axios.get(
        "http://localhost:8081/getpartneralldeatils"
      );
      setPartnerdetails(response2.data);
    } catch (error) {
      console.error("Error sending data or fetching details:", error);
    }
  };

  const handleDetailChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // -----------------File upload------------------->
  // const handleFileChange = (e, imageType) => {
  //     const file = e.target.files[0];
  //     const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
  //     setimageType(imageType)
  //     setUploadMessage("");
  //     if (file && validImageTypes.includes(file.type)) {
  //         setSelectedFile(file);
  //         console.log(file)
  //         setFileErrorMessage("");
  //       } else {
  //           setFileErrorMessage(
  //               "Please select a valid image format (JPEG, PNG, GIF)."
  //             );
  //             setSelectedFile(null);
  //           }
  //         };
  // -------------------------------------------------File upload------------------->
  const handleFileChange = (e, imageType) => {
    const files = e.target.files;
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    let validFiles = [];
    setimageType(imageType);
    setUploadMessage("");
    for (let i = 0; i < files.length; i++) {
      if (validImageTypes.includes(files[i].type)) {
        validFiles.push(files[i]);
        console.log(validFiles);
      } else {
        setFileErrorMessage(
          "Please select a valid image format (JPEG, PNG, GIF)."
        );
      }
    }
    if (validFiles.length > 0) {
      setSelectedFile(validFiles);
      console.log(validFiles);
      setFileErrorMessage("");
    } else {
      setSelectedFile([]);
    }
  };

  // ---------------------------------------------------------------------------->
  // const toggleImgPopup = (imageType, imageUrl = null) => {
  //   setimageType(imageType);
  //   // console.log(imageType);
  //   // console.log(imageUrl);
  //   setShowImagePopup(!showImagePopup);
  //   if(typeof imageUrl === "string" && imageUrl.trim() !== ""){
  //     const imageName = imageUrl.split("\\").pop();
  //     setSelectedImage(`http://localhost:8081/upload/${imageName}`);
  //   } else {
  //     setSelectedImage(null);
  //   }
  // };
  // ---------------------------------------------------------------------------->
  const toggleImgPopup = (imageType, imageUrl = null) => {
    setimageType(imageType);
    setShowImagePopup(!showImagePopup);

    if (typeof imageUrl === "string" && imageUrl.trim() !== "") {
      const baseUrl = "http://localhost:8081/upload/";
      const imageUrls = imageUrl
        .split(",")
        .map((image) => `${baseUrl}${image.split("\\").pop()}`);
      setSelectedImage(imageUrls);
    } else {
      setSelectedImage([]);
    }
  };
  const handleFileUpload = async (uploadType) => {
    if (!selectedFile || imageType !== uploadType) {
      setUploadMessage("Please select a valid file to upload.");
      return;
    }
    console.log(selectedFile);
    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append("images", selectedFile[i]);
    }
    // formData.append("images", selectedFile);
    formData.append("partner_id", PartnerdetailsID);
    formData.append("imageType", imageType);

    setProgreessbar((PrevState) => {
      return { ...PrevState, started: true };
    });
    try {
      const res = await axios.post(
        "http://localhost:8081/uploadimg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log("Ppppppppppp", progress); // 0 to 100 percentage %
            setProgreessbar((prevState) => ({
              ...prevState,
              pc: progress,
            }));
          },
        }
      );
      setUploadMessage("File uploaded successfully.");
      // Refresh partner details after successful upload
      const response2 = await axios.get(
        "http://localhost:8081/getpartneralldeatils"
      );
      setPartnerdetails(response2.data);
      // console.log(response2.data);
      // Toggle image popup with updated image
      const imageName = res.data.fileName;
      toggleImgPopup(imageType, `http://localhost:8081/upload/${imageName}`);
      setShowImagePopup(showImagePopup);
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
        // console.log(response.data);
        const response1 = await axios.get(
          `http://localhost:8081/getpartneralldeatils`
        );
        setPartnerdetails(response1.data);
        // console.log(response1.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setUploadMessage("");
  };
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
                          {Partnerdetails.filter(
                            (data) => data.id === index + 1
                          ).map((dataa, index) => (
                            <React.Fragment key={index}>
                              <tr>
                                <td>Aadhar no: {dataa.aadhar_no}</td>
                                <button
                                  onClick={() =>
                                    toggleImgPopup(
                                      "Aadhar_img",
                                      dataa.Aadhar_img
                                    )
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
                                    toggleImgPopup("Pan_img", dataa.Pan_img)
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
                                    toggleImgPopup("GST_img", dataa.GST_img)
                                  }
                                >
                                  View
                                </button>
                                <td>IFSC Code: {dataa.IFSC_code}</td>
                              </tr>
                              <tr>
                                <td></td>

                                <td></td>
                                <td>
                                  Cancel Check :
                                  <button
                                    onClick={() =>
                                      toggleImgPopup(
                                        "Cancel_check",
                                        dataa.Cancel_check
                                      )
                                    }
                                  >
                                    View{" "}
                                  </button>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
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
          <div className="imagepopup-form">
            <div className="IMGpopup-inner">
              <button className="close-btn" onClick={toggleImgPopup}>
                X
              </button>
              <div className="radio_cross_cont">
                {selectedImage && selectedImage.length > 0 && (
                  // <div>
                  //   <img
                  //     src={selectedImage}
                  //     alt="Cancel Check"
                  //     style={{ width: "250px" }}
                  //   />
                  // </div>
                  <Carousel
                    className="carousel-container"
                    showThumbs={false}
                    dynamicHeight={true}
                  >
                    {selectedImage.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          style={{ width: "250px" }}
                        />
                      </div>
                    ))}
                  </Carousel>
                )}
                {console.log(selectedImage)}
              </div>
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
              <div>
                <div>
                  <button onClick={() => handleSectionChange("business")}>
                    Business Details
                  </button>
                  <button onClick={() => handleSectionChange("bank")}>
                    Bank Info
                  </button>
                  <button onClick={() => handleSectionChange("kyc")}>
                    KYC Details
                  </button>
                </div>
                <br />
                {selectedSection === "business" && (
                  <div>
                    <label htmlFor="aadharno">Aadhar no:</label>
                    <input
                      type="text"
                      name="aadharno"
                      value={values.aadharno}
                      onChange={handleDetailChange}
                    />
                    <hr />
                    <br />
                    <label htmlFor="panno">Pan no :</label>
                    <input
                      type="text"
                      name="panno"
                      value={values.panno}
                      onChange={handleDetailChange}
                    />
                    <hr />
                    <label htmlFor="gstno">GST no :</label>
                    <input
                      type="text"
                      name="gstno"
                      value={values.gstno}
                      onChange={handleDetailChange}
                    />
                    <hr />
                    <button onClick={submitbusinessdeatil}>Submit</button>
                  </div>
                )}
                {selectedSection === "kyc" && (
                  <div>
                    <label htmlFor="Accno">Account no:</label>
                    <input
                      type="text"
                      name="Accno"
                      value={values.Accno}
                      onChange={handleDetailChange}
                    />
                    <hr />
                    <br />
                    <label htmlFor="Acctype">Account type:</label>
                    <select
                      name="Acctype"
                      value={values.Acctype}
                      onChange={handleDetailChange}
                    >
                      <option value="Saving Account">Saving Account</option>
                      <option value="Current Account">Current Account</option>
                    </select>
                    <hr />
                    <label htmlFor="IFSCcode">IFSC code</label>
                    <input
                      type="text"
                      name="IFSCcode"
                      value={values.IFSCcode}
                      onChange={handleDetailChange}
                    />
                    <hr />
                    <button onClick={submitBankInof}>Submit</button>
                  </div>
                )}

                {selectedSection === "bank" && (
                  <div>
                    {Partnerdetails.filter(
                      (data) => data.id === PartnerdetailsID
                    ).map((dataa, index) => (
                      <React.Fragment key={index}>
                        <label htmlFor="aadharimg">
                          Aadhar img :&nbsp;{" "}
                          {dataa.Aadhar_img || "No file chosen"}{" "}
                          <span>EDIT</span>{" "}
                        </label>

                        <input
                          className="hiddeninput"
                          type="file"
                          id="aadharimg"
                          multiple
                          onChange={(e) => handleFileChange(e, "Aadhar_img")}
                        />
                        <button
                          onClick={() =>
                            toggleImgPopup("Aadhar_img", dataa.Aadhar_img)
                          }
                        >
                          view
                        </button>
                        <button onClick={() => handleFileUpload("Aadhar_img")}>
                          Upload
                        </button>
                        {Progreessbar.started && Progreessbar.pc < 100 && (
                          <>
                            <progress
                              max="100"
                              value={Progreessbar.pc}
                            ></progress>
                            {`${Progreessbar.pc}%`}
                          </>
                        )}

                        <hr />
                        <br />
                        <label htmlFor="Pan_img">
                          Pan image : {dataa.Pan_img || "No file chosen"} &nbsp;
                          <span>EDIT</span>{" "}
                        </label>
                        <input
                          className="hiddeninput"
                          type="file"
                          id="Pan_img"
                          multiple
                          onChange={(e) => handleFileChange(e,"Pan_img")}
                        />
                        <button
                          onClick={() =>
                            toggleImgPopup("Pan_img", dataa.Pan_img)
                          }
                        >
                          view
                        </button>
                        <button onClick={() => handleFileUpload("Pan_img")}>
                          Upload
                        </button>
                        <hr />
                        <label htmlFor="GST_img">
                          GST image :{dataa.GST_img || "No file chosen"}&nbsp;{" "}
                          <span>EDIT</span>{" "}
                        </label>
                        <input
                          className="hiddeninput"
                          type="file"
                          id="GST_img"
                          multiple
                          onChange={(e) => handleFileChange(e, "GST_img")}
                        />
                        <button
                          onClick={() =>
                            toggleImgPopup("GST_img", dataa.GST_img)
                          }
                        >
                          view
                        </button>
                        <button onClick={() => handleFileUpload("GST_img")}>
                          Upload
                        </button>
                        <hr />
                        <label htmlFor="Cancel_check">
                          cancl check:{dataa.Cancel_check || "No file chosen"}{" "}
                          &nbsp;<span>EDIT</span>{" "}
                        </label>
                        <input
                          className="hiddeninput"
                          type="file"
                          id="Cancel_check"
                          onChange={(e) => handleFileChange(e, "Cancel_check")}
                        />
                        <button
                          onClick={() =>
                            toggleImgPopup("Cancel_check", dataa.Cancel_check)
                          }
                        >
                          view
                        </button>
                        <button
                          onClick={() => handleFileUpload("Cancel_check")}
                        >
                          Upload
                        </button>
                        <hr />
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
              {uploadMessage && <p>{uploadMessage}</p>}
              {fileErrorMessage && (
                <p style={{ color: "red" }}>{fileErrorMessage}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Calculators;
