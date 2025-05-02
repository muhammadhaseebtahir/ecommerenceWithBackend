const express = require("express")
const router = express.Router()
 const CheckOutModel= require("../models/CheckOut.Model")
 const Cart = require("../models/Carts.Model")
 const verifyToken = require("../middlewares/Auth")



 router.post("/checkOut",verifyToken,async(req,res)=>{
    const {userName,email,productName,ImageUrl,price,quantity,color,size,description,category,brandName,rating,productStatus,productPaymentMethod,productDeliveryAddress,productDeliveryCity,productDeliveryZip,productDeliveryPhone,productDeliveryNotes,productDeliveryStatus}= req.body
   const userId = req.user_id
  try{
    const newCheckOut= new CheckOutModel({
        userId,
        userName,
        email,
        productName,
        ImageUrl,
        price,
        quantity,
        color,
        size,
        description,
        category,
        brandName,
        rating,
        productStatus,
        productPaymentMethod,
        productDeliveryAddress,
        productDeliveryCity,
        productDeliveryZip,
        productDeliveryPhone,
        productDeliveryNotes,
        productDeliveryStatus
    })
  

    await newCheckOut.save()
    const deleteCartProduct = await  Cart.deleteOne({userId})
    if (deleteCartResult.deletedCount === 0) {
        return res.status(400).json({ message: "No cart products found to delete." });
      }
    


    if(!newCheckOut){
        return res.status(400).json({message:"Error check out product."})
    }
    return res.status(201).json({message:"Product check out successfully",newCheckOut,deleteCartProduct})



  }catch(err){
    console.error(err)
    return res.status(500).json({message:"Error check out product."})
  }






 })


 router.get("/getCheckOutProducts",async(req,res)=>{
    try{
        const checkOutProducts= await CheckOutModel.find()
        if(!checkOutProducts || checkOutProducts.length === 0){
            return res.status(404).json({message:"No check out products found."})
        }
        return res.status(200).json({message:"All check out products get successfully",checkOutProducts})
    }catch(err){
        console.error(err)
        return res.status(500).json({message:"Internal server error."})
    }
 })


module.exports = router

