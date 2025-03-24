import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image, Rate, Space, Button, Avatar, List,Empty  } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { dresses } from '../../../components/assest/cardImages/index';
import Card from "../../../components/card";
const initialReview = {
  review: "", rating: ""}
export default function ProductDeatils() {
      const navigate = useNavigate()
    const loacation = useLocation();
  const { item } = loacation.state;
  const [selectedSize, setSelectedSize] = useState(null);
  const [review, setReview] = useState(initialReview);
  // const [Isprocessing,setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Always scroll to top when route changes
  }, [location.pathname]);

  const handleChange = (e) => {
    setReview((s) => ({ ...s, [e.target.name]: e.target.value }));
    
    
  };

   const handleSubmit = (e)=>{
    e.preventDefault();
     
      setReview(initialReview)
   }



  

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  

  return (
    <div className="container px-0">
      <div className="productDetails mt-4 d-flex flex-wrap gap-2">
        <div className="verticalImages  d-flex flex-md-row flex-lg-column gap-2">
          <div className="verticalImage ">
            <Image
              src={item.urlImage}
              alt="Product Details"
              className="verticalImageSize"
            />
          </div>
          <div className="verticalImage">
            <Image
              src={item.urlImage}
              alt="Product Details"
              className="verticalImageSize"
            />
          </div>
          <div className="verticalImage">
            <Image
              src={item.urlImage}
              alt="Product Details"
              className="verticalImageSize"
            />
          </div>
        </div>
        <div
          className="horizontalImage  rounded-2"
          style={{ overflow: "hidden" }}
        >
          <Image
            src={item.urlImage}
            alt="Product Details"
            className="horizontalImageSize h-100 w-100"
            style={{ objectFit: "cover" ,height:"100%"}}
          />
        </div>
        <div className="productDetailsData p-3" style={{ flex: "25%" }}>
          <h3 style={{ fontWeight: "900", textShadow: "1px 1px 10px gray" }}>
            {item.name}
          </h3>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>{item.price}</p>
          <p style={{ fontSize: "13px", color: "#6c757d" }}>
            {item.description}
          </p>
          <Rate
            style={{ fontSize: "18px" }}
            allowHalf
            defaultValue={item.rating}
          />
          <hr style={{ color: "#adb5bd" }} />
          <p
            style={{ color: "#6c757d", fontSize: "14px", marginBottom: "5px" }}
          >
            Choose Size
          </p>
          <Space>
            {["Small", "Medium", "Large"].map((size, i) => (
              <button
                key={i}
                className={`btn selectSize  px-3 ${
                  selectedSize === size ? "active" : ""
                } `}
                onClick={() => setSelectedSize(size)}
              >
                {" "}
                {size}
              </button>
            ))}
          </Space>
          <hr style={{ color: "#adb5bd" }} />
          <Space className="p-0 p-md-3 d-flex flex-wrap">
            <Space.Compact>
              <Button className="p-3" icon={<MinusOutlined />} />
              <Button className="p-3">1</Button>
              <Button className="p-3" icon={<PlusOutlined />} />
            </Space.Compact>

            <button
              className="btn btn-dark  text-light px-4 px-md-5 " onClick={()=>alert("hello")} >
              Add to cart
            </button>
            
          </Space>

          
        </div>
      </div>

        <div className="reviewSection mt-3 p-2 border rounded-2">
          <p className="fw-bold p-3">All Reviews  {`(${data.length})`} </p>
          <form onSubmit={handleSubmit}>
         <button className="btn btn-primary float-end"  type="submit">Add Review</button>
          <input type="text" className="form-control my-3 " style={{border:"none",borderBottom:"1px solid gray"}} onChange={handleChange} name="review" value={review.review} placeholder="Write a review" />
         <input type="number" name="rating" value={review.rating} placeholder="Enter Rating"  className="form-control" style={{border:"none",borderBottom:"1px solid gray"}} onChange={handleChange}/>
          </form>
          
{data.length>0 ?(
          <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<p>{item.title}</p>}
          description={<>  <Rate style={{ fontSize: "15px" }} allowHalf defaultValue={3} />
            <p>Ant Design, a design language for background applications, is refined by Ant UED Team</p>
          </>}
        
        />
      </List.Item>
    )}
  />):( <Empty description={"No  review in the product"} />)}
          </div>

<div className="relativeProduct mt-4">
     <h1 className="ps-2">Relvent Products</h1>
    
     <div className="cardSection d-flex justify-content-around flex-wrap gap-3 mt-5"> 
      {dresses.slice(10,13).map((item, i) => (
            <Card key={i} item={item} onClick={()=>{
              if(loacation.pathname === `/shop/product/${item.randomId}`){
                navigate(`/shop/product/${item.id}`, { replace: true, state: { item } });
              }else {
                // Different route: navigate normally
                navigate(`/shop/product/${item.id}`, { state: { item } });
              }
            }} />
          ))

      }
     
     
      </div>
</div>


    </div>
  );
}
