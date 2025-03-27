import React, {  useState } from 'react'
import {Checkbox,Slider,Collapse,Empty} from "antd"
import { dresses } from '../../../../components/assest/cardImages/index';
import Card from '../../../../components/card';
import { useNavigate } from 'react-router-dom';
 

export default function Womens() {
  const navigate =useNavigate()

const [selectedCategories, setSelectedCategories] = useState([]);
const [selectedColors, setSelectedColors] = useState([]);
const [selectedSizes, setSelectedSizes] = useState([]);
const [priceRange, setPriceRange] = useState([0, 2000]);

console.log("selectedCategories",selectedCategories);
console.log("selectedColors",selectedColors);
console.log("selectedSizes",selectedSizes);
console.log("priceRange",priceRange);







  const categories =["Men", "Women", "Kids", "Bags", "Belts", "Wallets", "Watches", "Accessories", "Winter Wear"]
  
  const colors = [
    { name: "Red", count: 10, colorCode: "red" },
    { name: "Blue", count: 14, colorCode: "blue" },
    { name: "Orange", count: 8, colorCode: "orange" },
    { name: "Black", count: 9, colorCode: "black" },
    { name: "Green", count: 4, colorCode: "green" },
    { name: "Yellow", count: 2, colorCode: "yellow" },
  ];
  
  const sizes = ["XS", "S", "M", "L", "XL"];

  


  const items = [
    {
      key: "1",
      label: "Product Categories",
      children: categories.map((category, index) => (
        <div key={index} className='mb-1'>
          <Checkbox
           onChange={(e) => {
            const updatedCategories = e.target.checked 
            ?[...selectedCategories, category]
            :selectedCategories.filter((c) => c !== category)
            setSelectedCategories(updatedCategories)
            
          }}
          >
            {category}
          </Checkbox>
        </div>
      )),
    },
    {
      key: "2",
      label: "Filter by Price",
      children: (
        <>
          <Slider
            range
            min={0}
            max={2000}
            defaultValue={priceRange}
            onChange={(value) => setPriceRange(value)}
          />
          <p>Price: ${priceRange[0]} - ${priceRange[1]}</p>
        </>
      ),
    },
    {
      key: "3",
      label: "Filter by Color",
      children: colors.map((color, i) => (
        <div className="d-flex align-items-center gap-3 mb-2" key={i}>
          <Checkbox onChange={(e)=>{
            const updatedColors = e.target.checked
            ?[...selectedColors,color.name]
            :selectedColors.filter((c)=>c!==color.name)
            setSelectedColors(updatedColors)
          }} />
          <span
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: color.colorCode,
              display: "inline-block",
              borderRadius: "3px",
            }}
          ></span>
          {color.name} ({color.count})
        </div>
      )),
    },{
      key:"4",
      label:"Filter by Size",
      children:sizes.map((sizes,i)=>(
         <div key={i} className='mb-1'>
             <Checkbox onChange={(e)=>{
              const updatedSizes = e.target.checked
              ?[...selectedSizes,sizes]
              :selectedSizes.filter((s)=>s!==sizes)
              setSelectedSizes(updatedSizes)
             }}>
                {sizes}
             </Checkbox>

         </div>
      ))
    }
  ];
  return (
    <div className="container-fluid d-flex flex-column flex-wrap flex-md-row  px-0 ">
     
       <div className="leftSide border   p-4"  style={{ flex: "25%" }}>
        <Collapse defaultActiveKey={["1","2","3","4"]} items={items} style={{border:"none",backgroundColor:"transparent"}}>   </Collapse>


       </div>
       <div className="mainSide  p-4" style={{flex:"75%"}} >
       <div className="cardSection d-flex justify-content-around flex-wrap gap-3 mt-5">
          {dresses.length >0 ?(
            dresses.map((item,i)=>(
                          <Card key={i} item={item} onClick={()=>{navigate(`shop/product/${item.id}`,{state:{item}})}} />
              
            ))):(

              <Empty description={"No Products Available"} />
            )
          }
       </div>
       </div> 
    </div>
  )
}
