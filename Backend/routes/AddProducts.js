// const express = require('express');
// const Product = require('../models/Products.model');
// const verifyToken = require('../middlewares/Auth');
// const multer = require('multer');
// const cloudinary = require('../config/cloudinaryConfig');
// const fs = require('fs');
// const router = express.Router();

// // Multer setup for handling a single file upload with a max size limit of 5MB
// const upload = multer({ 
//   dest: 'uploads/',
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
// }).single('fileList');

// // Utility function to generate random IDs
// const randomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
// router.post("/addproduct", verifyToken, async (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ message: 'File upload error', error: err.message });
//         }

//         try {
//             // Parse the product data from the request body
//             const productData = JSON.parse(req.body.productData);

//             // Destructure the product data
//             const { productName, brandName, type, price, description, category, sizes, colors } = productData;
            
//             // Get the uploaded file (image)
//             const file = req.file;
            
//             if (!file) {
//                 return res.status(400).json({ message: 'No file uploaded' });
//             }

//             // Upload the file to Cloudinary
//             const result = await cloudinary.uploader.upload(file.path);

//             // Create a new product using the provided data and image URL from Cloudinary
//             const newProduct = new Product({
//                 productName,
//                 brandName,
//                 type,
//                 price,
//                 description,
//                 category,
//                 sizes,
//                 colors,
//                 image: result.secure_url, // Image URL from Cloudinary
//                 productId: randomId() // Unique product ID
//             });

//             // Save the new product to the database
//             await newProduct.save();

//             // Clean up the uploaded file from the local server
//             fs.unlinkSync(file.path);

//             // Respond with the newly created product data
//             res.status(201).json({ message: 'Product added successfully', product: newProduct });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Error adding product', error: error.message });
//         }
//     });
// });
// module.exports = router;

const express = require('express');
const Product = require('../models/Products.model');
const verifyToken = require('../middlewares/Auth');
const router = express.Router();

function randomId() {
  return Math.random().toString(36).substring(2, 15)+  Math.random().toString(36).slice(2);}

router.post("/addproduct", verifyToken, async (req, res) => {
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
    product_id: randomId(), // Generates a random product ID
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
