import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ProductDeatils() {
    const loaction = useLocation()
    const {item} = loaction.state
  return (
    <div className='container'>
       
    <div className="productDetail d-flex bg-success flex-wrap">
        <div className="verticalImages d-flex flex-md-row flex-lg-column justify-content-around">
          <div className="verticalImage1" style={{width:"210px",height:"210px"}}>
            <img src={item.urlImage} alt="product Details"  className='w-100 h-100 imageStyle' />
          </div>
          <div className="verticalImage1"  style={{width:"210px",height:"210px"}}>
            <img src={item.urlImage} alt="product Details" className='w-100 h-100 imageStyle'/>
          </div>
          <div className="verticalImage1" style={{width:"210px",height:"210px"}}>
            <img src={item.urlImage} alt="product Details" className='w-100 h-100 imageStyle'/>
          </div>

        </div>
        <div className="horizantelImage">
        <img
            src={item.urlImage}
            className="imagehorizantel"
            alt="product Details"
          />
        </div>
        
    </div>



    </div>
  )
}
