import React, { useEffect, useState } from 'react';
import Card from '../../../components/card';
import { dresses } from '../../../components/assest/cardImages/index';

import 'remixicon/fonts/remixicon.css'

import peakyBlinder from "../../../components/assest/img/peakyBlinder.png"
import { useNavigate } from 'react-router-dom';

export default function Arrivals() {
  const navigte =useNavigate()
  const [collectionType, setCollectionType] = useState("Women's Cloth");
  const [filteredDresses, setFilteredDresses] = useState([]);
const [viewMoreProduct,setViewMoreProduct]= useState(6)

  
// console.log("dress",filteredDresses);

  useEffect(() => {
    
    const filtered = dresses.filter((item) => item.type === collectionType);
    setFilteredDresses(filtered);
  }, [collectionType]);

  return (
    <div className="container">
      <div className="newArrivals mt-5">
        <h1 className='text-center fw-bold' style={{ fontFamily: "Times New Roman" }}>New Arrivals</h1>
        <p className='text-center pt-2' style={{ fontSize: "13px", color: "#6c757d" }}>
          New Trends, New You! Stay ahead of the fashion game with our newest arrivals.<br />
          From chic outfits to everyday essentials, discover fresh styles made just for you.
        </p>
        <div className="collectionButton mt-5 d-flex justify-content-around flex-wrap align-items-center">
          <button className='btn shadow px-3 collectionBtn' onClick={() => setCollectionType("Men's Cloth")}>Men's Collection</button>
          <button className='btn shadow px-3 collectionBtn ' onClick={() => setCollectionType("Women's Cloth")}>Women's Collection</button>
          <button className='btn shadow px-3 collectionBtn' onClick={() => setCollectionType("Men's Accessories")}>Men's Accessories</button>
          <button className='btn shadow px-3 my-2 my-md-0 collectionBtn' onClick={() => setCollectionType("Women's Accessories")}>Women Accessories</button>
          <button className='btn shadow px-3 my-2 my-lg-0 collectionBtn' onClick={() => setCollectionType("Discount Deals")}>Discount Deals</button>
        </div>
        <div className="newArrivalsCard">
        <div className="cardSection d-flex justify-content-around flex-wrap gap-3 mt-5">
        {filteredDresses.length > 0 ? (
          filteredDresses.slice(0,viewMoreProduct).map((item, i) => (
            <Card key={i} item={item} onClick={()=>{navigte(`shop/product/${item.id}`,{state:{item}})}} />
          ))
        ) : (
          <h5 className="text-center text-danger">No Products Available</h5>
        )}
       
      </div>
      { viewMoreProduct < filteredDresses.length?(
                 <div className=" text-center my-5">
                 <button
                   className="btn btn-dark shadow px-3"
                       onClick={() => {
                    setViewMoreProduct(viewMoreProduct + 3);
                   }}
                 >
                   View more
                 </button>
               </div>
        ):(
          <div className=" text-center my-3">
          <button
          className='btn btn-dark px-4 shadow '     
            
            onClick={() => {
              setViewMoreProduct(6);
            }}
          >
            View less
          </button>
        </div>
        )

        }
      </div>
      </div>
     <div className="row PeakyBlinder " style={{backgroundColor:"#ced4da"}} >
      <div className="col-12 col-md-7 px-0 leftPart  " style={{overflow:"hidden"}}>
           <img src={peakyBlinder} alt="peakyBlinder" className='h-100 w-100' />
      </div>
      <div className="col-12 col-md-5 RightPart p-4">
           <p style={{fontSize:"13px",color:"#6c757d"}}>Women Collection</p>
           <h2>Peaky Blinders</h2>
           <p style={{fontSize:"12px",textDecoration:"underline"}}>DESCRIPTION</p>
           <p style={{fontSize:"14px",color:"#6c757d"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Voluptates expedita fuga, sequi explicabo dolorum similique fugiat ipsum nam ratione perferendis delectus sunt,
             excepturi possimus quas deserunt amet, eum accusantium culpa.</p>
             <p style={{color:"#6c757d"}}>Size: <span className='bg-dark text-light px-2 ms-3 rounded-2'>M</span><span className='bg-dark text-light px-2 ms-3 rounded-2'>L</span><span className='bg-dark text-light px-2 ms-3 rounded-2'>XL</span></p>
                 <h3>$100.<span style={{fontSize:"18px"}}>00</span> </h3>
            <button className='btn btn-dark px-5 mt-3' >Buy now</button>
      </div>
     </div>
     <div className="highQuality  px-0 w-100 py-4 d-flex justify-content-around align-items-center flex-wrap mt-5 gap-5"  style={{boxShadowBottom:""}}>
      <p className=''><i className="ri-store-2-fill fs-4"></i> High Quality <br /> <span style={{fontSize:"14px",color:"#6c757d"}}>crafted from top material</span></p>
      <p className=''><i className="ri-gift-2-line fs-4"></i>  Warranty Protection<br /> <span  style={{fontSize:"14px",color:"#6c757d"}}>Over 2 year</span></p>
      <p className=''> <i className="ri-store-2-line fs-4"></i>Free Shipping <br /> <span style={{fontSize:"14px",color:"#6c757d"}}>oreder Over 150$</span></p>
      <p className=''><i className="ri-phone-fill fs-4"></i> 24 / 7 Support <br /> <span style={{fontSize:"14px",color:"#6c757d"}}>Dedicated Support</span></p>
          </div>



    </div>
  );
}
