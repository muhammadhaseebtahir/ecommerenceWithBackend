const express = require('express');
const Cart = require('../models/Carts.Model');
const Product = require('../models/Products.model');
const verifyToken = require('../middlewares/Auth');
const router = express.Router();

router.post('/addtoCart', verifyToken, async (req, res) => {
    const {
        product_id, productName, imageUrl, price, description,
        selectedSize, selectedColor, quantity,
        brandName, type, category
    } = req.body;

    const userId = req.user_id;
    const newProduct = {
        product_id,
        productName,
        imageUrl: Array.isArray(imageUrl) ? imageUrl : [imageUrl],
        price,
        description,
        brandName,
        type,
        category,
        size: selectedSize,
        color: selectedColor,
        quantity
    };

    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {
            const productIndex = cart.items.findIndex(
                (item) => item.product_id === product_id && item.size === selectedSize && item.color === selectedColor
            );

            if (productIndex > -1) {
                cart.items[productIndex].quantity += quantity;
            } else {
                cart.items.push(newProduct);
            }

            await cart.save();
            return res.status(200).json({ message: "Product successfully added to cart", cart });
        } else {
            const newCart = new Cart({
                userId,
                items: [newProduct],
            });

            await newCart.save();
            return res.status(201).json({ message: "Cart created and product added", cart: newCart });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding to cart" });
    }
});

router.get("/getCart", verifyToken, async (req, res) => {  
 const userId= req.user_id
try{
    const cart = await Cart.findOne({userId})
    if(!cart){
        return res.status(404).json({message:"Cart not Found"})
    }
    return res.status(200).json({message:"Cart Found", cart})
}

 catch(err){
    console.error(err)
    return res.status(500).json({message:"Error getting cart"})
 }



 })

router.delete("/removeFromCart/:product_id",verifyToken,async(req,res)=>{
    const {product_id}=req.params
    const userId=req.user_id
     
    try{
        const  cart= await Cart.findOne({userId})
        if(!cart){
            return res.status(404).json({message:"Cart not Found"})
            }
            const productIndex= cart.items.findIndex((items)=>items.product_id===product_id)
            if(productIndex===-1){
                return res.status(404).json({message:"Product not found in cart"})
            }
            cart.items.splice(productIndex,1)
       await cart.save()
       return res.status(200).json({message:"Product removed from cart",cart})

    }catch(err){
        console.error(err)
        return res.status(500).json({message:"Error removing product from cart"})
    }
    




})

   






module.exports = router;
