import React from 'react'
import { Carousel } from 'antd';




// *****Images*************


import  leftHero from "../../../components/assest/img/leftHero.png"
import  righttHero from "../../../components/assest/img/rightHero.png"
import  centerTop from "../../../components/assest/img/centerTop.PNG"
import  centerBottom from "../../../components/assest/img/centerBottom.PNG"
// import  dress2 from "../../../components/assest/img/dress1.jpeg"





export default function Hero() {
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true, // Auto slide enable
    slidesToShow: 5, // Show 5 slides at a time
    slidesToScroll: 1, // Move 1 slide at a time
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
   <div className="container ">
    
    <div className="row mt-4" style={{minHeight:"95vh"}}>
    <div className="col-12 col-md-4 leftContainer px-0  d-flex align-items-end justify-content-center" style={{backgroundColor:"#E0E0E0",}}>
    <img src={leftHero} alt="Hero"  />
    </div>
    <div className="col-12 col-md-4 px-0 center-container my-3 my-md-0">
            <div className=" gap-3 gap-md-0 d-flex flex-column justify-content-between px-0 px-md-3 h-100">
              <div className=" bg-success centerTop " style={{backgroundColor:"#E0E0E0",borderRadius:"10px",objectFit:"cover",overflow:"hidden"}}>
                  <img src={centerTop} alt="centerTop" className='w-100 h-100'  style={{objectFit:"cover",backgroundSize:"cover"}}/>
                   </div>
              <div className=" px-0 text-center" style={{borderRadius:"10px"}}>
                <h1 className='centerText mb-0' >ULTIMATE</h1>
                <h1 className='centerTextSale mb-0' >SALE</h1>
                <p >NEW COLLECTION</p>
                  <button className='btn btn-dark shadow my-2 px-4' >SHOP NOW</button>
                   </div>
              <div className="bg-primary" style={{backgroundColor:"#E0E0E0",borderRadius:"10px",overflow:"hidden"}}>
                  <img src={centerBottom} alt="centerBottom" style={{width:"100%", objectFit:"cover",overflow:"hidden",borderRadius:"10px"}} />
                   </div>
            </div>    
    </div>
        <div className="col-12 col-md-4 px-0  rightContainer d-flex align-items-end justify-content-center" style={{backgroundColor:"#E0E0E0"}}>
        <img src={righttHero} alt="Hero" />    
        </div>     
      </div>
          
   </div>
   <div className="container-fluid shadow">
      <div className="container heroTextSlider px-0">
        <Carousel {...carouselSettings} className='text-center py-5 ' >
      <div>
        <h3 className="" style={{fontFamily:"fantasy"}}>CHANEL</h3>
      </div>
      <div>
        <h3 className=""  style={{fontFamily:"inherit"}}>LOUIS VIUTTON</h3>
      </div>
      <div>
        <h3 className="" style={{fontFamily:"serif"}}>PARADA</h3>
      </div>
      <div>
        <h3 style={{fontFamily:"cursive"}}>Calvin Klein</h3>
      </div>
      <div>
        <h3 style={{fontFamily:"Big Shoulders"}}>DENIM</h3>
      </div>
    </Carousel>
        </div>
           </div>           
   </>

  )
}
