const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const verifyToken=require('../middlewares/Auth');
const AuthUser=require('../models/AuthUser.Models');
const router=express.Router();


const randomId=()=>Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);


router.post("/register",async(req,res)=>{
    const {userName,email,password}=req.body;
   try{
    const existingUser= await  AuthUser.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    const hashPassword = await bcrypt.hash(password,10);
    const newUser= new AuthUser({
        user_id:randomId(),
        userName,
        email,
        password:hashPassword,
        status:"active",
        role:["customer"]
    })
    await newUser.save();
    const token = jwt.sign({ user_id: newUser.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({message:"User created successfully",token:token});
    
   }
    catch(err){
         res.status(500).json({message:"Internal server error"});
    }
})

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existingUser= await AuthUser.findOne({email})
        if(!existingUser){
          return  res.status(400).json({message:"Invalid Useremail or password"})
        }
        const  comparePassword = await bcrypt.compare(password,existingUser.password);
        if(!comparePassword){
            return res.status(400).json({message:"Invalid Useremail or password"})
        }
if(existingUser){

    
    const {user_id} =existingUser
    const token = jwt.sign({user_id},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.status(200).json({message:"Login successfully",token:token});
}else{
    return res.status(400).json({message:"Invalid Useremail or password"})
}
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
})

router.post("/forgot-password",async(req,res)=>{
   const {email,newPassword}=req.body;
   try{
    const existingUser= await AuthUser.findOne({email})
    if(!existingUser){
        return res.status(400).json({message:"User not found"});
    }
    const hashPassword = await bcrypt.hash(newPassword,10);
    await AuthUser.updateOne({email},{$set:{password:hashPassword}});
    res.status(200).json({message:"Password updated successfully"});
   }catch(err){
       res.status(500).json({message:"Internal server error"});
   }



})


  router.get("/user",verifyToken,async(req,res)=>{
   const user_id= req.user_id;
   try{
    const user= await AuthUser.findOne({user_id: user_id})
    if(user){
        res.status(200).json({user:user});

    }else{
        res.status(404).json({message:"User not found"});
    }
   }catch(err){
       res.status(500).json({message:"Internal server error"});
   }
  })







module.exports=router;


