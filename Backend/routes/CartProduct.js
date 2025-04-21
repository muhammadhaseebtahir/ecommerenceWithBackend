const express = require('express');
const Cart = require('../models/Carts.Model');
const Product = require('../models/Products.model');
const verifyToken = require('../middlewares/Auth');
const router = express.Router();


router.post('/addtoCart',verifyToken,async(req,res)=>{
    const {product_id,quantity}=req.body
    
    if(!product_id|| !quantity){
        return res.status(400).json({message:"All fields are required"})
    }
    const user_id = req.user_id
try{
    let cart =await Cart.findOne({user_id})
    if(cart){
        const productIndex= cart.items.findIndex((item)=>item.product_id==product_id)
        if(productIndex>-1){
            cart.items[productIndex].quantity+=quantity
    }else{
        cart.items.push({product_id,quantity})
    }
    await cart.save()
    return res.status(200).json({message:"Product added to cart",cart})
    
    }else{
        const newCart= new Cart({
            userId:req.user_id,
            items:[{product_id,quantity}]
        })
        await newCart.save()
        return res.status(201).json({message:"Cart created and product added",cart:newCart})
    }



}catch{
    console.error(error)
    res.status(500).json({message:"Error adding to cart",error:error.message})
}




})



module.exports = router;
