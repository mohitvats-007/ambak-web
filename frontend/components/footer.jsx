import React from 'react'
import "./footer.css";
const footer = () => {
  return (
    <>
    <div className='footer'>
            <div className='footer_data'>
                <div className='licontain1'>
                    <div className='lis_infoooter '>
                    <div> <img src="https://storage.googleapis.com/ambak/logo/ambak_logo_white.svg" width={'202px'} alt="ambak image" /></div>
                    <div>
                        <ul className='sociallinks'>
                            <li><img src="https://ci3.googleusercontent.com/mail-sig/AIorK4xSv-h7oO1Ed44E9gjFnC_GcBGYaZ-87Rac2ozCexb62wxrM0IZfOC0Vh0mIwFgFCXTelcyAg8" width={'30px'} alt="a" /></li>
                            <li><img src="https://ci3.googleusercontent.com/mail-sig/AIorK4wh17UsbHaAdKESK_aDsw9mxSBCjYAoaCqNMbR7fWqAZIbuVNe9V2T1xseYmx18VGGsZ5jlh7U" width={'30px'} alt="a" /></li>
                            <li><img src="https://ci3.googleusercontent.com/mail-sig/AIorK4wzbTmMt3ZRcaopcWFz5H9_lEXPXx7Ytl1stQ-49mCG_88MgScIFqZsDA63BUYh9Kk-VLutvAE" width={'30px'} alt="a" /></li>
                            <li><img src="https://ci3.googleusercontent.com/mail-sig/AIorK4we4kDPB3fXLe3NusrE8z94bZyUpd0If6qwcu6gGtv9A7-WZrQKURPQbptNFo-Zke_V51QZ03s" width={'30px'} alt="a" /></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className='lis_infoooter licontain2'>
                    <ul>
                        <li className='Litextbig'>Quick links</li>
                        <li>Home</li>
                        <li>Blogs</li>
                        <li>EMI Calculator</li>
                    </ul>
                </div>                
                <div className='lis_infoooter'>
                    <ul>
                        <li  className='Litextbig'>Other</li>
                        <li>Term and Conditions</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className='lis_infoooter'>
                    <ul>
                        <li  className='Litextbig'>Find Us</li>
                        <li>Contact Us</li>
                        <li>Feedbak</li>
                    </ul>
                </div>
            </div>
            {/* <div className='googleplaybuttons'>
                <li><img className='googleplaybuttonimg' src="https://ambak.com/image/googleplay.svg" width={"160px"} alt="" /></li>
                <li><img  className='googleplaybuttonimg' src="https://ambak.com/image/appstore.svg" width={"160px"}  alt="" /></li>
            </div> */}
    </div>
    <div className='copyright'>
        <div className='copyrighttext'>
                Copyright © 2024 TENB FINTECH PRIVATE LIMITED All rights reserved
        </div>
    </div>
    </>
  )
}

export default footer
