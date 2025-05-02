const express = require('express');
const Review = require('../models/Review.Model');
const verifyToken = require('../middlewares/Auth');
const User = require('../models/AuthUser.Models');
const router = express.Router();


router.post('/addReview', verifyToken, async (req, res) => {
 const userId= req.user_id
 const { product_id, rating, review } = req.body;
   
 try{
   const user= await User.findOne({user_id:userId}).select("userName email")
   if(!user){
    return res.status(400).json({message:"User not found"})
   }


    const newReview= new Review({
        product_id,
         userName:user.userName,
        email:user.email,
        userId,
        rating,
        review
    })
    await newReview.save()
      return  res.status(201).json({message:"Review added successfully",newReview})
 }catch(err){
    colnsole.error(err)
    return  res.status(500).json({message:"Error adding review"})
 }
})

router.get("/getAllReviews", async (req, res) => {
  try{
    const reviewsData= await  Review.find()
    if(!reviewsData){
     return  res.status(404).json({message:"Reviews not found."})
          }
          res.status(200).json({message:"All reviews get successFully get.",reviewsAll:reviewsData})
    
  }catch(err){
    console.err(err)
    return res.status(500).json({message:"Internal server error"})
  }
})

router.get("/getReviews/:product_id", async (req, res) => {
    const { product_id } = req.params;
  
    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
  
    try {
      const reviews = await Review.find({ product_id }).sort({ createdAt: -1 }); ;
  
      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found" });
      }
  
      return res.status(201).json({ message: "Reviews fetched successfully", reviews });
    } catch (err) {
      console.error(err);
      return res.status(501).json({ message: "Error fetching reviews" });
    }
  });
  
router.delete("/deleteReview/:_id",async(req,res)=>{
  const {_id}= req.params
 if(!_id){
    return res.status(400).json({message:"Review id is required."})
  }
  try{
    const review = await Review.findByIdAndDelete(_id)
    if(!review){
      return res.status(404).json({message:"Review not found."})
    }
    return res.status(200).json({message:"Review deleted successfully",review})


  }catch(err){
    console.error(err)
    return res.status(500).json({message:"Error deleting review"})

  }



})
module.exports= router