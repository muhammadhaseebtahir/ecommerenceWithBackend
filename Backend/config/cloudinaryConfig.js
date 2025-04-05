// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'ProductsImages',  // Replace with your Cloudinary cloud name
  api_key: '471676845146623',        // Replace with your Cloudinary API key
  api_secret: 'j8sNX2c2h79G60GhHu_cbHA3Uow',  // Replace with your Cloudinary API secret
});

module.exports = cloudinary;
