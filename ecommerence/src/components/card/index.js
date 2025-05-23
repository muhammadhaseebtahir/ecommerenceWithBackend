import React from 'react';
import { Rate, Space } from 'antd';

export default function Card({ item,onClick }) {
  return (
    <div className='card shadow p-2 mainBoxOfCard' onClick={onClick} >
      <div className="cardTopImage rounded-1" style={{ overflow: "hidden" }}>
        <img
          src={item.imageUrl[0]}
          alt="Product"
          className='imageCard w-100 h-100'
          style={{ objectFit: "cover", backgroundSize: "cover", objectPosition: "top" }}
        />
      </div>
      <div className="cardBody p-2">
        <Space size="middle" style={{ fontSize: "13px" }}>
          <span className='fw-bold'>{item.productName}</span>
          <span style={{ color: "red", float: "end" }}>
            <Rate style={{ fontSize: "12px" }} allowHalf defaultValue={4.5} />
          </span>
        </Space><br/>
        <p style={{fontSize:"12px"}}>{item.brandName}</p>
        <span style={{ fontSize: "12px" }}>{item.price}$</span>
        <span style={{ color: "red", float: "right", fontSize: "12px" }}>Almost Sold out</span>
      </div>
    </div>
  );
}
