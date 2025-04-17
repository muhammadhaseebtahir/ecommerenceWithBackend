// import React, { useEffect, useState } from 'react';
// import { Table, Tag, Image, Typography, Empty, Button, Popconfirm, message } from 'antd';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { useProductContext } from '../../../context/ProductContext';
// import axios from 'axios';

// const { Title, Paragraph } = Typography;

// export default function ProductTable() {
//   const { products, fetchProducts } = useProductContext();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const loadProducts = async () => {
//       setLoading(true);
//       try {
//         await fetchProducts();
//       } catch (err) {
//         setError('Failed to load products');
//         console.error(err);
//         setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   const handleDelete = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:8000/dashboard/deleteproduct/${productId}`);
//       message.success('Product deleted successfully');
//       fetchProducts(); 
//     } catch (err) {
//       console.error(err);
//       message.error('Failed to delete product');
//     }
//   };

//   const handleEdit = (productId) => {
//     message.info(`Edit product: ${productId}`);
//     };

//   const columns = [
//     {
//       title: 'Image',
//       dataIndex: 'imageUrl',
//       key: 'imageUrl',
//       render: (images) =>
//         images?.[0] ? (
//           <Image
//             src={images[0]}
//             alt="Product"
//             width={60}
//             height={60}
//             style={{ objectFit: 'cover', borderRadius: 8 }}
//           />
//         ) : (
//           <span>No Image</span>
//         ),
//     },
//     {
//       title: 'Product Name',
//       dataIndex: 'productName',
//       key: 'productName',
//     },
//     {
//       title: 'Brand',
//       dataIndex: 'brandName',
//       key: 'brandName',
//     },
//     {
//       title: 'Type',
//       dataIndex: 'type',
//       key: 'type',
//     },
//     {
//       title: 'Price ($)',
//       dataIndex: 'price',
//       key: 'price',
//       render: (price) => `${price} $`,
//     },
//     {
//       title: 'Sizes',
//       dataIndex: 'sizes',
//       key: 'sizes',
//       render: (sizes) =>
//         sizes.map((size) => (
//           <Tag color="blue" key={size}>
//             {size}
//           </Tag>
//         )),
//     },
//     {
//       title: 'Colors',
//       dataIndex: 'colors',
//       key: 'colors',
//       render: (colors) =>
//         colors.map((color) => (
//           <Tag color="magenta" key={color}>
//             {color}
//           </Tag>
//         )),
//     },
//     {
//       title: 'Categories',
//       dataIndex: 'category',
//       key: 'category',
//       render: (category) =>
//         category.map((cat) => (
//           <Tag color="green" key={cat}>
//             {cat}
//           </Tag>
//         )),
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//       render: (desc) => (
//         <div style={{ maxWidth: 250 }}> 
//           <Paragraph
//             ellipsis={{
//               rows: 2,
//               expandable: true,
//               symbol: 'See more',
//             }}
//           >
//             {desc}
//           </Paragraph>
//         </div>
//       ),
//     },
    
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <div style={{ display: 'flex', gap: 8 }}>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => handleEdit(record._id)}
//           >
//             Edit
//           </Button>
//           <Popconfirm
//             title="Are you sure you want to delete this product?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button danger icon={<DeleteOutlined />}>
//               Delete
//             </Button>
//           </Popconfirm>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="p-2">
//       <Title level={3} className="text-center">
//         All Products
//       </Title>
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {products.length === 0 && !loading ? (
//         <Empty description="No products found" />
//       ) : (
//         <Table
//           columns={columns}
//           dataSource={products.map((p) => ({ ...p, key: p._id }))}
//           loading={loading}
//           bordered
//           pagination={{ pageSize: 5 }}
//           scroll={{ x: 'max-content' }}
//         />
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from 'react'
import { useProductContext } from '../../../context/ProductContext'
import {Button, Empty, Image,Popconfirm,Tag,Typography} from "antd"
import {EditOutlined,DeleteOutlined} from "@ant-design/icons"

const {Title,Paragraph} = Typography
export default function ShowTableData() {
  const {products,fetchProducts} = useProductContext()
  const [loading,setLoading]= useState(true)
   useEffect(()=>{
    const loadProducts=async()=>{
        setLoading(true)
        try{
          await  fetchProducts()
        }catch(err){
            console.log("error",err.message)
            setLoading(false)
        }finally{
            setLoading(false)
        }

    }
    loadProducts()

   },[])


 const columns=[
    {
      title:"Image",
      dataIndex:"imageUrl",
      key:"imageUrl",
      render:(images)=>(images?.[0]?(
        <Image src={images[0]} alt="Products" width={60} height={60} style={{objectFit:"cover",borderRadius:"10px"}} />
      ):<p>Image Not Found</p>)
    },{
      title:"Product Name",
      dataIndex:"productName",
      key:"productName"

    },{
      title:"Brand",
      dataIndex:"brandName",
      key:"brandName"
    },{
      title:"Type",
      dataIndex:"type",
      key:"type"
    },{
      title:"Price ($)",
      dataIndex:"price",
      key:"price",
      render:(price)=>(`${price}$`)
    },{
      title:"Sizes",
      dataIndex:"sizes",
      key:"sizes",

      render:(sizes)=>(
        sizes.map((size)=>(
          <Tag color="blue" key={size}>
            {size}
          </Tag>
        ))
      )

    },{
      title:"Colors",
      dataIndex:"colors",
      key:"colors",
      render:(colors)=>(
        colors.map((color)=>(
          <Tag color="magenta" key={color}>
            {color}
          </Tag>
        ))
      )
    },{
      title:"Categories",
      dataIndex:"category",
      key:"category",
      render:(category)=>(
        category.map((cat)=>(
          <Tag color="green" key={cat}>
            {cat}
          </Tag>
        ))
      )
    },{
      title:"Description",
      dataIndex:"description",
      key:"description",
      render:(decs)=>(
        <div style={{maxWidth:250}} >
          <Paragraph ellipsis={{rows:2,expandable:true,symbol:"See more"}}>
            {decs}
          </Paragraph>

        </div>
      )

    },
    {
      Title:"Actions",
      key:"actions",
      render:(_,record)=>(
        <div style={{display:"flex",gap:8}}>
          <Button type="primary" icon={<EditOutlined />} >
            Edit
          </Button>
          <Popconfirm title="Are you sure you want to delete this product?"  okText="Yes" cancelText="No">
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
            </Popconfirm>

        </div>
      )
    }
 ]



  
  return (
    <div className='container-fluid p-2'>
      <Title className="text-center">Show Products</Title>
      {products.length===0 && loading ?(
        <Empty title="No products in table" />
      ):
      
      }

    </div>
  )
}

