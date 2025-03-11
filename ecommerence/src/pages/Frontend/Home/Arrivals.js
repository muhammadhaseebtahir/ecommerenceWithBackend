import React, { useEffect, useState } from 'react';
import Card from '../../../components/card';
import { dresses } from '../../../components/assest/cardImages/index';

export default function Arrivals() {
  
  const [collectionType, setCollectionType] = useState("Women's Cloth");
  const [filteredDresses, setFilteredDresses] = useState([]);
const [viewMoreProduct,setViewMoreProduct]= useState(6)

  
console.log("dress",filteredDresses);

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
          <button className='btn shadow px-3 collectionBtn' onClick={() => setCollectionType("Women's Cloth")}>Women's Collection</button>
          <button className='btn shadow px-3 collectionBtn' onClick={() => setCollectionType("Men's Accessories")}>Men's Accessories</button>
          <button className='btn shadow px-3 my-2 my-md-0 collectionBtn' onClick={() => setCollectionType("Women's Accessories")}>Women Accessories</button>
          <button className='btn shadow px-3 my-2 my-lg-0 collectionBtn' onClick={() => setCollectionType("Discount Deals")}>Discount Deals</button>
        </div>
        <div className="newArrivalsCard">
        <div className="cardSection d-flex justify-content-around flex-wrap gap-3 mt-5">
        {filteredDresses.length > 0 ? (
          filteredDresses.slice(0,viewMoreProduct).map((item, i) => (
            <Card key={i} item={item} />
          ))
        ) : (
          <h5 className="text-center text-danger">No Products Available</h5>
        )}
       
      </div>
      { viewMoreProduct < filteredDresses.length?(
                 <div className=" text-center my-3">
                 <button
                   className="btn btn-dark shadow px-3 rounded-5 "
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
          className='btn btn-dark px-4 shadow rounded-5'     
            
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
    </div>
  );
}
