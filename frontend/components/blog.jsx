import React from "react";
import "./blog.css";

const blog = () => {
  return (
    <>
      <div className="blogcontainer">
        <div className="leftblogcontainer">
          <img
            width={"506px"}
            src="https://ambak.com/blog/wp-content/uploads/2024/02/FutureOfHomeLoans_India.png"
            alt=""
          />
          <h1>
            The Future of Home Finance in India | The <br /> Opportunities that
            Lie Ahead
          </h1>
          <span>Rameshwar Gupta |</span> <span>3 min</span>
        </div>

        <div className="rightblogcontainer">
                  
         <div className="rightblogcontainerrecent">
          Recent Articles
         </div>

         <div>
          <div className="rightsidediv">
            <span>NEWS AND INSIGHTS</span>
            <img src="https://ambak.com/blog/wp-content/themes/mytheme/images/time.png" alt="" />
            <span>3 Min</span>
          </div>
          <div>
          The Future of Home Finance in India | The Opportunities that Lie Ahead
          </div>
          <div>
            <div>Rameshwergupta</div>
            <div></div>
          </div>
         </div>

        </div>
      </div>
    </>
  );
};

export default blog;
