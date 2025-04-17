  const express = require('express');
  const Product = require('../models/Products.model');
  const verifyToken = require('../middlewares/Auth');
  const router = express.Router();
  const upload = require('../config/cloudinaryConfig');
  // const multer = require('multer');

  function randomId() {
    return Math.random().toString(36).substring(2, 15)+  Math.random().toString(36).slice(2);}

  router.post("/addproduct", verifyToken,upload.array("image",2), async (req, res) => {
    const productData = JSON.parse(req.body.product);
      const {
      productName,
      brandName,
      type,
      price,
      description,
      sizes,
      colors,
      category
    } = productData
  console.log("productData", productData)

    // Validate the data
    if (!productName || !brandName || !price || !type || !description || sizes.length === 0 || colors.length === 0 || category.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imagePaths = req.files.map(file => file.path); // Array of image paths
    console.log("imagePaths", imagePaths);
    try {
    const newProduct = new Product({
      userId: req.user_id,
      productName,
      brandName,
      type,
      price,
      description,
      sizes,
      colors,
      category,
      imageUrl: imagePaths, 
      product_id: randomId(), 
    });
    
    console.log("newProduct", newProduct)
      await newProduct.save();
      res.status(201).json({ message: 'Product added successfully', product: newProduct });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding product', error: error.message });
      clonsole.log("error", error.message)
    }
  });

  router.get("/getproducts", async (req, res) => {
    try {
      const products = await Product.find();
      
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
      console.log("products", products)
  
      res.status(200).json({ products });
    } catch (err) {
      console.error("Error fetching products:", err.message);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  




  module.exports = router;
