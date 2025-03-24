import React from 'react'

import {dresses} from "../../../components/assest/cardImages/index"
 

export default function Order() {
  return (
    <div className='container px-0'>
      <h1 className="p-4" style={{ fontWeight: "900" }}>
        YOUR CART
      </h1>
   {/* <div className="d-flex justify-content-between flex-wrap  ">
    <div className="cartProduct p-3  border w-sm-100 w-md-50  rounded-5 mb-sm-3 mb-md-0">
        
        
    </div>
    <div className="AmountBox p-3  border w-100 w-md-50  rounded-5 mb-sm-3 mb-md-0">

    </div>

   </div> */}

         <div className="d-flex flex-wrap  justify-content-between gap-5 flex-column flex-md-row" >
          <div className="cartProduct border p-3 rounded-5" style={{flex:"40%"}}>
          
          </div>
          <div className="AmountBox border p-3 rounded-5" style={{flex:"40%"}}>

                  <h1>fksjdhfjskfshkg</h1>
                  <h1>fksjdhfjskfshkg</h1>
                  <h1>fksjdhfjskfshkg</h1>
                  <h1>fksjdhfjskfshkg</h1>
          </div>
         </div>



    </div>
  )
}
