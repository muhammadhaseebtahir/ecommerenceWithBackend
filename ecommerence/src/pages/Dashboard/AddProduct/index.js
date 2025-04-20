import React, { useState } from "react";
import { Select, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const initialState = {
  productName: "",
  brandName: "",
  price: "",
  type: "",
  description: "",
  sizes: [],
  colors: [],
  category: [],
};

export default function AddProducts() {
  const [imageUrl, setImageUrl] = useState([]);
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (fieldName, value) => {
    setState((s) => ({
      ...s,
      [fieldName]: value,
    }));
  };

  const handleUploadChange = ({ fileList }) => {
    setImageUrl(fileList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let {
      productName,
      brandName,
      price,
      type,
      description,
      sizes,
      colors,
      category,
    } = state;
    productName = productName.trim();
    brandName = brandName.trim();
    price = price.toString().trim();
    type = type.trim();
    description = description.trim();

    if (
      !productName ||
      !brandName ||
      !price ||
      !type ||
      !description ||
      sizes.length === 0 ||
      colors.length === 0 ||
      category.length === 0
    ) {
      return message.error("All fields are required");
    }

    if (isNaN(price) || price <= 0) {
      return message.error("Price must be a positive number");
    }

    if (productName.length < 3 || brandName.length < 3) {
      return message.error("Product name and brand name must be at least 3 characters long");
    }

    if (description.length < 10) {
      return message.error("Description must be at least 10 characters long");
    }

    if (imageUrl.length === 0) {
      return message.error("Please upload a product image");
    }

    setIsProcessing(true);

    const formData = new FormData();
    const product = {
      productName,
      brandName,
      price,
      type,
      description,
      sizes,
      colors,
      category,
    };
    imageUrl.forEach(file => {
      formData.append("image", file.originFileObj);  // Add all images to the formData
    });
    formData.append("product", JSON.stringify(product));
   console.log("product", JSON.stringify(product));

      axios.post("http://localhost:8000/dashboard/addproduct", formData, {
      headers: {
        'content-Type': "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        message.success(response.data.message);
        setState(initialState);
        setImageUrl([]);  // Clear the image list after successful upload
        setIsProcessing(false);
      })
      .catch((error) => {
        console.error(error);
        message.error("Error adding product");
        setIsProcessing(false);
      });


  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center bg-light min-vh-100">
      <div className="card w-75 p-3">
        <h1 className="text-center py-4">Add Products</h1>
        <form onSubmit={handleSubmit}>
          <div className="row g-4 p-2 justify-content-between">
            <div className="col-12 col-md-6">
              <Input
                type="text"
                className="py-2"
                placeholder="Product Name"
                onChange={handleChange}
                value={state.productName}
                name="productName"
              />
            </div>
            <div className="col-12 col-md-6">
              <Input
                type="text"
                className="py-2"
                placeholder="Product Brand Name"
                onChange={handleChange}
                value={state.brandName}
                name="brandName"
              />
            </div>
            <div className="col-12 col-md-6">
              <Input
                type="number"
                className="py-2"
                placeholder="Product Price"
                onChange={handleChange}
                value={state.price}
                name="price"
              />
            </div>
            <div className="col-12 col-md-6">
              <Input
                type="text"
                className="py-2"
                placeholder="Product Type"
                onChange={handleChange}
                value={state.type}
                name="type"
              />
            </div>
            <div className="col-12">
              <TextArea
                rows={4}
                placeholder="Product Description"
                onChange={handleChange}
                value={state.description}
                name="description"
              />
            </div>

            <div className="col-12 col-md-4">
              <label>Sizes:</label>
              <Select
                mode="multiple"
                placeholder="Select sizes"
                onChange={(value) => handleSelectChange("sizes", value)}
                value={state.sizes}
                style={{ width: "100%" }}
              >
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <Option key={size} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="col-12 col-md-4">
              <label>Colors:</label>
              <Select
                mode="multiple"
                placeholder="Select colors"
                onChange={(value) => handleSelectChange("colors", value)}
                value={state.colors}
                style={{ width: "100%" }}
              >
                {["Red", "Blue","white", "gray","maroon","navy","olive","purple","lime", "Black", "Green", "Yellow","pink","hotpink","lightpink"].map(
                  (color) => (
                    <Option key={color} value={color}>
                      {color}
                    </Option>
                  )
                )}
              </Select>
            </div>

            <div className="col-12 col-md-4">
              <label>Categories:</label>
              <Select
                mode="multiple"
                placeholder="Select categories"
                onChange={(value) => handleSelectChange("category", value)}
                value={state.category}
                style={{ width: "100%" }}
              >
                {[
                  "Men",
                  "Women",
                  "Kids",
                  "Bags",
                  "Belts",
                  "Wallets",
                  "Watches",
                  "Accessories",
                  "Winter Wear",
                ].map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="col-12">
              <label>Product Image:</label>
              <Upload
  listType="picture"
  fileList={imageUrl}
  onChange={handleUploadChange}
  beforeUpload={() => false}  // Prevent automatic upload
  maxCount={3}  // Limit to two images, as per the backend
>
  <Button icon={<UploadOutlined />}>Upload Image</Button>
</Upload>
            </div>
            <div className="col-12 col-md-6 offset-md-3 text-center">
              <Button type="primary" htmlType="submit" loading={isProcessing} className="mt-3 w-100">
                Add Product
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
