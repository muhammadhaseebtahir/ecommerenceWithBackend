import React, { useEffect, useRef, useState } from 'react'
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {Carousel,Space} from "antd"
import { LeftCircleOutlined,RightCircleOutlined} from "@ant-design/icons";


// ********IMages *******
import dress1 from "../../../components/assest/img/dress1.jpeg"
import dress2 from "../../../components/assest/img/dress2.jpeg"
import dress3 from "../../../components/assest/img/dress3.jpeg"
import dress4 from "../../../components/assest/img/dress4.jpeg"
import dress5 from "../../../components/assest/img/dress5.jpeg"
import dress6 from "../../../components/assest/img/dress6.jpeg"
import dress7 from "../../../components/assest/img/dress7.jpeg"

const dress=[
  {
    imageUrl:dress1
  },
  {
    imageUrl:dress2
  
  },
  {
    imageUrl:dress3
  },
  {
    imageUrl:dress4
  },
  {
    imageUrl:dress5
  },
  {
    imageUrl:dress6
  },
  {
    imageUrl:dress7
  }
]


dayjs.extend(duration);
export default function DealOfTheMonth() {

  const carouselRef = useRef(null);
  const handleNext = () => {
    carouselRef.current.next();
  };
  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

   // Set target time (2 days from now)
   const targetTime = dayjs().add(5, "day");

   const CalculateTimeLeft = () => {
     const now = dayjs();
     const diff = dayjs.duration(targetTime.diff(now));
 
     return {
       days: diff.days(),
       hours: diff.hours(),
       minutes: diff.minutes(),
       seconds: diff.seconds(),
     };
   };
 
   const [timeLeft, setTimeLeft] = useState(CalculateTimeLeft());
 
   useEffect(() => {
     const timer = setInterval(() => {
       setTimeLeft(CalculateTimeLeft());
     }, 1000);
 
     return () => clearInterval(timer);
   }, []);
  return (
    <div className='container bg-primary '>
      <div className="row mt-4  px-0" style={{background:"linear-gradient(to top, #e9ecef, #FFFFFF)"}}>
        <div className="col-12 col-md-5  p-xm-4 p-md-4  p-lg-5  " style={{height:"450px"}}>
            <p className='dealOfTheMonth' >Deals Of The Month </p>
             <p  className='dealOfTheText'>Exclusive Deals of the Month! Shop now and enjoy massive discounts on your favorite products. Hurry, offers end soon! Big Savings, Bigger Smiles! This month’s top deals are here. Get up to 50% OFF on selected items. Grab yours before it’s gone! </p>
            <button className='btn btn-dark px-5 '>Buy Now</button>
               <h5 className='pt-3 mb-0'>Hurry, Before It’s Too Late!</h5>
               <div className="d-flex justify-content-center align-items-center gap-3 p-4">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hr", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Sec", value: timeLeft.seconds },
      ].map((item, index) => (
        <div
          key={index}
          className="text-center p-1 rounded shadow"
          style={{
            width: "80px",
            background: "#fff",
            boxShadow: "6px 6px 12px #d1d9e6, -6px -6px 12px #ffffff",
          }}
        >
          <h4 className="fw-bold mb-1">{String(item.value).padStart(2, "0")}</h4>
          <small className="text-muted">{item.label}</small>
        </div>
      ))}
    </div>
    <div className="icon text-end">

<Space>
            <LeftCircleOutlined
              className="next-prve fs-4 rounded-circle"
              onClick={handlePrev}
              />
            <RightCircleOutlined
              className="next-prve fs-4 rounded-circle"
              onClick={handleNext}
              />
          </Space>
              </div>
        </div>
        <div className="col-12 col-md-7 px-0" style={{ height: "450px" }}>
  <Carousel {...carouselSettings} ref={carouselRef}>
    {dress.map((item, i) => (
      <div 
        className="dealOfTheDress bg-success" 
        key={i}        
      >
        <img 
          src={item.imageUrl} 
          alt="Dress" 
          className="dress" 
        />
      </div>
    ))}
  </Carousel>
</div>

      </div>
     
    </div>
  )
}
