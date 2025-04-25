import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image, Rate, Space, Button, Avatar, List,Empty, message  } from "antd";
import { MinusOutlined, PlusOutlined,CheckOutlined  } from "@ant-design/icons";

// import { dresses } from '../../../components/assest/cardImages/index';
import Card from "../../../components/card";
import { useProductContext } from "../../../context/ProductContext";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";



const initialReview = {
  review: "", rating: ""}




export default function ProductDeatils() {
  const {products,fetchProducts} = useProductContext()
  const {isAuthenticated} = useAuthContext()
      const navigate = useNavigate()
    const location = useLocation();
  const { item } = location.state;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor,setSelectedColor]=useState(null)
  const [review, setReview] = useState(initialReview);
  const [isLoading,setIsLoading] = useState(false);
  const [quantity,setQuantity] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Always scroll to top when route changes
    fetchProducts()
  }, [location.pathname]);

  const handleChange = (e) => {
    setReview((s) => ({ ...s, [e.target.name]: e.target.value }));
    
    
  };

   const handleSubmit = (e)=>{
    e.preventDefault();

     
      setReview(initialReview)
   }

   const handleAddtoCart = async (item) => {
    if (!isAuthenticated) {
        return message.error("Please login to add product to cart");
    }

    if (!selectedSize || !selectedColor) {
        return message.error("Please select size and color");
    }

    const {
        product_id, productName, imageUrl,
        price, description, brandName, type, category
    } = item;

    const data = {
        product_id,
        productName,
        imageUrl,
        price,
        description,
        brandName,
        type,
        category,
        selectedSize,
        selectedColor,
        quantity
    };

    setIsLoading(true);

    try {
        const res = await axios.post("http://localhost:8000/cart/addtoCart", data, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200 || res.status === 201) {
            message.success(res.data.message);
        }
    } catch (err) {
        console.error("Something went wrong to add product", err);
        message.error("Something went wrong to add product");
    } finally {
        setIsLoading(false);
        setQuantity(1)
        setSelectedColor(null)
        setSelectedSize(null)
    }
   



};


  

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
              src={item.imageUrl[2]}
              alt="Product Details"
              className="verticalImageSize"
            />
          </div>
          <div className="verticalImage">
            <Image
              src={item.imageUrl[1]}
              alt="Product Details"
              className="verticalImageSize"
            />
          </div>
          <div className="verticalImage">
            <Image
              src={item.imageUrl[0]}
              alt="Product Details"
              className="verticalImageSize"
            />
          </div>
        </div>
        <div
          className="horizontalImage bg-danger rounded-2"
          style={{ overflow: "hidden",objectFit:"cover" }}
        >
          <Image
            src={item.imageUrl[1]}
            alt="Product Details"
            className="horizontalImageSize h-100 w-100"
            style={{ objectFit: "cover",backgroundSize:"cover" ,height:"100%"}}
          />
        </div>
        <div className="productDetailsData p-3" style={{ flex: "25%" }}>
          <h3 style={{ fontWeight: "900", textShadow: "1px 1px 10px gray" }}>
            {item.productName}
          </h3>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>{item.price}$</p>
          <p style={{ fontSize: "13px", color: "#6c757d" }}>
            {item.description}
          </p>
          <Rate
            style={{ fontSize: "18px" }}
            allowHalf
            defaultValue={4.5}
          />
          <hr style={{ color: "#adb5bd" }} />
          <p
            style={{ color: "#6c757d", fontSize: "14px", marginBottom: "5px" }}
          >
            Choose Size
          </p>
          <Space>
            {item.sizes.map((size, i) => (
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
          <p
  style={{ color: "#6c757d", fontSize: "14px", marginBottom: "5px", marginTop: "15px" }}
>
  Choose Color
</p>
<Space>
  {item.colors.map((color, i) => (
    <div
      key={i}
      onClick={() => setSelectedColor(color)}
      style={{
        backgroundColor: color,
        border: selectedColor === color ? "2px solid black" : "1px solid #ccc",
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selectedColor === color && (
        <CheckOutlined
          style={{
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        />
      )}
    </div>
  ))}
</Space>

          <hr style={{ color: "#adb5bd" }} />
          <Space className="p-0 p-md-3 d-flex flex-wrap">
            <Space.Compact>
            <Button className="p-3" icon={<MinusOutlined />} onClick={()=> quantity>1 ? setQuantity(quantity-1): null } />
              <Button className="p-3">{quantity}</Button>
              <Button className="p-3" icon={<PlusOutlined />} onClick={()=>setQuantity(quantity+1)} />
            </Space.Compact>

            <Button
              className="shadow bg-dark text-light px-4 px-md-5 " color="default" loading={isLoading} onClick={()=>handleAddtoCart(item)} >
              Add to cart
            </Button>
            
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
      {products.map((item, i) => (
            <Card key={i} item={item} onClick={()=>{
              if(location.pathname === `/shop/product/${item.product_id}`){
                navigate(`/shop/product/${item.product_id}`, { replace: true, state: { item } });
              }else {
                // Different route: navigate normally
                navigate(`/shop/product/${item.product_id}`, { state: { item } });
              }
            }} />
          ))

      }
     
     
      </div>
</div>


    </div>
  );
}
