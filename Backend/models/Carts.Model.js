const mongoose = require("mongoose");

const cartSchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items:[
        {
            product_id:{
                type:String,
                required:true
            },
            imageUrl:{
                type: [String],
                required: true,
            },
               productName: {
                type: String,
                required: true,
                trim: true
            },
            brandName: {
            type: String,
                required: true,
                trim: true
            },
            type: {
                type: String,
                required: true,
                trim: true
            },
        
            price: {
                type: Number,
                required: true,
                trim: true
            },
            description: {
                type: String,
                required: true,
                trim: true
            },
            category:{
                type:[String],
                required:true,
                trim:true
            },
            size:{
                type:String,
                required:true,
                trim:true
            },
            color:{
                type:String,
                required:true,
                trim:true
            },
            status:{
                type:String,
                default:"active"
            },        
            quantity:{
              type:Number,
                required:true,
                default:1
            }
        }

    ]
},{timestamps:true});
module.exports = mongoose.model("Cart",cartSchema);