import React from 'react'
import './banemipage.css';

import { Link } from 'react-router-dom';
const Bankemipage = () => {
  return (
    <div>
      <div className="mainbnkemicontainer">
        <div className="bnkemicontainer">

       
        <div className="topcontainr">
        <div className='lefttop'>
            <div><img src="/src/images/left.svg" alt="" /></div>
            <div>Preferred Offers</div>
        </div>
        <div className='righttop'>
            <p>Recalculation based on tensure</p>
        </div>
        </div>
        <div className="midcontainer">
            <div className="midinnerTopcontainer">
                <div className="banimg">
                    <img src="/src/images/08/Group 1321318449.svg" alt="Ddfc bank image" />
                </div>
                <div className="amountsection">
                    <div className="amt">$10,50,2,600</div>
                    <div className="maxamt">Max Amount</div>
                </div>
                <div className="emiamtsection">
                        <div className="emiamt">$12,600*</div>
                        <div className="emibatch">EMI</div>
                </div>
                <div className="prcntsection">
                    <div className="prcntamt">8.45%</div>
                    <div className="roi">ROI</div>
                    <div className="onwards">*onwards</div>
                </div>
                <div className="aplybtnsection">
                      <Link to="/cpage/getoffers/banemipage/thankyou">  <button>Apply Now</button> </Link>
                </div>
            </div>
            <div className="midinnerbottomcontainer">
               <ul>
                <li>Processing Fees: 1% of loan amt + GST</li>
               </ul>
            </div>
        </div>
        <div className="lowercontainer">
            <p>*All offer dolor sit amet consectetur adipisicing elit. Qui, and approval. </p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Bankemipage
