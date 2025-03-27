import React from 'react'


import {Button, Image,Space, Empty, Input} from "antd"
import { DeleteOutlined, MinusOutlined, PlusOutlined ,TagOutlined,ArrowRightOutlined} from "@ant-design/icons";

import {dresses} from "../../../components/assest/cardImages/index"
 

export default function Order() {



  // const totalPrice = dresses.slice(0,4).reduce((acc, item) => {return acc + item.price}, 0);
//  console.log("totalPrice",totalPrice);

let totalPrice = (dresses?.slice(0, 2) || []).reduce(
  (acc, item) => acc + parseFloat(item.price.replace("$", "") || 0),
  0
);

totalPrice= totalPrice.toFixed(2);
 
 
  return (
    <div className='container px-0'>
      <h1 className="p-4" style={{ fontWeight: "900" }}>
        YOUR CART
      </h1>
            <div className="d-flex flex-wrap  justify-content-between flex-column flex-md-row gap-5"  >
          <div className="cartProduct border p-3 rounded-5" style={{flex:"40%"}}>
            {dresses.length>0 ?(
          
            dresses.slice(0,2).map((item,i)=>(
              <div  key={i}>
              <div className="d-flex p-2"
              style={{ outline: "none", border: "none" }}>
                 <Image
                  src={item.urlImage}
                  width={130}
                  height={100}
                  className="rounded-3"
                  style={{objectFit:"cover",objectPosition:"top"}}
                
                />
                <div className="productData d-flex justify-content-between w-100">
                <div className="leftSide py-1 px-3">
                    <p className="mb-0 fw-bold " style={{ fontSize: "14px" }}>
                      {item.name}
                    </p>
                    {/* <p
                      className="mb-0"
                      style={{ fontSize: "12px", color: "#ced4da" }}
                    >
                      {" "}
                      <span style={{ color: "#6c757d" }}>Size:</span>{" "}
                      {item.selectedSize}{" "}
                    </p> */}
                    {/* <p style={{ fontSize: "12px", color: "#ced4da" }}>
                      {" "}
                      <span style={{ color: "#6c757d" }}>Color:</span>{" "}
                      {item.selectedColor}{" "}
                    </p> */}
                    <p className="mb-0 fw-bold" style={{ fontSize: "15px" }}>
                      {item.price}
                    </p>
                  </div>
                  <div className="rightSide  d-flex flex-end flex-column justify-content-between">
                    <Button
                      style={{ color: "red", border: "none", fontSize: "18px" }}
                      // onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteOutlined />
                    </Button>
                    <Space.Compact>
                      <Button
                        // onClick={() => {
                        //   quantity <= 1
                        //     ? setQuantity(1)
                        //     : setQuantity(quantity - 1);
                        // }}
                        icon={<MinusOutlined />}
                      />
                      <Button>1</Button>
                      <Button
                        // onClick={() => {
                        //   setQuantity(quantity + 1);
                        // }}
                        icon={<PlusOutlined />}
                      />
                    </Space.Compact>
                  </div>
                </div>
              </div>
                  <hr />
                  </div>
            ))
          ):( <Empty description={"No items in cart"} />)}
          </div>
          <div className="AmountBox border p-5 rounded-5" style={{flex:"40%"}}>
                  <h5>Order Sumery</h5>
                  {dresses.slice(0,2).map((item, index) => (
        <div className="subTotal d-flex justify-content-between" key={index}>
          <p style={{ color: "#adb5bd" }}>{item.name}:</p>
          <p>{item.price }</p>
        </div>
      ))}
      <hr />
      <div className="subTotal d-flex justify-content-between">
        <p>Total:</p>
        <p>${totalPrice}</p>
      </div>
      <div className="d-flex">
      <Input
          type="text"
          prefix={<TagOutlined />}
          className="bg-light rounded-5"
          placeholder="Add promo code"
        />
        <button className='btn btn-dark rounded-5 px-3 ms-2'>Apply</button>

              </div>  
              <div className="text-center mt-3">
        <button className='btn btn-dark rounded-5 px-5 '>Go to Checkout <ArrowRightOutlined /></button>
                
                </div>  
          </div>
         </div>



    </div>
  )
}
