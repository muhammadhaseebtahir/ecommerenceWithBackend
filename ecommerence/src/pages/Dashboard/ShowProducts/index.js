import React, { useEffect, useState } from 'react'
import { useProductContext } from '../../../context/ProductContext'
import { Button, Table, Empty, Image, Modal, Tag, Typography, message, Space, Input, Form, Select, InputNumber } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import axios from 'axios'

const { Title, Paragraph } = Typography
const { TextArea } = Input
const { Option } = Select

export default function ShowTableData() {
  const { products, setProducts, fetchProducts } = useProductContext()
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        await fetchProducts()
      } catch (err) {
        console.log("error", err.message)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const showUpdateModal = (product) => {
    setSelectedProduct(product)
    form.setFieldsValue(product)
    setIsModalVisible(true)
  }

  const handleUpdate = async (values) => {
    try {
      const res = await axios.put(`http://localhost:8000/dashboard/updateproduct/${selectedProduct.product_id}`, values)
      message.success(res.data.message || 'Product updated successfully')
      setIsModalVisible(false)
      fetchProducts()
    } catch (err) {
      console.error(err)
      message.error('Update failed')
    }
  }

  const handleDelete = async (product_id) => {
    Modal.confirm({
      title: "Are you sure to delete this product?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const res = await axios.delete(`http://localhost:8000/dashboard/deleteproduct/${product_id}`);
          message.success(res.data.message);
          fetchProducts();
          setProducts((prev) => prev.filter((p) => (p.product_id !== product_id)))
        } catch (err) {
          console.log("error", err.message);
          message.error("Failed to delete product");
        }
      },
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (images) => (images?.[0] ? (
        <Image src={images[0]} alt="Products" width={60} height={60} style={{ objectFit: "cover", borderRadius: "10px" }} />
      ) : <p>Image Not Found</p>)
    },
    { title: "Product Name", dataIndex: "productName", key: "productName" },
    { title: "Brand", dataIndex: "brandName", key: "brandName" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Price ($)", dataIndex: "price", key: "price",
      render: (price) => (`${price}$`)
    },
    {
      title: "Sizes", dataIndex: "sizes", key: "sizes",
      render: (sizes) => sizes.map((size) => (
        <Tag color="blue" key={size}>{size}</Tag>
      ))
    },
    {
      title: "Colors", dataIndex: "colors", key: "colors",
      render: (colors) => colors.map((color) => (
        <Tag color="magenta" key={color}>{color}</Tag>
      ))
    },
    {
      title: "Categories", dataIndex: "category", key: "category",
      render: (category) => category.map((cat) => (
        <Tag color="green" key={cat}>{cat}</Tag>
      ))
    },
    {
      title: "Description", dataIndex: "description", key: "description",
      render: (desc) => (
        <div style={{ maxWidth: 250 }}>
          <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "See more" }}>
            {desc}
          </Paragraph>
        </div>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => showUpdateModal(record)}>Edit</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.product_id)}>Delete</Button>
        </Space>
      )
    }
  ]

  return (
    <div className='container-fluid p-2'>
      <Title className="text-center">Show Products</Title>
      {products.length === 0 && loading ? (
        <Empty description="No products in table" />
      ) : (
        <Table
          columns={columns}
          dataSource={products.map((p) => ({ ...p, key: p._id }))}
          loading={loading}
          bordered
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      )}

      {/* Update Modal */}
      <Modal
        title="Update Product"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Update"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item name="productName" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="brandName" label="Brand" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="sizes" label="Sizes">
            <Select mode="tags" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="colors" label="Colors">
            <Select mode="tags" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select mode="tags" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
