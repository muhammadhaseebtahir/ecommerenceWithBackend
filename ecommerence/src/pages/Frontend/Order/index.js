import React, { useEffect, useState } from 'react'


import {Button, Image,Space, Empty, Input, message,Modal} from "antd"
import { DeleteOutlined, MinusOutlined, PlusOutlined ,TagOutlined,ArrowRightOutlined} from "@ant-design/icons";

// import {dresses} from "../../../components/assest/cardImages/index"
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
 

export default function Order() {
    const [cartData,setCartData] = useState([])
    const navigate =useNavigate()
   useEffect( ()=>{
    const fectCart= async()=>{ 
    try{
          const res = await axios.get("https://ecommerence-backend-9kv6.vercel.app/cart/getCart",{
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          // console.log("res",res.data.cart)
          setCartData(res.data.cart.items)

        }catch(err){
          console.log("err",err)
        }}
        fectCart()
   },[])



 const handleDeleteProduct=async(product_id)=>{
Modal.confirm({
  title: "Are you sure to delete this product?",
  okText: "Delete",
  cancelText: "Cancel",
  onOk: async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/cart/removeFromCart/${product_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (res.status === 200) {
        setCartData(prevData => prevData.filter(item => item.product_id !== product_id));
        message.success(res.data.message);
      }
      if (res.status === 404) {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log("err", err);
      message.error("Error deleting product");
    }
  }
})


   


 }




  let totalPrice = cartData.reduce((acc, item) => {return acc + item.price}, 0);

  totalPrice = totalPrice.toFixed(2)






 
  return (
    <div className='container px-0'>
      <h1 className="p-4" style={{ fontWeight: "900" }}>
        YOUR CART
      </h1>
            <div className="d-flex flex-wrap  justify-content-between flex-column flex-md-row gap-5"  >
          <div className="cartProduct border p-3 rounded-5" style={{flex:"40%"}}>
            {cartData.length>0 ?(
          
          cartData.map((item,i)=>(
              <div  key={i}>
              <div className="d-flex p-2"
              style={{ outline: "none", border: "none" }}>
                 <Image
                  src={item.imageUrl[0]}
                  alt="product"
                  preview={false}
                  width={130}
                  height={100}
                  className="rounded-3"
                  style={{objectFit:"cover",objectPosition:"top"}}
                
                />
                <div className="productData d-flex justify-content-between w-100">
                <div className="leftSide py-1 px-3">
                    <p className="mb-0 fw-bold " style={{ fontSize: "14px" }}>
                      {item.productName}
                    </p>
                    <p
                      className="mb-0"
                      style={{ fontSize: "12px", color: "#ced4da" }}
                    >
                      {" "}
                      <span style={{ color: "#6c757d" }}>Size:</span>{" "}
                      {item.size}{" "}
                    </p>
                    <p style={{ fontSize: "12px", color: "#ced4da" }}>
                      {" "}
                      <span style={{ color: "#6c757d" }}>Color:</span>{" "}
                      {item.color}{" "}
                    </p>
                    <p className="mb-0 fw-bold" style={{ fontSize: "15px" }}>
                      ${item.price}
                    </p>
                  </div>
                  <div className="rightSide  d-flex flex-end flex-column justify-content-between">
                    <Button
                      style={{ color: "red", border: "none", fontSize: "18px" }}
                      onClick={() => handleDeleteProduct(item.product_id)}
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
                  {cartData.length>0  ?(
                  cartData.map((item, index) => (
        <div className="subTotal d-flex justify-content-between" key={index}>
          <p style={{ color: "#adb5bd" }}>{item.productName}:</p>
          <p>{item.price }</p>
        </div>
      ))):
      (  <Empty description={"No items in cart"} />)
      }
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
        <button className='btn btn-dark rounded-5 px-5 ' onClick={()=>navigate("/CheckoutForm")}>Go to Checkout <ArrowRightOutlined /></button>
                
                </div>  
          </div>
         </div>



    </div>
  )
}
