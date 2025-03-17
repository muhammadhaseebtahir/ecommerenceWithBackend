import React from 'react'
import footerImage1 from "../assest/img/footerimage1.png"
import footerImage2 from "../assest/img/footerimage2.png"

export default function Footer() {
  return (
    <div className='container my-3'>
        <div className="subscribeBox p-5 d-flex justify-content-around align-items-center">
            <div className="leftImage" style={{height:"400px",width:"200px"}}>
            <img src={footerImage2} alt="FooterDress" className='h-100 w-100'  />

            </div>
            <div className="bodyText text-center">
        <h2>Subscribe To Our Newsletter</h2>
         <p style={{fontSize:"12px",color:"#adb5bd"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin </p>
        <p className='text-start' style={{color:"#adb5bd"}}>michael@ymail.com</p>
        <div className="subscribeButton p-5" style={{background:"linear-gradient(to top, #f8f9fa, #f8f9fa)"}}>
            <button className='btn btn-dark px-5'>Subscribe</button>
        </div>
         </div>
            <div className="leftImage" style={{height:"400px",width:"200px"}}>
            <img src={footerImage1} alt="FooterDress" className='h-100 w-100'  />

            </div>

        </div>
        <hr />
        <div className="footerBottom d-flex justify-content-between align-items-center">
            <div className="leftpart ps-5">
               <p style={{fontFamily:"Times New Roman"}} >FASCO</p>
            </div>
            <div className="rightPart">
                  <ul style={{listStyle:"none",gap:"20px", display:"flex" ,flexWrap:"wrap",color:"#adb5bd"}}>
                    <li>Support Center</li>
                    <li>Invocing</li>
                    <li>Contact</li>
                    <li>Careers</li>
                    <li>Blogs</li>
                    <li>FAQS</li>
                  </ul>
            </div>
        </div>
        <div className="lastFooter text-center ">
            <p className='mb-0' style={{fontSize:"13px",color:"#adb5bd"}}>Copyright © 2022 FASCO . All Rights Reseved.</p>
        </div>
      
    </div>
  )
}
