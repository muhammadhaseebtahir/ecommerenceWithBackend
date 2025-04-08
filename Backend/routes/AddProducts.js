const express = require('express');
const Product = require('../models/Products.model');
const verifyToken = require('../middlewares/Auth');
const router = express.Router();
const upload = require('../config/cloudinaryConfig');
// const multer = require('multer');

function randomId() {
  return Math.random().toString(36).substring(2, 15)+  Math.random().toString(36).slice(2);}

router.post("/addproduct", verifyToken,upload.single("image"), async (req, res) => {
  // const product = JSON.parse(req.body.product);
  const {
    productName,
    brandName,
    type,
    price,
    description,
    sizes,
    colors,
    category
  } = req.body;


  // Validate the data
  if (!productName || !brandName || !price || !type || !description || sizes.length === 0 || colors.length === 0 || category.length === 0) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create the new product
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
    image: req.file.path, 
    product_id: randomId(), 
  });

  try {
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});

module.exports = router;
