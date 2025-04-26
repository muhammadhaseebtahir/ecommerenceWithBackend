import React, { useState } from 'react';
import { Checkbox, Slider, Collapse, Empty } from "antd";
import Card from '../../../../components/card';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../../../../context/ProductContext';

export default function Womens() {
  const { products } = useProductContext();
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);

  // ⭐ Function to clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([0, 2000]);
  };

  // ⭐ Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category[0]);
    const matchesColor = selectedColors.length === 0 || (Array.isArray(product.colors) && product.colors.some(color => selectedColors.includes(color)));
    const matchesSize = selectedSizes.length === 0 || (Array.isArray(product.sizes) && product.sizes.some(size => selectedSizes.includes(size)));
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
  
    return matchesCategory && matchesColor && matchesSize && matchesPrice;
  });

  // ⭐ Static Data
  const categories = ["Men", "Women", "Kids", "Bags", "Belts", "Wallets", "Watches", "Accessories", "Winter Wear"];
  const colors = [
    { name: "Red", count: 10, colorCode: "red" },
    { name: "Blue", count: 14, colorCode: "blue" },
    { name: "Orange", count: 8, colorCode: "orange" },
    { name: "Black", count: 9, colorCode: "black" },
    { name: "Green", count: 4, colorCode: "green" },
    { name: "Yellow", count: 2, colorCode: "yellow" },
  ];
  const sizes = ["XS", "S", "M", "L", "XL"];

  // ⭐ Filters UI items
  const items = [
    {
      key: "1",
      label: "Product Categories",
      children: categories.map((category, index) => (
        <div key={index} className='mb-1'>
          <Checkbox
            checked={selectedCategories.includes(category)}
            onChange={(e) => {
              const updatedCategories = e.target.checked
                ? [...selectedCategories, category]
                : selectedCategories.filter((c) => c !== category);
              setSelectedCategories(updatedCategories);
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
            max={500}
            value={priceRange}
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
          <Checkbox
            checked={selectedColors.includes(color.name)}
            onChange={(e) => {
              const updatedColors = e.target.checked
                ? [...selectedColors, color.name]
                : selectedColors.filter((c) => c !== color.name);
              setSelectedColors(updatedColors);
            }}
          />
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
    },
    {
      key: "4",
      label: "Filter by Size",
      children: sizes.map((size, i) => (
        <div key={i} className='mb-1'>
          <Checkbox
            checked={selectedSizes.includes(size)}
            onChange={(e) => {
              const updatedSizes = e.target.checked
                ? [...selectedSizes, size]
                : selectedSizes.filter((s) => s !== size);
              setSelectedSizes(updatedSizes);
            }}
          >
            {size}
          </Checkbox>
        </div>
      )),
    }
  ];

  // ⭐ Main UI
  return (
    <div className="container-fluid d-flex flex-column flex-wrap flex-md-row px-0">
      
      {/* Left Side Filters */}
      <div className="leftSide border p-4" style={{ flex: "25%" }}>
        {/* All Products / Clear Filters Button */}
        <button 
          onClick={clearFilters} 
          className="btn btn-outline-primary mb-3 w-100"
        >
          All Products
        </button>

        {/* Filters Collapse */}
        <Collapse
          defaultActiveKey={["1", "2", "3", "4"]}
          items={items}
          style={{ border: "none", backgroundColor: "transparent" }}
        />
      </div>

      {/* Right Side Products */}
      <div className="mainSide p-4" style={{ flex: "75%" }}>
        <div className="cardSection d-flex justify-content-around flex-wrap gap-3 mt-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, i) => (
              <Card
                key={i}
                item={item}
                onClick={() => {
                  navigate(`/shop/product/${item.product_id}`, { state: { item } });
                }}
              />
            ))
          ) : (
            <Empty description={"No Products Available"} />
          )}
        </div>
      </div>

    </div>
  );
}
